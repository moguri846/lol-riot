import React from "react";
import ErrorForm from "../../Molecules/ErrorForm/ErrorForm";
import ArticleSummary from "../ArticleSummary/ArticleSummary";
import { DUO, FREE, MOST_POPULAR } from "./constant/Post.constant";
import { IPostPromiseRusult } from "./interface/Post.interface";
import * as S from "./style";

interface IProps {
  posts: IPostPromiseRusult[];
}

const Post = ({ posts }: IProps) => {
  const printArticleSummaryList = (title: string, { status, data }: Omit<IPostPromiseRusult, "key">) => {
    return (
      <>
        <h1>{title}</h1>
        <>
          {status === "rejected" ? (
            <ErrorForm message="값을 가져오는데 실패했습니다 :(" message404="값을 가져오는데 실패했습니다 :(" />
          ) : (
            <>
              {data.length === 0 ? (
                <>
                  <div className="no-data">no data 🤦‍♂️</div>
                </>
              ) : (
                <>
                  {data.map((post, idx) => (
                    <ArticleSummary key={idx} post={post} />
                  ))}
                </>
              )}
            </>
          )}
        </>
      </>
    );
  };

  const filterPost = (posts: IPostPromiseRusult[], type: string) => {
    return posts.filter((post) => post.key === type)[0];
  };

  return (
    <>
      <S.PostTop>
        <S.MostPopularPost>{printArticleSummaryList("인기글🤣", filterPost(posts, MOST_POPULAR))}</S.MostPopularPost>
        <S.FindDuoPost>{printArticleSummaryList("듀오 구함😏", filterPost(posts, DUO))}</S.FindDuoPost>
      </S.PostTop>
      <S.PostBottom>
        <S.FreePost>{printArticleSummaryList("자유게시판👋", filterPost(posts, FREE))}</S.FreePost>
      </S.PostBottom>
    </>
  );
};

export default Post;
