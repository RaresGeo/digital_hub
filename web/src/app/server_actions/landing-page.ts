"use server";
import type { AxiosResponse } from "axios";
import type {
  AboutAttributes,
  BaseResponse,
  HomepageAttributes,
  TallyAttributes,
} from "../types";
import client from "../utils/axios";

export async function fetchData<T>(url: string): Promise<T> {
  const response = (await client.get(url)) as AxiosResponse<BaseResponse<T>>;
  if (response.status === 200) {
    return response.data.data.attributes;
  }

  throw new Error(`Failed to fetch ${url}`);
}

export async function getHomepage(): Promise<HomepageAttributes> {
  return fetchData<HomepageAttributes>("/homepage");
}

export async function getAbout(): Promise<AboutAttributes> {
  return fetchData<AboutAttributes>("/about");
}

export async function getTally(): Promise<TallyAttributes> {
  return fetchData<AboutAttributes>("/tally");
}
