import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { updatePost } from "../../API/post";
import { IPost } from "../../components/Organisms/Post/interface/Post.interface";
import PostCreateOrUpdate from "../../components/Organisms/PostCreateOrUpdate/PostCreateOrUpdate";
import Seo from "../../components/Seo/Seo";
import WithAuth from "../../hoc";
import { useAppSelector } from "../../hooks/useRedux";
import useSnackBar from "../../hooks/useSnackBar";
import { selectInfo } from "../../toolkit/user/infoSlice/infoSlice";

const UpdatePage = () => {
  const router = useRouter();

  const { snackbar } = useSnackBar();

  const info = useAppSelector(selectInfo);

  const [post, setPost] = useState<Pick<IPost, "_id" | "category" | "title" | "content">>({
    _id: "",
    category: "",
    title: "",
    content: "",
  });

  useEffect(() => {
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
  }, []);

  const onChangePostValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.currentTarget.id;

    setPost({
      ...post,
      [target]: e.currentTarget.value,
    });
  };

  const handleSubmit = async ({
    _id,
    category,
    title,
    content,
  }: Pick<IPost, "_id" | "category" | "title" | "content">) => {
    const body = {
      writer: info.email,
      category,
      title,
      content,
    };

    try {
      const res = await updatePost({ ...body, _id });

      if (res.data.success) {
        snackbar(`성공!`, "success");

        router.push("/");
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

  return (
    <>
      <Seo title="Update" socialtitle="게시글 생성" socialDesc="게시글 생성하기" socialUrl="/post/update" />
      <PostCreateOrUpdate
        update
        post={post}
        onChangePostValue={onChangePostValue}
        onCheckPostValue={onCheckPostValue}
      />
    </>
  );
};

export default WithAuth(UpdatePage, true);
