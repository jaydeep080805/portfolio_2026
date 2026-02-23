const toastMessage = document.getElementById("toast-message");
const contactSubmitButton = document.getElementById("contact-submit-button");
import { API_URL } from "./config.js";
import { animateToastMessage, checkEmailValid } from "./utils.js";

contactSubmitButton.addEventListener("click", async (e) => {
  e.preventDefault();

  // get the input values
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
    animateToastMessage(toastMessage, "error", "Don't be shy");
    return;
  }

  const payload = {
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
    userEmail.value = "";
    emailSubject.value = "";
    emailBody.value = "";
  } catch (err) {
    animateToastMessage(toastMessage, "error", err);
    console.error("Network error:", err);
  }
});
