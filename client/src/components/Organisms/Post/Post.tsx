import React from "react";
import { TailSpin } from "react-loader-spinner";
import { IPost } from "../../../pages/IndexPage/interface/indexPage.interface";
import ArticleSummary from "../ArticleSummary/ArticleSummary";
import * as S from "./style";

interface IProps {
  status: {
    mostPopular: {
      loading: boolean;
      failed: boolean;
    };
    duo: {
      loading: boolean;
      failed: boolean;
    };
    free: {
      loading: boolean;
      failed: boolean;
    };
  };
  posts: {
    mostPopular: IPost[];
    duo: IPost[];
    free: IPost[];
  };
}

const Post = ({ status, posts }: IProps) => {
  const printArticleSummaryList = (title: string, loading: boolean, failed: boolean, post: IPost[]) => {
    console.log("posts", posts);
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
            {failed ? (
              <div className="err">
                <span>문제가 생겼습니다</span>
              </div>
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
        )}
      </>
    );
  };

  return (
    <>
      <S.PostTop>
        <S.MostPopularPost>
          {printArticleSummaryList(
            "인기글🤣",
            status.mostPopular.loading,
            status.mostPopular.failed,
            posts.mostPopular
          )}
        </S.MostPopularPost>
        <S.FindDuoPost>
          {printArticleSummaryList("듀오 구함😏", status.duo.loading, status.duo.failed, posts.duo)}
        </S.FindDuoPost>
      </S.PostTop>
      <S.PostBottom>
        <S.FreePost>
          {printArticleSummaryList("자유게시판👋", status.free.loading, status.free.failed, posts.free)}
        </S.FreePost>
      </S.PostBottom>
    </>
  );
};

export default Post;
