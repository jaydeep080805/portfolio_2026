const contactSubmitButton = document.getElementById("contact-submit-button");
import { API_URL } from "./config.js";

contactSubmitButton.addEventListener("click", (e) => {
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

  fetch(`${API_URL}/send-email`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log(res.status);
      console.log(res.body);
      console.log(res.json());
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });
});
