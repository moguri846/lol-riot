import { Routes, Route } from "react-router-dom";

import React from "react";
import IndexPage from "../pages/IndexPage/IndexPage";
import SummonerPage from "../pages/SummonerPage/SummonerPage";
import MultiSearchPage from "../pages/MultiSearchPage/MultiSearchPage";
import LoginPage from "../pages/SignInPage/SignInPage";
import OAuth from "../components/OAuth";
import Auth from "../hoc/Auth/Auth";
import PostPage from "../pages/PostPage/PostPage";
import ArticlePage from "../pages/ArticlePage/ArticlePage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

/*
  null => 누구나 가능
  true => 로그인 한 사람만 가능
  false => 로그인 안 한 사람만 가능
*/

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={Auth(IndexPage, null)} />
      <Route path="/summoner=:summonerName" element={Auth(SummonerPage, null)} />
      <Route path="/multi_search=:summonerName" element={Auth(MultiSearchPage, null)} />
      <Route path="/signIn" element={Auth(LoginPage, false)} />
      <Route path="/signUp" element={Auth(SignUpPage, false)} />
      <Route path="/oauth/:type" element={Auth(OAuth, false)} />
      <Route path="/post/:type" element={Auth(PostPage, true)} />
      <Route path="/article/:id" element={Auth(ArticlePage, null)} />
      <Route path="*" element={Auth(NotFoundPage, null)} />
    </Routes>
  );
};

export default Router;
