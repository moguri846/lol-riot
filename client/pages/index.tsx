import { AxiosResponse } from "axios";
import type { NextPage } from "next";
import { getCategoryPosts } from "../API/post";
import { DUO, FREE, MOST_POPULAR } from "../components/Organisms/Post/constant/Post.constant";
import { IPost, IPostPromiseRusult } from "../components/Organisms/Post/interface/Post.interface";
import Post from "../components/Organisms/Post/Post";
import Seo from "../components/Seo/Seo";
import WithAuth from "../hoc";

const Home: NextPage = ({ posts }: { posts: IPostPromiseRusult[] }) => {
  return (
    <>
      <Seo title="Hello" />
      <Post posts={posts} />
    </>
  );
};

export default WithAuth(Home, null);

export const getServerSideProps = async () => {
  const data = (
    await Promise.allSettled([getCategoryPosts(MOST_POPULAR), getCategoryPosts(DUO), getCategoryPosts(FREE)])
  ).map((post: PromiseSettledResult<AxiosResponse<{ success: boolean; data: IPost[] }>>) => {
    let responseObj: IPostPromiseRusult = {
      status: "rejected",
      key: "",
      data: [],
    };

    if (post.status === "rejected") {
      const key = post.reason.config.url.split("=")[1];

      responseObj = {
        ...responseObj,
        key,
      };
    } else {
      const key = post.value.config.url.split("=")[1];
      const data = post.value.data.data;

      responseObj = {
        status: "fulfilled",
        key,
        data,
      };
    }

    return {
      ...responseObj,
    };
  });

  return {
    props: {
      posts: data,
    },
  };
};
