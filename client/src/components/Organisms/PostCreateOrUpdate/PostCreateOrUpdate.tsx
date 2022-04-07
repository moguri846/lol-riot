import React from "react";
import { DUO, FREE } from "../../../pages/IndexPage/constant/indexPage.constant";
import { IPost } from "../../../pages/IndexPage/interface/indexPage.interface";
import Button from "../../Atoms/Button/Button";
import Input from "../../Atoms/Input/Input";
import * as S from "./style";

interface IProps {
  type: string;
  post: Pick<IPost, "_id" | "category" | "title" | "content">;
  onChangePostValue: (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => void;
  onCheckPostValue: () => void;
}

const PostCreateOrUpdate = ({ type, post, onChangePostValue, onCheckPostValue }: IProps) => {
  return (
    <S.PostContainer>
      <S.PostTitleContainer>
        <h1>{type}</h1>
      </S.PostTitleContainer>
      <S.SelectContainer>
        <S.Select id="category" value={post.category} onChange={onChangePostValue}>
          <option value="">카테고리를 선택해 주세요.</option>
          <option value={FREE}>자유</option>
          <option value={DUO}>듀오</option>
        </S.Select>
      </S.SelectContainer>
      <S.InputTitleContainer>
        <Input id="title" value={post.title} placeholder="제목을 입력해 주세요" onChange={onChangePostValue} />
      </S.InputTitleContainer>
      <S.InputContentContainer>
        <textarea id="content" value={post.content} onChange={onChangePostValue}></textarea>
      </S.InputContentContainer>
      <Button onClick={onCheckPostValue}>{type === "CREATE" ? "만들기" : "수정하기"}</Button>
    </S.PostContainer>
  );
};

export default PostCreateOrUpdate;
