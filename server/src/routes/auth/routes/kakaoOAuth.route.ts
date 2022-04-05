import { Router } from "express";
import controller from "../../../controllers/auth/kakao.controller";

const router = Router();

router.post("/signIn", controller.signIn);

router.get("/myInfo", controller.myInfo);

router.post("/reissueToken", controller.reissueToken);

router.post("/logout", controller.logout);

export default router;
