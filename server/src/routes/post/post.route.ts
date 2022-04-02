import { Router } from "express";
import { authChecker } from "../../middleware/auth";
import controller from "../../controllers/post/post.controller";

const router = Router();

router.post("/create", controller.create);

router.get("/getCategoryPosts", controller.getCategoryPosts);

router.get("/getPost", controller.getPost);

router.post("/updatePost", controller.updatePost);

router.get("/deletePost", authChecker, controller.deletePost);

export default router;
