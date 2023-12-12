import axios, { AxiosInstance } from "axios";

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

export const customAxios = () => {
  const token = getCookie('tokenId');

  const baseAxios: AxiosInstance = axios.create({
    baseURL: "http://gamespringtestyachoi.ap-northeast-2.elasticbeanstalk.com/",
    // baseURL: "http://localhost:8080/",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  return baseAxios;
  
};
