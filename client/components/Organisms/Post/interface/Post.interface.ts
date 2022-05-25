export interface IPost {
  _id: string;
  writer: string;
  category: string;
  title: string;
  content: string;
  views: number;
  comments: {
    _id?: string;
    writer: string;
    comment: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface IPostPromiseRusult {
  status: "fulfilled" | "rejected";
  key: string;
  data: IPost[] | [];
}
