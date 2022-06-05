import React from "react";
import moment from "moment";
import Link from "next/link";
import { IPost } from "../Post/interface/Post.interface";
import * as S from "./style";

interface IProps {
  post: IPost;
}

const ArticleSummary = ({ post }: IProps) => {
  return (
    <S.List>
      <S.ArticleInfoContainer>
        <Link href={`/article/${post._id}`}>{post.title}</Link>
        <S.CommentCount> [{post.comments.length}]</S.CommentCount>
      </S.ArticleInfoContainer>
      <S.Date>{moment(post.createdAt).startOf("minute").fromNow()}</S.Date>
    </S.List>
  );
};

export default ArticleSummary;
