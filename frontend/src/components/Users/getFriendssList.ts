import { customAxios } from "../../Etc/customAxios";
import { AxiosResponse } from "axios";
import { User } from "./getUserAll";



export const getFriendssList = async () => {
  const res: AxiosResponse = await customAxios().get("/friend");
  const userlist : User[] = res.data
  return { userlist };
};
