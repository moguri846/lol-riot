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

interface IProps {
  article: IPost;
}

const ArticlePage = ({ article }: IProps) => {
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
    const body = {
      _id: article._id,
      comment: {
        writer: article.writer,
        comment,
      },
    };

    try {
      await addComment(body);

      setComments([...comments, body.comment]);
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
      <ul>
        {comments.map((c) => (
          <li key={c._id}>
            <div>
              <h2>writer {c.writer}</h2>
              <p>comment {c.comment}</p>
            </div>
          </li>
        ))}
      </ul>
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
