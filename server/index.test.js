import request from "supertest";
import { app } from "./index.js";
import "dotenv/config";

describe("POST /send-email", () => {
  describe("if details are provided", () => {
    test("should respond with 200 status code and isSuccessful: true", async () => {
      const response = await request(app).post("/send-email").send({
        userEmail: process.env.MY_RECEIPT_EMAIL,
        emailSubject: "test",
        emailBody: "this is sent from test file",
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("isSuccessful", true);
    });
  });

  describe("if details are not provided", () => {
    test("should respond with 400 status and isSuccessful: false", async () => {
      const response = await request(app).post("/send-email").send({
        userEmail: "",
        emailSubject: "",
        emailBody: "",
      });

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("isSuccessful", false);
    });
  });
});
