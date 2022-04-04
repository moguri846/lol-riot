import React, { useEffect, useState } from "react";
import { getCategoryPosts } from "../../API/post";
import ArticleSummary from "../../components/Organisms/ArticleSummary/ArticleSummary";
import useSnackBar from "../../hooks/useSnackBar";
import { DUO, FREE, MOST_POPULAR } from "./constant/indexPage.constant";
import { CategoryType, Post } from "./interface/indexPage.interface";
import * as S from "./style";

const IndexPage = () => {
  const [mostPopularPosts, setMostPopularPosts] = useState<Post[]>([]);
  const [duoPosts, setDuoPosts] = useState<Post[]>([]);
  const [freePosts, setFreePosts] = useState<Post[]>([]);

  const { snackbar } = useSnackBar();

  const getPosts = async (category: CategoryType) => {
    const {
      data: { data: posts },
    } = await getCategoryPosts(category);

    switch (category) {
      case MOST_POPULAR: {
        setMostPopularPosts(posts);
        break;
      }
      case DUO: {
        setDuoPosts(posts);
        break;
      }
      case FREE: {
        setFreePosts(posts);
        break;
      }
      default: {
        break;
      }
    }

    try {
    } catch (err: any) {
      snackbar(err, "error");
    }
  };

  useEffect(() => {
    getPosts(MOST_POPULAR);
    getPosts(DUO);
    getPosts(FREE);
  }, []);

  const printArticleSummaryList = (title: string, post: Post[]) => {
    return (
      <>
        <h1>{title}</h1>
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
    );
  };

  return (
    <>
      <S.PostTop>
        <S.MostPopularPost>{printArticleSummaryList("인기글🤣", mostPopularPosts)}</S.MostPopularPost>
        <S.FindDuoPost>{printArticleSummaryList("듀오 구함😏", duoPosts)}</S.FindDuoPost>
      </S.PostTop>
      <S.PostBottom>
        <S.FreePost>{printArticleSummaryList("자유게시판👋", freePosts)}</S.FreePost>
      </S.PostBottom>
    </>
  );
};

export default IndexPage;
