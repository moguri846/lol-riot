import React from "react";
import { Watch } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { deletePost } from "../../../API/post";
import useSnackBar from "../../../hooks/useSnackBar";
import { IPost } from "../../../pages/IndexPage/interface/indexPage.interface";
import Button from "../../Atoms/Button/Button";
import * as S from "./style";

interface IProps {
  loading: boolean;
  article: Omit<IPost, "createdAt" | "updatedAt" | "__v">;
  user: { email: string };
}

const Article = ({ loading, article, user }: IProps) => {
  const navigate = useNavigate();
  const { snackbar } = useSnackBar();

  const deleteArticle = async () => {
    try {
      await deletePost(article._id);

      snackbar("삭제 성공!", "success");

      navigate("/");
    } catch (err: any) {
      const errMessage = err.response.data.data || err.message;
      snackbar(errMessage, "error");
    }
  };

  return (
    <S.ArticleContainer>
      {loading ? (
        <Watch width={400} height={200} wrapperClass="watch-loading" />
      ) : (
        <>
          <S.ArticleTop>
            <S.Title>
              <h1>{article.title}</h1>
            </S.Title>
            <S.ArticleStatus>
              <S.Category>{article.category}</S.Category>
              <S.Views>views {article.views++}</S.Views>
            </S.ArticleStatus>
          </S.ArticleTop>
          <S.ArticleBottom>
            <S.Content>{article.content}</S.Content>
            {article.writer === user.email && (
              <div className="delete">
                <Button>
                  <Link
                    to={`/post/update?_id=${article._id}&category=${article.category}&title=${encodeURIComponent(
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
        </>
      )}
    </S.ArticleContainer>
  );
};

export default Article;
