import { customAxios } from "../../Etc/customAxios";
import { AxiosResponse } from "axios";
import { User } from "../Users/getUserAll";

export const getAddresseeList = async () => {
  const res: AxiosResponse = await customAxios().get("/friend/addressed");
  const userlist : User[] = res.data
  return { userlist };
};
