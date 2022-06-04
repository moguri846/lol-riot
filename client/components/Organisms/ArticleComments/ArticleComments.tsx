import React from "react";
import { IComments } from "../Post/interface/Post.interface";
import * as S from "./style";

interface IProps {
  comments: IComments[];
}

const ArticleComments = ({ comments }: IProps) => {
  return (
    <S.CommentList>
      {comments.map((c) => (
        <S.CommentItem key={c._id + c.date}>
          <S.CommentInfoContainer>
            <S.UserName>{c.username}</S.UserName>
            <S.CommentDate>{c.date}</S.CommentDate>
          </S.CommentInfoContainer>
          <S.Comment>{c.comment}</S.Comment>
        </S.CommentItem>
      ))}
    </S.CommentList>
  );
};

export default ArticleComments;
