import express from "express";
import { headerController } from "./header.controller";
import { upload } from "../../../middlewares/multer.middleware";

const router = express.Router();
router
  .route("/")
  .post(upload.single("logo"), headerController.create)
  .get(headerController.read);

router
  .route("/:id")
  .patch(headerController.update)
  .delete(headerController.vanish);

router
  .route("/logo/:id")
  .patch(upload.single("logo"), headerController.updateLogo);

export const headerRoute = router;
