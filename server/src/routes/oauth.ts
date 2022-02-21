import { Router } from "express";
import kakaoRoute from "./OAuthRoutes/kakaoOAuth";

const router = Router();

router.use("/kakao", kakaoRoute);

export default router;
