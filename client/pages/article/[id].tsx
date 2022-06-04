import { useRouter } from "next/router";
import { useState } from "react";
import { addComment, getPost } from "../../API/post";
import Button from "../../components/Atoms/Button/Button";
import InputForm from "../../components/Molecules/InputForm/InputForm";
import Article from "../../components/Organisms/Article/Article";
import { IPost } from "../../components/Organisms/Post/interface/Post.interface";
import Seo from "../../components/Seo/Seo";
import WithAuth from "../../hoc";
import { useAppSelector } from "../../hooks/useRedux";
import useSnackBar from "../../hooks/useSnackBar";
import { selectInfo } from "../../toolkit/user/infoSlice/infoSlice";
import { selectToken } from "../../toolkit/user/tokenSlice/tokenSlice";
import moment from "moment";
import ArticleComments from "../../components/Organisms/ArticleComments/ArticleComments";

interface IProps {
  article: IPost;
}

const ArticlePage = ({ article }: IProps) => {
  const isLogin = useAppSelector(selectToken).isLogin;
  const user = useAppSelector(selectInfo);
  const router = useRouter();

  const { snackbar } = useSnackBar();

  const [comments, setComments] = useState(article.comments);

  const [comment, setComment] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.currentTarget.value);
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (checkCommentValue(comment)) {
        handleAddComment();
      }
    }
  };
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (checkCommentValue(comment)) {
      handleAddComment();
    }
  };

  const checkCommentValue = (comment: string) => {
    if (!comment) {
      snackbar("코맨트를 남겨주세요.", "warning");
      return false;
    }
    return true;
  };

  const handleAddComment = async () => {
    if (!isLogin) {
      snackbar("로그인 해주세요!", "warning");
      router.push("/signIn");
      return;
    }

    const body = {
      _id: article._id,
      comment: {
        username: user.username,
        email: user.email,
        comment,
        date: moment(moment().toDate()).format("YYYY-MM-DD hh:mm:ss"),
      },
    };

    try {
      await addComment(body);

      setComments([...comments, body.comment]);

      setComment("");
    } catch (err) {
      snackbar(err.message, "error");
    }
  };

  const events = { value: comment, onChange, onEnter, onClick };

  return (
    <>
      <Seo
        title={article.title}
        socialtitle={article.title}
        socialDesc={article.content}
        socialUrl={`${router.asPath}`}
      />
      <Article article={article} user={user} />
      <InputForm {...events} placeholder="Comment..." buttonValue="코맨트 남기기" />
      <ArticleComments comments={comments} />
    </>
  );
};

export default WithAuth(ArticlePage, null);

export const getServerSideProps = async ({ params }) => {
  const {
    data: { data: article },
  } = await getPost(params.id);

  return {
    props: {
      article,
    },
  };
};
