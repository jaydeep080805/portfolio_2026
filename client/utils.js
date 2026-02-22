// regex func to check if an email is in a valid format
export const checkEmailValid = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

// function to animate the Toast message to come in from the top and leave back out the top
export const animateToastMessage = (toastMessage, toastStatus, toastText) => {
  if (toastStatus == "error") {
    toastMessage.classList.add("error-style");
  } else {
    toastMessage.classList.add("success-style");
  }

  toastMessage.textContent = toastText;

  const lowestPoint = 0;
  const highestPoint = -200;
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
