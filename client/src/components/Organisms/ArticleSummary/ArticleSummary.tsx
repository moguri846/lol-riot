import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import * as S from "./style";
import { Post } from "../../../pages/IndexPage/interface/indexPage.interface";

interface IProps {
  post: Post;
}

const ArticleSummary = ({ post }: IProps) => {
  return (
    <S.List>
      <div>
        <Link to={`/article/${post._id}`}>{post.title}</Link>
      </div>
      <div>{moment(post.createdAt).startOf("minute").fromNow()}</div>
    </S.List>
  );
};

export default ArticleSummary;
