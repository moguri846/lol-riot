import { Router } from "express";
import SearchMyNameRoute from "./routes/searchMyNameAuth";
import kakaoRoute from "./routes/kakaoOAuth";
import naverRoute from "./routes/naverOAuth";

const router = Router();

router.use("/searchMyName", SearchMyNameRoute);
router.use("/kakao", kakaoRoute);
router.use("/naver", naverRoute);

export default router;
