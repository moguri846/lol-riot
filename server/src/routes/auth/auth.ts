import { Router } from "express";
import SearchMyNameRoute from "./routes/searchMyNameAuth.route";
import kakaoRoute from "./routes/kakaoOAuth.route";
import naverRoute from "./routes/naverOAuth.route";

const router = Router();

router.use("/searchMyName", SearchMyNameRoute);
router.use("/kakao", kakaoRoute);
router.use("/naver", naverRoute);

export default router;
