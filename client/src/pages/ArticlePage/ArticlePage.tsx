import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deletePost, getPost } from "../../API/post";
import Button from "../../components/Atoms/Button/Button";
import useSnackBar from "../../hooks/useSnackBar";
import { RootReducerType } from "../../_reducers/rootReducer";
import * as S from "./style";

const ArticlePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector((state: RootReducerType) => state.user.info);

  const { snackbar } = useSnackBar();

  const [article, setArticle] = useState({
    category: "",
    title: "",
    content: "",
    views: 0,
    writer: "",
    _id: "",
  });

  useEffect(() => {
    const getArticle = async () => {
      try {
        const id = location.pathname.slice(9);

        const {
          data: { data: article },
        } = await getPost(id);

        setArticle(article);
      } catch (err: any) {
        navigate("/");
        window.location.reload();
      }
    };
    getArticle();
  }, []);

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
      <S.ArticleTop>
        <S.Title>
          <h1>{article.title}</h1>
        </S.Title>
        <S.ArticleStatus>
          <S.Category>{article.category}</S.Category>
          <S.Views>views {article.views}</S.Views>
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
    </S.ArticleContainer>
  );
};

export default ArticlePage;
