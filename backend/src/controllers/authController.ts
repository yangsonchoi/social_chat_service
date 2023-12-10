import { UserService } from "../services/userService";
import { Request, Response } from "express";
import { DataSource } from "typeorm";
import { getUserIdFromToken } from "../utils/tokenVerfy";

export class AuthController {
  private userService: UserService;

  constructor(dataSource: DataSource) {
    this.userService = new UserService(dataSource);
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const user = await this.userService.getUserWithPasswordByName(username);

      if (user) {
        if (user.password === password) {
          //TODO: return JWT Token
          res
            .status(200)
            .json({ token: { id: user.id, username: user.username } });
        } else {
          res.status(401).json({ message: "Invalid password" });
        }
      } else {
        res.status(401).json({ message: "Invalid username" });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async signup(req: Request, res: Response) {
    try {
      await this.userService.createUser(req.body);
      res.status(201);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  }

  //TODO: use JWT Token to validate
  async getMyInfo(req: Request, res: Response) {
    const userId = getUserIdFromToken(req);
    if (userId) {
      try {
        const user = await this.userService.getUserById(userId);
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: "User not found" });
        }
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        }
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
}
