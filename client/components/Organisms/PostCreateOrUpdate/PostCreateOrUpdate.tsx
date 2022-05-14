import React from "react";
import { IPost } from "../../../pages/IndexPage/interface/indexPage.interface";
import Button from "../../Atoms/Button/Button";
import Input from "../../Atoms/Input/Input";
import * as S from "./style";

const DUO = "DUO";
const FREE = "FREE";

interface IProps {
  create?: boolean;
  update?: boolean;
  post?: Pick<IPost, "_id" | "category" | "title" | "content">;
  onChangePostValue: (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => void;
  onCheckPostValue: () => void;
}

const PostCreateOrUpdate = ({ create, update, post, onChangePostValue, onCheckPostValue }: IProps) => {
  return (
    <S.PostContainer>
      <S.PostTitleContainer>
        <h1>{create ? "CREATE" : "UPDATE"}</h1>
      </S.PostTitleContainer>
      <S.SelectContainer>
        <S.Select id="category" value={update && post.category} onChange={onChangePostValue}>
          <option value="">카테고리를 선택해 주세요.</option>
          <option value={FREE}>자유</option>
          <option value={DUO}>듀오</option>
        </S.Select>
      </S.SelectContainer>
      <S.InputTitleContainer>
        <Input
          id="title"
          value={update && post.title}
          placeholder="제목을 입력해 주세요"
          onChange={onChangePostValue}
        />
      </S.InputTitleContainer>
      <S.InputContentContainer>
        <textarea id="content" value={update && post.content} onChange={onChangePostValue}></textarea>
      </S.InputContentContainer>
      <Button onClick={onCheckPostValue}>{create ? "만들기" : "수정하기"}</Button>
    </S.PostContainer>
  );
};

export default PostCreateOrUpdate;
