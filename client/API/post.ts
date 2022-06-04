import { IComments } from "../components/Organisms/Post/interface/Post.interface";
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

const getPost = (id: string) => {
  const queryStringObj = {
    id,
  };

  return Send({
    method: Methods.GET,
    url: `/post/getPost?${makeQueryString(queryStringObj)}`,
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

const deletePost = (id: string) => {
  const queryStringObj = {
    id,
  };

  return Send({
    method: Methods.GET,
    url: `/post/deletePost?${makeQueryString(queryStringObj)}`,
  });
};

const addComment = (body: { _id: string; comment: Omit<IComments, "_id"> }) => {
  return Send({
    method: Methods.POST,
    url: `/post/addComment`,
    data: body,
  });
};

export { createPost, getPost, getCategoryPosts, updatePost, deletePost, addComment };
