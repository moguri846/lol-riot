import { makeQueryString } from "./common/commonFunc";
import { Methods } from "./common/methods";
import Send from "./interceptor";

const createPost = (post: any) => {
  return Send({
    method: Methods.POST,
    url: "/post/create",
    data: { post },
  });
};

const getCategoryPosts = (category: string) => {
  const queryStringObj = {
    category,
  };

  return Send({
    method: Methods.GET,
    url: `/post/getCategoryPosts?${makeQueryString(queryStringObj)}`,
  });
};

const updatePost = (post: any) => {
  return Send({
    method: Methods.POST,
    url: "/post/updatePost",
    data: { post },
  });
};

const deletePost = (id: number) => {
  const queryStringObj = {
    id,
  };

  return Send({
    method: Methods.GET,
    url: `/post/deletePost?${makeQueryString(queryStringObj)}`,
  });
};

export { createPost, getCategoryPosts, updatePost, deletePost };
