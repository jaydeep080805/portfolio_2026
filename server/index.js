import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import "dotenv/config";

const app = express();

// used becuase addresses are different (i think)
app.use(cors());
// used to parse post req data
app.use(express.json());

// create the emailer
const transporter = nodemailer.createTransport({
  service: "SendinBlue",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_EMAIL,
    pass: process.env.BREVO_PASSWORD,
  },
});

app.post("/send-email", async (req, res) => {
  console.log("running");
  const formData = req.body;

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

  const messageToMe = {
    from: process.env.MY_EMAIL,
    to: process.env.MY_RECEIPT_EMAIL,
    subject: formData.emailSubject,
    text: `${formData.emailBody}\n\nSent from: ${formData.userEmail}`,
  };

  const messageToUser = {
    from: process.env.MY_EMAIL,
    to: formData.userEmail,
    subject: "Confirmation",
    text: "Thank you for getting in contact, I will reply to your email as soon as I can.",
  };

  try {
    const emailToMyselfInfo = await transporter.sendMail(messageToMe);
    console.log("Sent:", emailToMyselfInfo.messageId);

    const emailToUserInfo = await transporter.sendMail(messageToUser);
    console.log("Sent:", emailToUserInfo.messageId);
    return res.status(200).json({ isSuccessful: true });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ isSuccessful: false });
  }
});

export { app };
