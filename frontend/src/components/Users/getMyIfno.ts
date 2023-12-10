import { customAxios } from "../../Etc/customAxios";
import { AxiosResponse } from "axios";
import { User } from "./getUserAll";

export const getMyIfno = async () => {
  const res: AxiosResponse = await customAxios().get("/auth/me");
  const user: User = res.data;
  return { user };
};
