import React from "react";
import moment from "moment";
import * as S from "./style";
import { IPost } from "../../../pages/IndexPage/interface/indexPage.interface";
import Link from "next/link";

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
