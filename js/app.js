const toastMessage = document.getElementById("toast-message");
const contactSubmitButton = document.getElementById("contact-submit-button");
import { API_URL } from "./config.js";
import { animateToastMessage, checkEmailValid } from "./utils.js";
import { projectInfo } from "./projectList.js";
import { toolsList } from "./toolsList.js";

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
  if (checkEmailValid(userEmail.value) != true) {
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
      throw new Error();
    }

    const data = await res.json();
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
const skillBarContainer = document.getElementsByClassName(
  "skill-bar-container",
)[0];

for (let stack in toolsList) {
  // create the seperate containers and add it the skill bar container
  // this will be used so that the heading and bars can be in a flex col
  const stackContainer = document.createElement("section");
  stackContainer.classList.add("stack-container");
  skillBarContainer.appendChild(stackContainer);

  // create and add the headings to the stack container within the skill bar container
  const heading = document.createElement("h2");
  heading.textContent = stack;
  stackContainer.appendChild(heading);

  // create a stack content which contains the actual bars
  // this allows flex to work in a col with the heading in the container
  const stackContent = document.createElement("div");
  stackContent.classList.add("stack-content");
  stackContainer.appendChild(stackContent);

  toolsList[stack].map((tool) => {
    const { name, fillAmount } = tool;

    // creates the container for both the skill text and the bar
    const skillContainer = document.createElement("div");
    skillContainer.classList.add("skill");
    stackContent.appendChild(skillContainer);

    // create the name span element for the skill
    const skillNameElement = document.createElement("p");
    skillNameElement.style.fontWeight = "bold";
    skillNameElement.style.marginBottom = "0.25rem";
    skillNameElement.style.fontFamily = "monospace";
    skillNameElement.textContent = name;
    skillContainer.appendChild(skillNameElement);

    // creates the empty bar
    const skillBar = document.createElement("div");
    skillBar.classList.add("blank");
    skillContainer.appendChild(skillBar);

    // adds the colour dynamically to the bar
    // adds both the colour and the sizing
    const skillFillAmount = document.createElement("div");
    skillFillAmount.classList.add("colour");
    skillFillAmount.style.backgroundColor = `var(--${name.toLowerCase()}-text-color)`;
    skillFillAmount.style.width = `${fillAmount}%`;
    skillBar.appendChild(skillFillAmount);
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
