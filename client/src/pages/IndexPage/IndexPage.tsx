import React, { useEffect, useState } from "react";
import { getCategoryPosts } from "../../API/post";
import ArticleSummary from "../../components/Organisms/ArticleSummary/ArticleSummary";
import useSnackBar from "../../hooks/useSnackBar";
import { DUO, FREE, MOST_POPULAR } from "./constant/indexPage.constant";
import { CategoryType, Post } from "./interface/indexPage.interface";
import { TailSpin } from "react-loader-spinner";
import * as S from "./style";

const IndexPage = () => {
  const [posts, setPosts] = useState({
    mostPopular: [],
    duo: [],
    free: [],
  });

  const [loadings, setLoadings] = useState({
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

      setLoadings((loading) => {
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
    setLoadings({
      mostPopular: true,
      duo: true,
      free: true,
    });

    getPosts(MOST_POPULAR, "mostPopular");
    getPosts(DUO, "duo");
    getPosts(FREE, "free");
  }, []);

  const printArticleSummaryList = (title: string, loading: boolean, post: Post[]) => {
    return (
      <>
        <h1>{title}</h1>
        {loading ? (
          <>
            <div className="loading">
              <TailSpin wrapperClass="tail-spin-loading" />
            </div>
          </>
        ) : (
          <>
            {post.length === 0 ? (
              <>
                <div className="no-data">no data 🤦‍♂️</div>
              </>
            ) : (
              <>
                {post.map((post, idx) => (
                  <ArticleSummary key={idx} post={post} />
                ))}
              </>
            )}
          </>
        )}
      </>
    );
  };

  return (
    <>
      <S.PostTop>
        <S.MostPopularPost>
          {printArticleSummaryList("인기글🤣", loadings.mostPopular, posts.mostPopular)}
        </S.MostPopularPost>
        <S.FindDuoPost>{printArticleSummaryList("듀오 구함😏", loadings.duo, posts.duo)}</S.FindDuoPost>
      </S.PostTop>
      <S.PostBottom>
        <S.FreePost>{printArticleSummaryList("자유게시판👋", loadings.free, posts.free)}</S.FreePost>
      </S.PostBottom>
    </>
  );
};

export default IndexPage;
