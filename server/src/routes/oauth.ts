import { Router } from "express";
import kakaoRoute from "./OAuthRoutes/kakaoOAuth";
import naverRoute from "./OAuthRoutes/naverOAuth";

const router = Router();

router.use("/kakao", kakaoRoute);
router.use("/naver", naverRoute);

export default router;
