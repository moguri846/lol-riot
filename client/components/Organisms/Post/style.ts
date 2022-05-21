import styled from "styled-components";

const PostTop = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 750px) {
    flex-direction: column;

    & > div {
      width: 100%;
      height: 100%;
      padding: 5px 0px;
    }
  }
`;

const MostPopularPost = styled.div`
  width: 370px;

  & > .no-data {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
  }
`;

const FindDuoPost = styled.div`
  width: 370px;

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
    width: 100%;
  }

  @media screen and (max-width: 750px) {
    & > div {
      padding: 5px 0px;
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
