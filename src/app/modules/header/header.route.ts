import express from "express";
import { headerController } from "./header.controller";
import { upload } from "../../../middlewares/multer.middleware";

const router = express.Router();
router.route("/").post(upload.single("logo"), headerController.create);

export const headerRoute = router;
