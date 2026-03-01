import express from "express";
import cors from "cors";
import "dotenv/config";
import { sendBrevoEmail } from "./utils.js";

const app = express();

// used becuase addresses are different (i think)
app.use(cors());
// used to parse post req data
app.use(express.json());

app.get("/test-route-online", (req, res) => {
  return res.status(200).json({ status: "success" });
});

app.post("/send-email", async (req, res) => {
  console.log("running");
  const formData = req.body;

  let { userName, userEmail, emailSubject, emailBody } = formData;

  try {
    for (let item in formData) {
      // if the inputs are empty
      if (String(formData[item]).trim().length <= 0) {
        throw new Error("Input shouldn't be empty");
      }
    }

    // convert the users name to title case
    let formattedUserName = "";
    const arrayOfLetter = String(userName).split("");

    let firstLetter = arrayOfLetter.shift();
    arrayOfLetter.unshift(firstLetter.toUpperCase());

    arrayOfLetter.map((l) => {
      formattedUserName += l;
    });

    // nest the try block to maintain the variable scope
    // if this is outside the parent try block it will not have access to the variables
    try {
      const emailToUser = `
        <html>
          <body>
            <p style='font-weight: bold;'>Hello ${formattedUserName},</p>
            Thank you for contacting me, 
            I will respond as soon as I can.<br><br>
            Kind regards,<br>
            Jay</p>
          </body>
        </html>
      `;

      await sendBrevoEmail(userEmail, userName, "Confirmation", emailToUser);

      const emailToMyself = `
        <html>
          <body>
            <p>${emailBody}</p>
            <br><br>
            <p>Name: ${formattedUserName}<br>
            Sent from: ${userEmail}
            </p>
          </body>
        </html>
        `;

      await sendBrevoEmail(
        process.env.MY_RECEIPT_EMAIL,
        "",
        emailSubject,
        emailToMyself,
      );
      return res.status(200).json({ isSuccessful: true });
    } catch (err) {
      // catch the errors for sending emails
      console.error(`thrown when sending the emails: ${err}`);
      return res.status(400).json({ isSuccessful: false });
    }
  } catch (err) {
    // catch the errors for setting the variables
    console.log(`thrown during initialisation/formatting of data: ${err}`);
    return res.status(500).json({ isSuccessful: false });
  }
});

app.get("/test-send-email", async (req, res) => {
  try {
    await sendBrevoEmail("", "", "", "");
  } catch (err) {
    return res.status(500).json(err);
  }
});

export { app };
