import { customAxios } from "../../Etc/customAxios";
import { AxiosResponse } from "axios";
import { User } from "./getUserAll";

export const getRequestList = async () => {
  const res: AxiosResponse = await customAxios().get("/friend/requested");
  const userlist : User[] = res.data
  return { userlist };
};
