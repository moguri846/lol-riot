import React from "react";
import { TailSpin } from "react-loader-spinner";
import { IPost } from "../../../pages/post/interface/post.interface";
import ArticleSummary from "../ArticleSummary/ArticleSummary";
import * as S from "./style";

interface IProps {
  posts: {
    mostPopular: IPost[];
    duo: IPost[];
    free: IPost[];
  };
}

const Post = ({ posts }: IProps) => {
  const printArticleSummaryList = (title: string, post: IPost[]) => {
    return (
      <>
        <h1>{title}</h1>
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
      </>
    );
  };

  return (
    <>
      <S.PostTop>
        <S.MostPopularPost>
          {printArticleSummaryList(
            "인기글🤣",

            posts.mostPopular
          )}
        </S.MostPopularPost>
        <S.FindDuoPost>{printArticleSummaryList("듀오 구함😏", posts.duo)}</S.FindDuoPost>
      </S.PostTop>
      <S.PostBottom>
        <S.FreePost>{printArticleSummaryList("자유게시판👋", posts.free)}</S.FreePost>
      </S.PostBottom>
    </>
  );
};

export default Post;
