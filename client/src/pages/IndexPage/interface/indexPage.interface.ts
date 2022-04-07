import { DUO, FREE, MOST_POPULAR } from "../constant/indexPage.constant";

export interface IPost {
  category: string;
  content: string;
  createdAt: string;
  title: string;
  updatedAt: string;
  views: number;
  writer: string;
  __v: number;
  _id: string;
}

export type CategoryType = typeof MOST_POPULAR | typeof DUO | typeof FREE;
