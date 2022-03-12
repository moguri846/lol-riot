import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getPost } from "../../API/post";
import useSnackBar from "../../hooks/useSnackBar";
import * as S from "./style";

const ArticlePage = () => {
  const location = useLocation();

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
        snackbar(err, "error");
      }
    };
    getArticle();
  }, []);

  return (
    <S.ArticleContainer>
      <S.ArticleTop>
        <div>
          <h1>{article.title}</h1>
        </div>
        <div>
          <S.Category>{article.category}</S.Category>
          <S.Views>views {article.views}</S.Views>
        </div>
      </S.ArticleTop>
      <S.ArticleBottom>
        <S.Content>{article.content}</S.Content>
      </S.ArticleBottom>
    </S.ArticleContainer>
  );
};

export default ArticlePage;
