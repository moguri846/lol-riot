import React, { useEffect, useState } from "react";
import { getCategoryPosts } from "../../API/post";
import useSnackBar from "../../hooks/useSnackBar";
import Post from "../../components/Organisms/Post/Post";
import Template from "../../components/Templates/MainTemplate/MainTemplate";
import { CategoryType } from "./interface/indexPage.interface";
import { DUO, FREE, MOST_POPULAR } from "./constant/indexPage.constant";

const IndexPage = () => {
  const [posts, setPosts] = useState({
    mostPopular: [],
    duo: [],
    free: [],
  });

  const [loading, setLoading] = useState({
    mostPopular: false,
    duo: false,
    free: false,
  });

  const { snackbar } = useSnackBar();

  const getPosts = async (category: CategoryType, postType: string) => {
    try {
      const {
        data: { data: postss },
      } = await getCategoryPosts(category);

      setPosts((post) => {
        return {
          ...post,
          [postType]: postss,
        };
      });

      setLoading((loading) => {
        return {
          ...loading,
          [postType]: false,
        };
      });
    } catch (err: any) {
      snackbar(err, "error");
    }
  };

  useEffect(() => {
    setLoading({
      mostPopular: true,
      duo: true,
      free: true,
    });

    getPosts(MOST_POPULAR, "mostPopular");
    getPosts(DUO, "duo");
    getPosts(FREE, "free");
  }, []);

  const Content = <Post loading={loading} posts={posts} />;

  return <Template Content={Content} />;
};

export default IndexPage;
