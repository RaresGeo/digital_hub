import axios, { AxiosResponse } from "axios";
import { BaseResponse } from "../types";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BFF_URL,
  headers: {
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  },
});

async function fetchData<T>(url: string): Promise<T> {
  const response = (await axiosClient.get(url)) as AxiosResponse<
    BaseResponse<T>
  >;
  if (response.status === 200) {
    return response.data.data.attributes;
  }

  throw new Error(`Failed to fetch ${url}`);
}
export { fetchData };
export default axiosClient;
