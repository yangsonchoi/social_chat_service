import { UserService } from "../services/userService";
import { NextFunction, Request, Response } from "express";
import { DataSource } from "typeorm";

export class UserController {
  private userService: UserService;

  constructor(dataSource: DataSource) {
    this.userService = new UserService(dataSource);
  }
  // will be used from auth/signup to createUser 
  //   async createUser(req: Request, res: Response) {
  //     try {
  //       const user = await this.userService.createUser(req.body);
  //       res.status(201).json(user);
  //     } catch (error) {
  //       res.status(500);
  //     }
  //   }

  async getUserById(req: Request, res: Response) {
    try {
      const user = await this.userService.getUserById(parseInt(req.params.id));
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
}
