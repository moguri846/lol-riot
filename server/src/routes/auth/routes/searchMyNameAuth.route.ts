import { Router } from "express";
import { authChecker } from "../../../middleware/auth";
import controller from "../../../controllers/auth/searchMyName.controller";

const router = Router();

router.post("/signUp", controller.signUp);

router.post("/signIn", controller.signIn);

router.get("/checkToken", authChecker, controller.checkToken);

router.get("/myInfo", authChecker, controller.myInfo);

router.post("/reissueToken", authChecker, controller.reissueToken);

router.post("/logout", authChecker, controller.logout);

export default router;
