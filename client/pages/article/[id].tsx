import { getPost } from "../../API/post";
import Article from "../../components/Organisms/Article/Article";
import Seo from "../../components/Seo/Seo";
import WithAuth from "../../hoc";
import { useAppSelector } from "../../hooks/useRedux";
import { selectInfo } from "../../toolkit/user/infoSlice/infoSlice";

const ArticlePage = ({ article }) => {
  const user = useAppSelector(selectInfo);

  return (
    <>
      <Seo title={article.title} />
      <Article article={article} user={user} />
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
