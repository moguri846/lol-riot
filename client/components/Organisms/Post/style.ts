import styled from "styled-components";

const PostTop = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;

  & > div {
    padding: 5px;
  }

  & > div > .loading,
  & > div > .err {
    height: 426px;

    & > .tail-spin-loading,
    & > span {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  @media screen and (max-width: 740px) {
    flex-direction: column;

    & > div {
      width: 100%;
      height: 100%;
    }
  }
`;

const MostPopularPost = styled.div`
  width: 380px;

  & > .no-data {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
  }
`;

const FindDuoPost = styled.div`
  width: 380px;

  & > .no-data {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
  }
`;

const PostBottom = styled.div`
  width: 100%;

  & > div {
    padding: 5px;
  }

  & > div > .loading,
  & > div > .err {
    height: 322px;

    & > .tail-spin-loading,
    & > span {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const FreePost = styled.div`
  width: 750px;

  & > .no-data {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
  }
`;

export { PostTop, MostPopularPost, FindDuoPost, PostBottom, FreePost };
