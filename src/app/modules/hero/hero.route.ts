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

router.route("/:id").patch(heroController.update).delete(heroController.vanish);

router.patch(
  "/update/banner/:id",
  upload.single("banner"),
  heroController.updateBanner
);
router.patch(
  "/update/back-banner/:id",
  upload.single("backgroundBanner"),
  heroController.updateBackgroundBanner
);
router.patch(
  "/update/spider/:id",
  upload.single("spiderBackground"),
  heroController.updateSpiderBackground
);
router.patch(
  "/update/play-button/:id",
  upload.single("playButton"),
  heroController.updatePlayButton
);

export const heroRoute = router;
