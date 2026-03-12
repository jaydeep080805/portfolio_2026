const toastMessage = document.getElementById("toast-message");
const contactSubmitButton = document.getElementById("contact-submit-button");
import { API_URL } from "./config.js";
import { animateToastMessage, checkEmailValid } from "./utils.js";
import { projectInfo } from "./projectList.js";
import { toolsList } from "./toolsList.js";

/* 
=====================================================
======== MOBILE BARS MENU ======== 
=====================================================
*/
const mobileNavIcon = document.getElementsByClassName("fa-solid fa-bars")[0];
const mobileNavMenu = document.getElementsByClassName("navbar-list")[0];
let mobileMenuIsOpen = false;

const changeMobileMenu = () => {
  if (mobileMenuIsOpen == false) {
    // when menu is open
    mobileMenuIsOpen = true;

    // change the styling of the icon
    mobileNavIcon.classList.remove("fa-bars");
    mobileNavIcon.classList.add("fa-x");

    // shows the menu list background
    mobileNavMenu.classList.remove("hidden");

    // loop through
    let counter = -150;
    const mobileMenuAnimation = setInterval(() => {
      mobileNavMenu.style.transform = `translate(${counter}px, 0)`;
      console.log(counter);
      counter += 3;

      if (counter == 0) {
        clearInterval(mobileMenuAnimation);
      }
    }, 1);

    // add the menu in
  } else {
    // when menu is closed
    mobileMenuIsOpen = false;

    // change the styling of the icon
    mobileNavIcon.classList.add("fa-bars");
    mobileNavIcon.classList.remove("fa-x");

    mobileNavMenu.classList.add("hidden");

    mobileNavMenu.style.transform = `translate(-150px, 0)`;
  }
};

mobileNavIcon.addEventListener("click", () => {
  changeMobileMenu();
});

/* 
=====================================================
======== HANDLE CONTACT FORM SUBMISSION ======== 
=====================================================
*/

contactSubmitButton.addEventListener("click", async (e) => {
  e.preventDefault();

  // get the input values
  const userName = document.getElementById("name");
  const userEmail = document.getElementById("email");
  const emailSubject = document.getElementById("subject");
  const emailBody = document.getElementById("text-input");

  // validate the form
  if (userName.value.length <= 0) {
    animateToastMessage(toastMessage, "error", "Please input a name");
    return;
  } else if (checkEmailValid(userEmail.value) != true) {
    animateToastMessage(toastMessage, "error", "Please input a valid email");
    return;
  } else if (emailSubject.value.length <= 0) {
    animateToastMessage(toastMessage, "error", "Please put a subject");
    return;
  } else if (emailBody.value.length <= 0) {
    animateToastMessage(toastMessage, "error", "Please put some text");
    return;
  }

  const payload = {
    userName: userName.value,
    userEmail: userEmail.value,
    emailSubject: emailSubject.value,
    emailBody: emailBody.value,
  };

  try {
    const res = await fetch(`${API_URL}/send-email`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // checks the status code of the response
    if (!res.ok) {
      console.log(`Request failed with status: ${res.status}`);

      if (res.status == 500) {
        throw new Error("Please fill out the form");
      } else {
        throw new Error(`${res.status} - ${res.body}`);
      }
    }

    const data = await res.json();
    console.log(data);
    // console.log("Status:", res.status);
    // console.log("Success flag:", data.isSuccessful);

    animateToastMessage(
      toastMessage,
      "success",
      "Sucessfully recieved email, please check your spam for confirmation",
    );

    // reset the input boxes
    userName.value = "";
    userEmail.value = "";
    emailSubject.value = "";
    emailBody.value = "";
  } catch (err) {
    animateToastMessage(toastMessage, "error", err);
    console.error("Network error:", err);
  }
});

/* 
=====================================================
======== ADDING THE PROJECT CARDS TO THE DOM ======== 
=====================================================
*/

const projectCardContainer = document.getElementsByClassName(
  "project-card-container",
)[0];

projectInfo.map((project) => {
  const { link, image, imageAlt, title, tools, toolColours, description } =
    project;

  const cardElement = document.createElement("article");
  cardElement.classList.add("card");

  // create the image container
  const projectCardImageContainerElement = document.createElement("div");
  projectCardImageContainerElement.classList.add(
    "project-card-image-container",
  );

  // create the link
  const hyperLinkElement = document.createElement("a");
  hyperLinkElement.href = link;

  // create the image
  const imageElement = document.createElement("img");
  imageElement.src = image;
  imageElement.alt = imageAlt;

  // ======== IMAGE SECTION ======== //
  // add the image container to the card
  cardElement.appendChild(projectCardImageContainerElement);
  // add the hyperlink and image to the image container
  projectCardImageContainerElement.appendChild(hyperLinkElement);
  // wrap the image in the <a></a> tag
  hyperLinkElement.appendChild(imageElement);

  // ======== INFO SECTION ======== //
  const projectInfoSectionElement = document.createElement("div");
  projectInfoSectionElement.classList.add("project-info");

  const headingElement = document.createElement("h2");
  headingElement.textContent = title;

  // loop through the tools
  const toolsUsedElement = document.createElement("span");
  toolsUsedElement.textContent = "Tools used: ";
  tools.map((t, index) => {
    const toolTextSpan = document.createElement("span");
    // toolTextSpan.classList.add(`${t.toLowerCase()}-text`);
    toolTextSpan.style.color = `var(--${toolColours[index]}-text-color)`;

    if (index + 1 == tools.length) {
      toolTextSpan.textContent = `${t}`;
    } else {
      toolTextSpan.textContent = `${t}, `;
    }

    // console.log(toolTextSpan);

    // toolsUsedElement.textContent = toolsUsedElement.textContent + `${t}, `;
    toolsUsedElement.appendChild(toolTextSpan);
  });

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = description;

  projectInfoSectionElement.appendChild(headingElement);
  projectInfoSectionElement.appendChild(toolsUsedElement);
  projectInfoSectionElement.appendChild(descriptionElement);

  cardElement.appendChild(projectInfoSectionElement);

  // add the card to the dom
  projectCardContainer.append(cardElement);
});

/* 
=====================================================
======== ADDING SKILLS TO DOM ======== 
=====================================================
*/
const skillCardContainer = document.getElementsByClassName(
  "skill-card-container",
)[0];

for (let stack in toolsList) {
  // contains the information within the cards
  const stackCard = document.createElement("div");
  stackCard.classList.add("stack-card");

  // sets the heading for each card
  const stackCardHeading = document.createElement("h3");
  stackCardHeading.textContent = stack;

  // add the card heading to the card
  stackCard.appendChild(stackCardHeading);
  // add the card to the grid container
  skillCardContainer.appendChild(stackCard);

  // loop through the skills
  toolsList[stack].map((s) => {
    const { name, fillAmount, colorName, skillLevel, icon } = s;

    // create a wrapper for each skill
    const skillWrapper = document.createElement("div");
    skillWrapper.classList.add("skill-wrapper");

    // add an icon to the start of each skill
    const skillIcon = document.createElement("img");
    skillIcon.classList.add("skill-icon");
    skillIcon.src = icon;

    // add the name for each skill
    const skillName = document.createElement("span");
    skillName.classList.add("skill-name");
    skillName.textContent = ` ${name} - `;

    // add icon to the wrapper
    skillWrapper.appendChild(skillIcon);
    // add the name to the wrapper
    skillWrapper.appendChild(skillName);

    for (let i = 0; i < 5; i++) {
      // create a .dot class
      const dot = document.createElement("div");
      dot.classList.add("dot");

      // check how many dots should be filled
      if (i < fillAmount) {
        // set the class to be filled
        dot.classList.add("filled-dot");

        // add the hover events
        dot.addEventListener("mouseover", () => {
          dot.style.backgroundColor = `var(--${colorName}-text-color)`;
        });

        dot.addEventListener("mouseleave", () => {
          setTimeout(() => {
            dot.style.backgroundColor = "white";
          }, 2000);
        });
      }

      // add the dots to the end of the wrapper
      skillWrapper.appendChild(dot);
    }

    // add the wrapper to the card
    stackCard.appendChild(skillWrapper);
  });
}

const socialmediaOptions = document.getElementsByClassName("social-option");

for (let option of socialmediaOptions) {
  option.addEventListener("mouseover", () => {
    // console.log("hovered");

    const linkVariable = option.childNodes[1];
    const icon = linkVariable.childNodes[1];
    const spanText = linkVariable.childNodes[3];

    option.style.transform = "translate(0, -5px)";
    option.style.backgroundColor = "var(--icon-hover-bg-color)";
    icon.style.color = "var(--icon-hover-text-color)";
    spanText.style.color = "var(--icon-hover-text-color)";
  });

  option.addEventListener("mouseleave", () => {
    // console.log("hovered");

    const linkVariable = option.childNodes[1];
    const icon = linkVariable.childNodes[1];
    const spanText = linkVariable.childNodes[3];

    option.style.transform = "translate(0, 0px)";
    option.style.backgroundColor = "var(--icon-bg-color)";
    icon.style.color = "var(--icon-text-color)";
    spanText.style.color = "var(--icon-text-color)";
  });
}
