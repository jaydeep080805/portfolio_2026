import request from "supertest";
import { app } from "./index.js";
import "dotenv/config";

describe("POST /send-email", () => {
  describe("if details are provided", () => {
    test("should respond with 200 status code and isSuccessful: true", async () => {
      const response = await request(app).post("/send-email").send({
        userName: "name",
        userEmail: process.env.MY_RECEIPT_EMAIL,
        emailSubject: "test",
        emailBody: "this is sent from test file",
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("isSuccessful", true);
    });
  });

  describe("if details are not provided", () => {
    test("should respond with 500 status and isSuccessful: false", async () => {
      const response = await request(app).post("/send-email").send({
        userName: "",
        userEmail: "",
        emailSubject: "",
        emailBody: "",
      });

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty("isSuccessful", false);
    });
  });

  describe("if any other error occurs", () => {
    test("should respond with 500 status and code: missing_parameter", async () => {
      const response = await request(app).get("/test-send-email").send();

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty("code", "missing_parameter");
    });
  });
});
