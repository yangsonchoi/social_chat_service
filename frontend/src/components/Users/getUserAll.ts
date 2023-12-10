import { customAxios } from "../../Etc/customAxios";
import { AxiosResponse } from "axios";

export interface User {
  id: number;
  username: string;
  createdAt: string;
  friendCount: number;
}

export const getUserAll = async () => {
  const res: AxiosResponse = await customAxios().get("/users");
  const userlist : User[] = res.data
  return { userlist };
};
