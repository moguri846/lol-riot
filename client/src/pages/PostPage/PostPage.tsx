import React, { useState } from "react";
import * as S from "./style";
import Button from "../../components/Atoms/Button/Button";
import { Input } from "../../components/Atoms/Input/style";
import { useSelector } from "react-redux";
import { RootReducerType } from "../../_reducers/rootReducer";
import { useLocation, useNavigate } from "react-router-dom";
import { createPost } from "../../API/post";
import { DUO, FREE } from "../IndexPage/constant/indexPage.constant";

interface IPost {
  category: string;
  title: string;
  content: string;
}

const PostPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const info = useSelector((state: RootReducerType) => state.user.info);

  const [post, setPost] = useState<IPost>({
    category: "",
    title: "",
    content: "",
  });

  const handleChangePostValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.currentTarget.id;

    setPost({
      ...post,
      [target]: e.currentTarget.value,
    });
  };

  const handleSubmit = async ({ category, title, content }: IPost) => {
    const body = {
      writer: info.email,
      category,
      title,
      content,
    };

    try {
      const res = await createPost(body);

      if (res.data.success) {
        alert("게시물 등록 성공!");

        navigate("/");
      }
    } catch (err: any) {
      alert(`무언가 이상해요! ${err.message}`);
    }
  };

  const handleCheckPostValue = () => {
    if (post.category && post.title && post.content) {
      handleSubmit(post);
    } else {
      alert("모든 곳에 값을 넣어주세요!");
    }
  };

  return (
    <S.PostContainer>
      <S.PostTitleContainer>
        <h1>{location.pathname.slice(6).toUpperCase()}</h1>
      </S.PostTitleContainer>
      <S.SelectContainer>
        <S.Select id="category" onChange={handleChangePostValue}>
          <option value="">카테고리를 선택해 주세요.</option>
          <option value={FREE}>자유</option>
          <option value={DUO}>듀오</option>
        </S.Select>
      </S.SelectContainer>
      <S.InputTitleContainer>
        <Input id="title" placeholder="제목을 입력해 주세요" onChange={handleChangePostValue} />
      </S.InputTitleContainer>
      <S.InputContentContainer>
        <textarea id="content" onChange={handleChangePostValue}></textarea>
      </S.InputContentContainer>
      <Button onClick={handleCheckPostValue}>생성하기</Button>
    </S.PostContainer>
  );
};

export default PostPage;
