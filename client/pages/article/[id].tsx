import { useSelector } from "react-redux";
import { getPost } from "../../API/post";
import Article from "../../components/Organisms/Article/Article";
import Seo from "../../components/Seo/Seo";
import { RootReducerType } from "../../redux/reducers/rootReducer";

const ArticlePage = ({ article }) => {
  const user = useSelector((state: RootReducerType) => state.user.info);

  return (
    <>
      <Seo title={article.title} />
      <Article article={article} user={user} />
    </>
  );
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
