import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Watch } from "react-loader-spinner";
import { deletePost } from "../../../API/post";
import useSnackBar from "../../../hooks/useSnackBar";

import Button from "../../Atoms/Button/Button";
import { IPost } from "../Post/interface/Post.interface";
import * as S from "./style";

interface IProps {
  loading?: boolean;
  article: Omit<IPost, "createdAt" | "updatedAt" | "__v">;
  user: { email: string };
}

const Article = ({ loading, article, user }: IProps) => {
  const { snackbar } = useSnackBar();
  const router = useRouter();

  const deleteArticle = async () => {
    try {
      await deletePost(article._id);

      snackbar("삭제 성공!", "success");

      router.push("/");
    } catch (err: any) {
      const errMessage = err.response.data.data || err.message;
      snackbar(errMessage, "error");
    }
  };

  return (
    <S.ArticleContainer>
      <S.ArticleTop>
        <S.Title>
          <h1>{article.title}</h1>
        </S.Title>
        <S.ArticleStatus>
          <S.CommentCount>댓글 {article.comments.length}</S.CommentCount>
          <S.Views>조회 {article.views}</S.Views>
        </S.ArticleStatus>
      </S.ArticleTop>
      <S.ArticleBottom>
        <S.Content>{article.content}</S.Content>
        {article.email === user.email && (
          <div className="delete">
            <Button>
              <Link
                href={`/post/update?_id=${article._id}&category=${article.category}&title=${encodeURIComponent(
                  article.title
                )}&content=${encodeURIComponent(article.content)}`}
              >
                수정하기
              </Link>
            </Button>
            <Button onClick={deleteArticle}>삭제하기</Button>
          </div>
        )}
      </S.ArticleBottom>
    </S.ArticleContainer>
  );
};

export default Article;
