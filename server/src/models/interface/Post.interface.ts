export interface IPost {
  _id: string;
  username: string;
  email: string;
  category: string;
  title: string;
  content: string;
  views: number;
  comments: {
    username: string;
    email: string;
    comment: string;
  }[];
}

export interface IComments {
  _id?: string;
  username: string;
  email: string;
  comment: string;
  date: string;
}
