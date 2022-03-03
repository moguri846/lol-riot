import styled from "styled-components";

const PostTop = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;

  & > div {
    padding: 10px;
  }
`;

const MostPopularPost = styled.div`
  width: 50%;

  & > .no-data {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
  }
`;

const FindDuoPost = styled.div`
  width: 50%;

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
  height: 50vh;

  & > div {
    padding: 10px;
  }
`;

const FreePost = styled.div`
  width: 100%;

  & > .no-data {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
  }
`;

export { PostTop, MostPopularPost, FindDuoPost, PostBottom, FreePost };
