import { Router } from "express";
import { upload } from "../../../middlewares/multer.middleware";

const router = Router();

router.route("/").post(
  upload.fields([
    { name: "service1", maxCount: 1 },
    { name: "service2", maxCount: 1 },
    { name: "service3", maxCount: 1 },
    { name: "service4", maxCount: 1 },
    { name: "leftImage", maxCount: 1 },
    { name: "rightImage", maxCount: 1 },
    { name: "playButton", maxCount: 1 },
    { name: "dotShape", maxCount: 1 },
    { name: "circleShape", maxCount: 1 },
    { name: "rectangleShape", maxCount: 1 },
    { name: "layShape", maxCount: 1 },
  ])
);

export const aboutRoute = router;
