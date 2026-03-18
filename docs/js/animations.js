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
  const homeTextContainer = document.querySelector(
    ".typing-animation-container",
  );

  const letterList = text.split("");

  let wordList = [];
  let temporaryWord = [];

  for (let i = 0; i < letterList.length; i++) {
    // create seperate spans for each letter
    const newLetterElement = document.createElement("span");
    newLetterElement.textContent = letterList[i];
    newLetterElement.classList.add("letter");

    // add the letters to a temporary word list
    // this will allow for keeping track of each word so that the word can scale properly on mobile
    temporaryWord.push(newLetterElement);

    // add margin when there is a space to seperate words
    if (newLetterElement.textContent == " ") {
      newLetterElement.style.marginLeft = "1rem";

      // add the letters to the word list as a nested list
      // the structure will be like this: [
      // [letter.span, letter.span, letter.span],
      // [letter.span, letter.span, letter.span, letter.span, letter.span]
      // ]
      wordList.push(temporaryWord);

      // clear the temp list so that it doesn't push the whole text multiple times
      temporaryWord = [];
    }

    // makes sure to include the last word
    // the last word doesn't have a space at the end so the above if statement wont account for the last word
    if (i == letterList.length - 1) {
      wordList.push(temporaryWord);
    }

    // adds a translate y so the letters animate up slightly
    newLetterElement.style.transform = "translateY(5px)";

    // set the opacity to 0 for the fade in effect to make the animation smoother
    newLetterElement.style.opacity = 0;
  }

  // loop through each word and create a seperate div to contain the words
  wordList.map((word) => {
    const wordElement = document.createElement("div");
    wordElement.classList.add("word");

    // loop through each letter and add it tot he word element
    word.forEach((letter) => {
      wordElement.appendChild(letter);
    });

    // add the word div element to the container
    homeTextContainer.appendChild(wordElement);
  });

  // get a list of the letters that have been added
  // this gets the span elements not the actual list which is stored in letterList
  const letters = document.querySelectorAll(".letter");

  for (let i = 0; i < letters.length; i++) {
    setTimeout(() => {
      letters[i].style.opacity = 1;

      if (letters[i].textContent != " ") {
        letters[i].classList.add("last-letter");
      }

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

// function to animate the Toast message to come in from the top and leave back out the top
export const animateToastMessage = (toastMessage, toastStatus, toastText) => {
  if (toastStatus == "error") {
    toastMessage.classList.remove("success-style");
    toastMessage.classList.add("error-style");
  } else {
    toastMessage.classList.remove("error-style");
    toastMessage.classList.add("success-style");
  }

  toastMessage.textContent = toastText;

  const lowestPoint = 0;
  const highestPoint = -250;
  let counter = highestPoint;

  const animateDown = setInterval(() => {
    // console.log(counter);
    toastMessage.style.transform = `translate(0, ${counter}px)`;

    counter += 2;
    if (counter >= lowestPoint) {
      clearInterval(animateDown);
    }
  }, 1);

  setTimeout(() => {
    const animateUp = setInterval(() => {
      // console.log(counter);
      toastMessage.style.transform = `translate(0, ${counter}px)`;

      counter -= 2;
      if (counter <= highestPoint) {
        clearInterval(animateUp);
      }
    }, 1);
  }, 5000);
};
