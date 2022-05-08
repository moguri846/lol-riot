import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { createPost } from "../../API/post";
import PostCreateOrUpdate from "../../components/Organisms/PostCreateOrUpdate/PostCreateOrUpdate";
import useSnackBar from "../../hooks/useSnackBar";
import { RootReducerType } from "../../redux/reducers/rootReducer";

const CreatePage = () => {
  const router = useRouter();

  const { snackbar } = useSnackBar();

  const info = useSelector((state: RootReducerType) => state.user.info);

  const [post, setPost] = useState<Pick<IPost, "_id" | "category" | "title" | "content">>({
    _id: "",
    category: "",
    title: "",
    content: "",
  });

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
      const res = await createPost(body);

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

  return <PostCreateOrUpdate create onChangePostValue={onChangePostValue} onCheckPostValue={onCheckPostValue} />;
};

export default CreatePage;
