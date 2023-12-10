import express from "express";
import { UserController } from "../controllers/userController";
import { AppDataSource } from "../config/typeOrmConfig";

const router = express.Router();
const userController = new UserController(AppDataSource);

// Route for creating a new user
// router.post("/", (req, res) => {
//   userController.createUser(req, res);
// });

// Route for getting all users
router.get("/", (req, res) => {
	userController.getUserById(req, res);
  });

// Route for getting a user by ID
router.get("/:id", (req, res) => {
  userController.getUserById(req, res);
});



export default router;
