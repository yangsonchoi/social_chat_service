import express, { Request, Response } from "express";
import { AuthController } from "../controllers/authController";
import { AppDataSource } from "../config/typeOrmConfig";
import { body } from "express-validator";
import { validator } from "../utils/validator";

const router = express.Router();
const authController = new AuthController(AppDataSource);

const validateCredential = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("user name should not be empty"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password should not be empty"),
  validator,
];

router.post("/login", validateCredential, (req: Request, res: Response) => {
  authController.login(req, res);
});

router.post("/signup", validateCredential,  (req: Request, res: Response) => {
  authController.signup(req, res);
});

router.get("/me", (req, res) => {
  authController.getMyInfo(req, res);
});

export default router;
