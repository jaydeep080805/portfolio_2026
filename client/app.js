const toastMessage = document.getElementById("toast-message");
const contactSubmitButton = document.getElementById("contact-submit-button");
import { API_URL } from "./config.js";

const animateMovement = () => {
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

contactSubmitButton.addEventListener("click", async (e) => {
  e.preventDefault();

  // get the input values
  const userEmail = document.getElementById("email").value;
  const emailSubject = document.getElementById("subject").value;
  const emailBody = document.getElementById("text-input").value;

  const payload = {
    userEmail: userEmail,
    emailSubject: emailSubject,
    emailBody: emailBody,
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
    console.log("Status:", res.status);
    console.log("Success flag:", data.isSuccessful);

    toastMessage.classList.add("success-style");
    toastMessage.textContent =
      "Email successfully sent, please check your spam for a confirmation email";
    animateMovement();
  } catch (err) {
    toastMessage.textContent = `${err}`;
    toastMessage.classList.add("error-style");
    animateMovement();

    console.error("Network error:", err);
  }
});
