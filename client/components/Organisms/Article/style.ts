import styled from "styled-components";

const ArticleContainer = styled.div`
  width: 100%;

  & > .watch-loading {
    height: 92vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ArticleTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;

  @media screen and (max-width: 750px) {
    flex-direction: column;
  }
`;

const Title = styled.div``;

const ArticleStatus = styled.div`
  width: 100px;
  display: flex;
  justify-content: space-between;
`;

const Category = styled.span``;

const Views = styled.span``;

const ArticleBottom = styled.div``;

const Content = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 10px;
`;

export { ArticleContainer, ArticleTop, Title, ArticleStatus, Category, Views, ArticleBottom, Content };
