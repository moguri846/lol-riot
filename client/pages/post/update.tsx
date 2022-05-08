import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { updatePost } from "../../API/post";
import PostCreateOrUpdate from "../../components/Organisms/PostCreateOrUpdate/PostCreateOrUpdate";
import useSnackBar from "../../hooks/useSnackBar";
import { RootReducerType } from "../../redux/reducers/rootReducer";

const UpdatePage = () => {
  const router = useRouter();

  const { snackbar } = useSnackBar();

  const info = useSelector((state: RootReducerType) => state.user.info);

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

  const handleSubmit = async ({ _id, category, title, content }: IPost) => {
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
    <PostCreateOrUpdate update post={post} onChangePostValue={onChangePostValue} onCheckPostValue={onCheckPostValue} />
  );
};

export default UpdatePage;
