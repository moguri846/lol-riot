import React from "react";
import moment from "moment";
import * as S from "./style";
import Link from "next/link";
import { IPost } from "../../../pages/post/interface/post.interface";

interface IProps {
  post: IPost;
}

const ArticleSummary = ({ post }: IProps) => {
  return (
    <S.List>
      <div>
        <Link href={`/article/${post._id}`}>{post.title}</Link>
      </div>
      <div>{moment(post.createdAt).startOf("minute").fromNow()}</div>
    </S.List>
  );
};

export default ArticleSummary;
