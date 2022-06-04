import styled from "styled-components";

const CommentList = styled.ul`
  width: 100%;
  margin: 10px 0px 50px 0px;
`;

const CommentItem = styled.li`
  padding: 0px 10px;
`;

const CommentInfoContainer = styled.div`
  height: 35px;
  display: flex;
`;

const UserName = styled.h2`
  height: 100%;
`;

const CommentDate = styled.span`
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const Comment = styled.p``;

export { CommentList, CommentItem, CommentInfoContainer, UserName, CommentDate, Comment };
