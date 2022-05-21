export interface IPost {
  _id: string;
  writer: string;
  category: string;
  title: string;
  content: string;
  views: number;
  comments: {
    writer: string;
    comment: string;
  }[];
}
