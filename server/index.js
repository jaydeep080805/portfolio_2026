import express from "express";
import cors from "cors";
import "dotenv/config";
import { sendBrevoEmail } from "./utils.js";

const app = express();

// used becuase addresses are different (i think)
app.use(cors());
// used to parse post req data
app.use(express.json());

app.post("/send-email", async (req, res) => {
  console.log("running");
  const formData = req.body;

  const { userName, userEmail, emailSubject, emailBody } = formData;

  // convert the users name to title case
  let formattedUserName = "";
  const arrayOfLetter = String(userName).split("");

  let firstLetter = arrayOfLetter.shift();
  arrayOfLetter.unshift(firstLetter.toUpperCase());

  arrayOfLetter.map((l) => {
    formattedUserName += l;
  });

  try {
    for (let item in formData) {
      // if the inputs are empty
      if (String(formData[item]).trim().length <= 0) {
        throw new Error("Input shouldn't be empty");
      }
    }
  } catch (err) {
    return res.status(400).json({ isSuccessful: false });
  }

  try {
    sendBrevoEmail(
      userEmail,
      userName,
      "Confirmation",
      `<html><body><p style='font-weight: bold;'>Hello ${formattedUserName},</p>Thank you for contacting me, I will respond as soon as I can.</p></body></html>`,
    );

    sendBrevoEmail(
      process.env.MY_RECEIPT_EMAIL,
      "",
      emailSubject,
      `<html><body><p>${emailBody}</p><br><br><p>Name: ${formattedUserName}\nSent from: ${userEmail}</p></body></html>`,
    );
    return res.status(200).json({ isSuccessful: true });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ isSuccessful: false });
  }
});

export { app };
