import { Methods } from "./common/methods";
import Send from "./interceptor";

const createPost = (post: any) => {
  return Send({
    method: Methods.POST,
    url: "/post/create",
    data: { post },
  });
};

export { createPost };
