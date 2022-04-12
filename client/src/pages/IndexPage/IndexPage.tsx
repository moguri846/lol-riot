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

  const [status, setStatus] = useState({
    mostPopular: {
      loading: false,
      failed: false,
    },
    duo: {
      loading: false,
      failed: false,
    },
    free: {
      loading: false,
      failed: false,
    },
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

      setStatus((status) => {
        return {
          ...status,
          [postType]: {
            ...[postType],
            loading: false,
          },
        };
      });
    } catch (err: any) {
      setStatus((status) => {
        return {
          ...status,
          [postType]: {
            loading: false,
            failed: true,
          },
        };
      });

      snackbar(err.message, "error");
    }
  };

  useEffect(() => {
    setStatus({
      mostPopular: {
        loading: true,
        failed: false,
      },
      duo: {
        loading: true,
        failed: false,
      },
      free: {
        loading: true,
        failed: false,
      },
    });

    getPosts(MOST_POPULAR, "mostPopular");
    getPosts(DUO, "duo");
    getPosts(FREE, "free");
  }, []);

  const Content = <Post status={status} posts={posts} />;

  return <Template Content={Content} />;
};

export default IndexPage;
