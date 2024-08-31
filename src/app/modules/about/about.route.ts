import { Router } from "express";
import { upload } from "../../../middlewares/multer.middleware";
import { aboutController } from "./about.controller";

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
    { name: "directorImage", maxCount: 1 },
    { name: "directorSign", maxCount: 1 },
  ]),
  aboutController.create
);

export const aboutRoute = router;
