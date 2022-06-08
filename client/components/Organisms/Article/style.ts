import styled from "styled-components";

const ArticleContainer = styled.div`
  width: 100%;
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
  display: flex;
  justify-content: space-between;
`;

const ArticleStatusSpan = styled.span`
  &::after {
    content: "";
    margin-right: 5px;
  }
`;

const CommentCount = styled(ArticleStatusSpan)``;

const Category = styled(ArticleStatusSpan)``;

const Views = styled(ArticleStatusSpan)``;

const ArticleBottom = styled.div``;

const Content = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 10px;
`;

export { ArticleContainer, ArticleTop, Title, ArticleStatus, CommentCount, Category, Views, ArticleBottom, Content };
