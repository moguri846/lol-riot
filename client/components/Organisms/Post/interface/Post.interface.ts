export interface IPost {
  _id: string;
  username: string;
  email: string;
  category: string;
  title: string;
  content: string;
  views: number;
  comments: IComments[];
  createdAt: string;
  updatedAt: string;
}

export interface IPostPromiseRusult {
  status: "fulfilled" | "rejected";
  key: string;
  data: IPost[] | [];
}

export interface IComments {
  _id?: string;
  username: string;
  email: string;
  comment: string;
  date: string;
}
