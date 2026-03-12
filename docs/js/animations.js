// const animateNavbar = (mobileNavIcon, mobileNavMenu) => {};

const animateDown = (mobileNavIcon, mobileNavMenu) => {
  // change the styling of the icon
  mobileNavIcon.classList.remove("fa-bars");
  mobileNavIcon.classList.add("fa-x");

  // shows the menu list background
  // mobileNavMenu.classList.remove("hidden");

  let heightCounter = 0;
  const heightTarget = 150;

  const heightAnimation = setInterval(() => {
    mobileNavMenu.style.height = `${heightCounter}px`;
    heightCounter += 3;

    // console.log(heightCounter);

    if (heightCounter == heightTarget) {
      clearInterval(heightAnimation);
    }
  }, 5);

  // loop through
  let counter = -150;
  const mobileMenuAnimation = setInterval(() => {
    mobileNavMenu.style.transform = `translate(${counter}px, 0)`;
    counter += 2;

    if (counter == 0) {
      clearInterval(mobileMenuAnimation);
    }
  }, 1);
};

const animateUp = (mobileNavIcon, mobileNavMenu) => {
  // change the styling of the icon
  mobileNavIcon.classList.add("fa-bars");
  mobileNavIcon.classList.remove("fa-x");

  mobileNavMenu.classList.add("hidden");

  let heightCounter = 150;
  const heightTarget = 0;
  const heightAnimation = setInterval(() => {
    mobileNavMenu.style.height = `${heightCounter}px`;
    heightCounter -= 3;

    // console.log(heightCounter);

    if (heightCounter == heightTarget) {
      clearInterval(heightAnimation);
    }
  }, 5);

  // loop through
  let counter = 0;
  const mobileMenuAnimation = setInterval(() => {
    mobileNavMenu.style.transform = `translate(${counter}px, 0)`;
    counter -= 2;

    if (counter == -150) {
      clearInterval(mobileMenuAnimation);
    }
  }, 1);
};

export const mobileMenuAnimation = (mobileNavIcon, mobileMenuIsOpen) => {
  const mobileNavMenu = document.getElementsByClassName("navbar-list")[0];

  console.log(mobileMenuIsOpen);

  if (mobileMenuIsOpen == false) {
    animateDown(mobileNavIcon, mobileNavMenu);
  } else {
    animateUp(mobileNavIcon, mobileNavMenu);
  }
};
