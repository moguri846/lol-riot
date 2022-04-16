import { Routes, Route } from "react-router-dom";

import React, { Suspense } from "react";
import Auth from "../hoc/Auth/Auth";
import IndexPage from "../pages/IndexPage/IndexPage";
const SummonerPage = React.lazy(() => import("../pages/SummonerPage/SummonerPage"));
const MultiSearchPage = React.lazy(() => import("../pages/MultiSearchPage/MultiSearchPage"));
const SignInPage = React.lazy(() => import("../pages/SignInPage/SignInPage"));
const OAuth = React.lazy(() => import("../components/OAuth"));
const PostPage = React.lazy(() => import("../pages/PostPage/PostPage"));
const ArticlePage = React.lazy(() => import("../pages/ArticlePage/ArticlePage"));
const SignUpPage = React.lazy(() => import("../pages/SignUpPage/SignUpPage"));
const NotFoundPage = React.lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

/*
  null => 누구나 가능
  true => 로그인 한 사람만 가능
  false => 로그인 안 한 사람만 가능
*/

const Router = () => {
  return (
    <Suspense fallback={<div className="loading"></div>}>
      <Routes>
        <Route path="/" element={Auth(IndexPage, null)} />
        <Route path="/summoner=:summonerName" element={Auth(SummonerPage, null)} />
        <Route path="/multi_search=:summonerName" element={Auth(MultiSearchPage, null)} />
        <Route path="/signIn" element={Auth(SignInPage, false)} />
        <Route path="/signUp" element={Auth(SignUpPage, false)} />
        <Route path="/oauth/:type" element={Auth(OAuth, false)} />
        <Route path="/post/:type" element={Auth(PostPage, true)} />
        <Route path="/article/:id" element={Auth(ArticlePage, null)} />
        <Route path="*" element={Auth(NotFoundPage, null)} />
      </Routes>
    </Suspense>
  );
};

export default Router;
