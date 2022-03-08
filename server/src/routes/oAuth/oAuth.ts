import { Router } from "express";
import kakaoRoute from "./routes/kakaoOAuth";
import naverRoute from "./routes/naverOAuth";

const router = Router();

router.use("/kakao", kakaoRoute);
router.use("/naver", naverRoute);

export default router;
