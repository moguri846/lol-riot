import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootReducerType } from "../../_reducers/rootReducer";
import { useLocation, useNavigate } from "react-router-dom";
import { createPost, updatePost } from "../../API/post";
import useSnackBar from "../../hooks/useSnackBar";
import Template from "../../components/Templates/MainTemplate/MainTemplate";
import PostCreateOrUpdate from "../../components/Organisms/PostCreateOrUpdate/PostCreateOrUpdate";

interface IPost {
  _id: string;
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

  const [post, setPost] = useState<Pick<IPost, "_id" | "category" | "title" | "content">>({
    _id: "",
    category: "",
    title: "",
    content: "",
  });

  useEffect(() => {
    const type = location.pathname.slice(6).toUpperCase();

    setType(type);

    if (type === "UPDATE") {
      const qs = location.search.slice(1).split("&");

      qs.forEach((qs) => {
        const [k, v] = qs.split("=");

        setPost((post) => {
          return {
            ...post,
            [k]: decodeURIComponent(v),
          };
        });
      });
    }
  }, []);

  const onChangePostValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.currentTarget.id;

    setPost({
      ...post,
      [target]: e.currentTarget.value,
    });
  };

  const handleSubmit = async ({ _id, category, title, content }: IPost) => {
    const body = {
      writer: info.email,
      category,
      title,
      content,
    };

    try {
      const res = type === "CREATE" ? await createPost(body) : await updatePost({ ...body, _id });

      if (res.data.success) {
        snackbar(`성공!`, "success");

        navigate("/");
      }
    } catch (err: any) {
      snackbar(`무언가 이상해요! ${err.message}`, "error");
    }
  };

  const onCheckPostValue = () => {
    if (post.category && post.title && post.content) {
      handleSubmit(post);
    } else {
      snackbar("모든 곳에 값을 넣어주세요!", "warning");
    }
  };

  const Content = (
    <PostCreateOrUpdate
      type={type}
      post={post}
      onChangePostValue={onChangePostValue}
      onCheckPostValue={onCheckPostValue}
    />
  );

  return <Template Content={Content} />;
};

export default PostPage;
