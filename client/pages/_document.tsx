import { Html, Head, Main, NextScript } from "next/document";

import React from "react";

const MyDocument = () => {
  return (
    <Html lang="ko">
      <Head>
        <meta name="author" content="moguri846" />
        <meta name="keywords" content="SearchMyName, 롤, 롤 전적 검색, 롤 전적, 전적 검색, LOL, 리그오브레전드" />
        <meta name="description" content="상대와 비교해 부족한 점을 찾아드립니다. 지금 바로 SearchMyName!" />
        <meta property="og:site_name" content="SearchMyName" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="twitter:card" content="summary" />
      </Head>
      <Main />
      <NextScript />
    </Html>
  );
};

export default MyDocument;
