import { Request, Response } from "express";
import asyncHandler from "../../../shared/async.handler";
import ApiError from "../../../errors/api.error";
import { File } from "../../../interfaces/files.type";
import { uploadOnCloudinary } from "../../../shared/cloudinary";
import { UploadApiResponse } from "cloudinary";
import { Hero } from "./hero.model";
import resSender from "../../../shared/res.sender";

// Define types for the request
interface RequestWithFiles extends Request {
  files?: { [key: string]: File[] } | File[] | any;
}

const create = asyncHandler(async (req: RequestWithFiles, res: Response) => {
  const {
    eyebrow,
    title,
    description,
    leftButton,
    leftButtonUrl,
    rightButton,
  } = req.body;

  // Validate required fields
  if (
    [eyebrow, title, description].some(
      (field) => typeof field === "string" && field.trim() === ""
    )
  ) {
    throw new ApiError(400, "Please fill all required fields");
  }

  const bannerLocal: File | undefined = req.files?.banner[0];
  const spiderBackgroundLocal: File | undefined =
    req.files?.spiderBackground[0];
  const backgroundBannerLocal: File | undefined =
    req.files?.backgroundBanner[0];
  const playButtonLocal: File | undefined = req.files?.playButton[0];

  if (!bannerLocal) {
    throw new ApiError(400, "Banner is required");
  }
  if (!spiderBackgroundLocal) {
    throw new ApiError(400, "Spider background is required");
  }

  if (!backgroundBannerLocal) {
    throw new ApiError(400, "Background banner is required");
  }

  if (!playButtonLocal) {
    throw new ApiError(400, "Play button is required");
  }
  // Upload files to Cloudinary
  const banner = await uploadOnCloudinary(bannerLocal.path);
  const spiderBackground = await uploadOnCloudinary(spiderBackgroundLocal.path);
  const backgroundBanner = await uploadOnCloudinary(
    backgroundBannerLocal?.path
  );
  const playButtonUpload = await uploadOnCloudinary(playButtonLocal?.path);

  const heroData = {
    eyebrow,
    title,
    description,
    left: {
      name: leftButton,
      url: leftButtonUrl,
    },
    right: {
      name: rightButton,
    },
    banner: {
      src: banner?.url,
      alt: bannerLocal.fieldname,
    },
    backgroundBanner: {
      src: backgroundBanner?.url,
      alt: backgroundBannerLocal?.fieldname,
    },
    spiderBackground: {
      src: spiderBackground?.url,
      alt: spiderBackgroundLocal?.fieldname,
    },
    playButton: {
      src: playButtonUpload?.url,
      alt: playButtonLocal?.fieldname,
    },
  };

  const hero = await Hero.create(heroData);
  resSender(res, {
    statusCode: 201,
    success: true,
    message: "Hero created successfully",
    data: hero,
  });
});

export const heroController = { create };
