import { useSelector } from "react-redux";
import { getPost } from "../../API/post";
import Article from "../../components/Organisms/Article/Article";
import { RootReducerType } from "../../redux/reducers/rootReducer";

const ArticlePage = ({ article }) => {
  const user = useSelector((state: RootReducerType) => state.user.info);

  console.log("article", article);

  return <Article article={article} user={user} />;
};

export default ArticlePage;

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
