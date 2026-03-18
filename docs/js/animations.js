const animateNavbar = (mobileMenuIsOpen, mobileNavIcon, mobileNavMenu) => {
  let heightTarget;
  let textPositionTarget;
  let heightPosition;
  let textPosition;

  // sets the target values dependant on if the menu is open or not
  if (mobileMenuIsOpen == false) {
    // change the icon
    mobileNavIcon.classList.remove("fa-bars");
    mobileNavIcon.classList.add("fa-x");

    // the height and position they should be
    heightTarget = 150;
    textPositionTarget = 0;

    // their current positions
    heightPosition = 0;
    textPosition = -150;
  } else {
    // change the icon
    mobileNavIcon.classList.remove("fa-x");
    mobileNavIcon.classList.add("fa-bars");

    // the height and position they should be
    heightTarget = 0;
    textPositionTarget = -150;
    // their current positions
    heightPosition = 150;
    textPosition = 0;
  }

  const animateHeight = () => {
    mobileNavMenu.style.height = `${heightPosition}px`;

    if (mobileMenuIsOpen == false) {
      heightPosition += 5;
    } else {
      heightPosition -= 5;
    }

    if (heightPosition == heightTarget) {
      return;
    }

    requestAnimationFrame(animateHeight);
  };

  const animateText = () => {
    mobileNavMenu.style.transform = `translateX(${textPosition}px)`;

    if (mobileMenuIsOpen == false) {
      textPosition += 5;
    } else {
      textPosition += -5;
    }

    if (textPosition == textPositionTarget) {
      return;
    }

    requestAnimationFrame(animateText);
  };

  requestAnimationFrame(animateHeight);
  requestAnimationFrame(animateText);
};

export const mobileMenuAnimation = (mobileNavIcon, mobileMenuIsOpen) => {
  const mobileNavMenu = document.getElementsByClassName("navbar-list")[0];

  if (mobileMenuIsOpen == false) {
    animateNavbar(mobileMenuIsOpen, mobileNavIcon, mobileNavMenu);
  } else {
    animateNavbar(mobileMenuIsOpen, mobileNavIcon, mobileNavMenu);
  }
};

export const animateHomeText = () => {
  const text = "Hi I'm Jay, a Junior Software Engineer";
  // const homeText = document.querySelector(".typing-animation-container h2");
  const homeTextContainer = document.querySelector(
    ".typing-animation-container",
  );

  const letterList = text.split("");
  // const wordList = text.split(" ");

  // console.log(wordList);

  // let wordElementList = [];
  // let letterElementList = [];

  // wordList.forEach((element) => {
  //   // console.log("new word should be here");

  //   wordElementList = [];
  //   letterElementList = [];

  //   const wordElement = document.createElement("span");
  //   wordElement.classList.add("word");

  //   for (let i = 0; i < element.length; i++) {
  //     // console.log(element[i]);

  //     const newLetterElement = document.createElement("span");
  //     newLetterElement.textContent = element[i];
  //     newLetterElement.classList.add("letter");

  //     if (i == element.length - 1) {
  //       // add margin when the word is finished
  //       newLetterElement.classList.add("last-letter-of-word");
  //     }

  //     letterElementList.push(newLetterElement);
  //   }

  //   // add the individual letters as nested lists so they can be processed as words

  //   for (let i = 0; i)

  //   letterElementList.forEach((letterElement) => {
  //     letterElement.classList.contains("last-letter-of-word");

  //     // if (letterElement.classList.contains("last-letter-of-word")) {
  //     //   console.log("end of word");
  //     // } else {
  //     //   console.log("no end");
  //     // }
  //   });

  //   // letterElementList.map((letterElement) => {
  //   //   wordElementList.push([letterElement]);
  //   // });

  //   // wordElementList.map((element) => {
  //   //   console.log(element);
  //   // });

  //   // add each word to the container
  //   // wordElementList.map((element) => {
  //   //   console.log(element);

  //   //   homeTextContainer.appendChild(element);
  //   // });
  // });

  // homeTextContainer.appendChild();
  // console.log(wordElementList);

  // create a container for each word so they can wrap properly on mobile
  const wordContainer = document.createElement("div");

  for (let i = 0; i < letterList.length; i++) {
    const newLetterElement = document.createElement("span");
    newLetterElement.textContent = letterList[i];
    newLetterElement.classList.add("letter");

    if (newLetterElement.textContent == " ") {
      newLetterElement.style.marginLeft = "1rem";
    }

    // adds a translate y so the letters animate up slightly
    newLetterElement.style.transform = "translateY(4px)";

    // set the opacity to 0 for the fade in effect to make the animation smoother
    newLetterElement.style.opacity = 0;
    homeTextContainer.appendChild(newLetterElement);
  }

  // get a list of the letters that have been added
  // this gets the span elements not the actual list which is stored in letterList
  const letters = document.querySelectorAll(".letter");

  for (let i = 0; i < letters.length; i++) {
    setTimeout(() => {
      letters[i].style.opacity = 1;
      letters[i].classList.add("last-letter");

      letters[i].style.transform = "translateY(0)";

      // removed the caret if its not the last letter
      setTimeout(() => {
        if (i != letterList.length - 1) {
          letters[i].classList.remove("last-letter");
        }
      }, 100);
    }, 100 * i);
  }
};
