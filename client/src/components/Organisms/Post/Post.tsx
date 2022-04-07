import React from "react";
import { TailSpin } from "react-loader-spinner";
import { IPost } from "../../../pages/IndexPage/interface/indexPage.interface";
import ArticleSummary from "../ArticleSummary/ArticleSummary";
import * as S from "./style";

interface IProps {
  loading: {
    mostPopular: boolean;
    duo: boolean;
    free: boolean;
  };
  posts: {
    mostPopular: IPost[];
    duo: IPost[];
    free: IPost[];
  };
}

const Post = ({ loading, posts }: IProps) => {
  const printArticleSummaryList = (title: string, loading: boolean, post: IPost[]) => {
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
          {printArticleSummaryList("인기글🤣", loading.mostPopular, posts.mostPopular)}
        </S.MostPopularPost>
        <S.FindDuoPost>{printArticleSummaryList("듀오 구함😏", loading.duo, posts.duo)}</S.FindDuoPost>
      </S.PostTop>
      <S.PostBottom>
        <S.FreePost>{printArticleSummaryList("자유게시판👋", loading.free, posts.free)}</S.FreePost>
      </S.PostBottom>
    </>
  );
};

export default Post;
