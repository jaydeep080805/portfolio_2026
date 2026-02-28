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
      formData.userEmail,
      "",
      "Confirmation",
      "Thank you for contacting me, I will respond as soon as I can",
    );

    sendBrevoEmail(
      process.env.MY_RECEIPT_EMAIL,
      "",
      formData.emailSubject,
      formData.emailBody,
    );
    return res.status(200).json({ isSuccessful: true });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ isSuccessful: false });
  }
});

export { app };
