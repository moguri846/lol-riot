import styled from "styled-components";

const List = styled.li`
  display: flex;
  justify-content: space-between;

  & > div > a:hover {
    text-decoration: underline;
  }
`;

const ArticleInfoContainer = styled.div``;

const CommentCount = styled.span`
  color: #5383e8;
`;

const Date = styled.span``;

export { List, ArticleInfoContainer, CommentCount, Date };
