import { Router } from "express";
import { upload } from "../../../middlewares/multer.middleware";
import { heroController } from "./hero.controller";

const router = Router();

router
  .route("/")
  .post(
    upload.fields([
      { name: "banner", maxCount: 1 },
      { name: "backgroundBanner", maxCount: 1 },
      { name: "spiderBackground", maxCount: 1 },
      { name: "playButton", maxCount: 1 },
    ]),
    heroController.create
  )
  .get(heroController.read);

export const heroRoute = router;
