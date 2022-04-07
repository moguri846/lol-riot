import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getPost } from "../../API/post";
import { RootReducerType } from "../../_reducers/rootReducer";
import Template from "../../components/Templates/MainTemplate/MainTemplate";

import Article from "../../components/Organisms/Article/Article";
import { IPost } from "../IndexPage/interface/indexPage.interface";

const ArticlePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector((state: RootReducerType) => state.user.info);

  const [article, setArticle] = useState<Omit<IPost, "createdAt" | "updatedAt" | "__v">>({
    category: "",
    title: "",
    content: "",
    views: 0,
    writer: "",
    _id: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getArticle = async () => {
      try {
        const id = location.pathname.slice(9);

        const {
          data: { data: article },
        } = await getPost(id);

        setArticle(article);

        setLoading(false);
      } catch (err: any) {
        navigate("/");

        window.location.reload();
      }
    };
    setLoading(true);
    getArticle();
  }, []);

  const Content = <Article loading={loading} article={article} user={user} />;

  return <Template Content={Content} />;
};

export default ArticlePage;
