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
  const homeText = document.querySelector(".typing-animation-container h2");

  const letterList = text.split("");

  for (let i = 0; i < letterList.length; i++) {
    setTimeout(() => {
      homeText.textContent += letterList[i];
    }, 100 * i);
  }
};
