import styled from "styled-components";

const ArticleContainer = styled.div`
  width: 95%;
  margin-top: 50px;
`;

const ArticleTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
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
