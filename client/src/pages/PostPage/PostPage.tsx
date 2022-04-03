import React, { useEffect, useState } from "react";
import * as S from "./style";
import Button from "../../components/Atoms/Button/Button";
import { Input } from "../../components/Atoms/Input/style";
import { useSelector } from "react-redux";
import { RootReducerType } from "../../_reducers/rootReducer";
import { useLocation, useNavigate } from "react-router-dom";
import { createPost } from "../../API/post";
import { DUO, FREE } from "../IndexPage/constant/indexPage.constant";
import useSnackBar from "../../hooks/useSnackBar";

interface IPost {
  category: string;
  title: string;
  content: string;
}

const PostPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { snackbar } = useSnackBar();

  const info = useSelector((state: RootReducerType) => state.user.info);

  const [type, setType] = useState("");

  const [post, setPost] = useState<IPost>({
    category: "",
    title: "",
    content: "",
  });

  useEffect(() => {
    const type = location.pathname.slice(6).toUpperCase();

    setType(type);

    if (type === "UPDATE") {
      const qs = location.search.slice(1).split("&");

      let appendValues: any = {};

      qs.forEach((qs) => {
        const [k, v] = qs.split("=");

        appendValues[k] = decodeURIComponent(v);
      });

      console.log(appendValues);

      setPost({
        ...post,
        ...appendValues,
      });
    }
  }, []);

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
        snackbar(`성공!`, "success");

        navigate("/");
      }
    } catch (err: any) {
      snackbar(`무언가 이상해요! ${err.message}`, "error");
    }
  };

  const handleCheckPostValue = () => {
    if (post.category && post.title && post.content) {
      handleSubmit(post);
    } else {
      snackbar("모든 곳에 값을 넣어주세요!", "warning");
    }
  };

  return (
    <S.PostContainer>
      <S.PostTitleContainer>
        <h1>{type}</h1>
      </S.PostTitleContainer>
      <S.SelectContainer>
        <S.Select id="category" value={post.category} onChange={handleChangePostValue}>
          <option value="">카테고리를 선택해 주세요.</option>
          <option value={FREE}>자유</option>
          <option value={DUO}>듀오</option>
        </S.Select>
      </S.SelectContainer>
      <S.InputTitleContainer>
        <Input id="title" value={post.title} placeholder="제목을 입력해 주세요" onChange={handleChangePostValue} />
      </S.InputTitleContainer>
      <S.InputContentContainer>
        <textarea id="content" value={post.content} onChange={handleChangePostValue}></textarea>
      </S.InputContentContainer>
      <Button onClick={handleCheckPostValue}>{type === "CREATE" ? "만들기" : "수정하기"}</Button>
    </S.PostContainer>
  );
};

export default PostPage;
