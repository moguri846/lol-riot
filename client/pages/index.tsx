import type { NextPage } from "next";
import { getCategoryPosts } from "../API/post";
import { IPost } from "../components/Organisms/Post/interface/Post.interface";
import Post from "../components/Organisms/Post/Post";
import Seo from "../components/Seo/Seo";

const MOST_POPULAR = "MOST_POPULAR";
const DUO = "DUO";
const FREE = "FREE";

const Home: NextPage = ({
  posts,
}: {
  posts: {
    mostPopular: IPost[];
    duo: IPost[];
    free: IPost[];
  };
}) => {
  return (
    <>
      <Seo title="Hello" />
      <Post posts={posts} />
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  try {
    var {
      data: { data: mostPopular },
    } = await getCategoryPosts(MOST_POPULAR);
    var {
      data: { data: duo },
    } = await getCategoryPosts(DUO);
    var {
      data: { data: free },
    } = await getCategoryPosts(FREE);
  } catch (err) {
    console.log("err", err);
  }

  return {
    props: {
      posts: {
        mostPopular,
        duo,
        free,
      },
    },
  };
};
