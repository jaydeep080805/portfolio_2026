const animateNavbar = (mobileMenuIsOpen, mobileNavIcon, mobileNavMenu) => {
  let heightTarget;
  let textPositionTarget;
  let heightPosition;
  let textPosition;

  if (mobileMenuIsOpen == false) {
    heightTarget = 150;
    textPositionTarget = 0;
    heightPosition = 0;
    textPosition = -150;
  } else {
    heightTarget = 0;
    textPositionTarget = -150;
    heightPosition = 150;
    textPosition = 0;
  }

  console.log(`Target: ${heightTarget}`);

  const heightInterval = setInterval(() => {
    mobileNavMenu.style.height = `${heightPosition}px`;

    if (mobileMenuIsOpen == false) {
      heightPosition += 3;
    } else {
      heightPosition -= 3;
    }

    if (heightPosition == heightTarget) {
      clearInterval(heightInterval);
    }
  }, 5);

  const textInterval = setInterval(() => {
    mobileNavMenu.style.transform = `translate(${textPosition}px, 0)`;

    if (mobileMenuIsOpen == false) {
      textPosition += 2;
    } else {
      textPosition -= 2;
    }

    if (textPosition == textPositionTarget) {
      clearInterval(textInterval);
    }
  }, 1);
};

export const mobileMenuAnimation = (mobileNavIcon, mobileMenuIsOpen) => {
  const mobileNavMenu = document.getElementsByClassName("navbar-list")[0];

  if (mobileMenuIsOpen == false) {
    animateNavbar(mobileMenuIsOpen, mobileNavIcon, mobileNavMenu);
  } else {
    animateNavbar(mobileMenuIsOpen, mobileNavIcon, mobileNavMenu);
  }
};
