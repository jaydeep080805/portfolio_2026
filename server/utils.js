export const sendBrevoEmail = async (toEmail, toName, subject, htmlContent) => {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    throw new Error("BREVO_API_KEY not set");
  }

  // create the email
  const payload = {
    sender: {
      name: "Jaydeep",
      email: process.env.MY_EMAIL,
    },
    to: [
      {
        email: toEmail,
        name: toName || "sender",
      },
    ],
    subject: subject,
    htmlContent: htmlContent,
  };

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // handle the brevo error
    if (!response.ok) {
      const errorData = await response.json();

      // create the error message
      const errorMessage = new Error("Brevo req failed");

      // add the object keys to the Error object
      errorMessage.status = response.status;
      errorMessage.code = errorData.code;

      throw errorMessage;
    }

    const data = await response.json();
    console.log("Email sent! Message ID:", data.messageId);
    return data;
  } catch (err) {
    console.error(`Failed to send email: ${err}`);
    throw err;
  }
};
