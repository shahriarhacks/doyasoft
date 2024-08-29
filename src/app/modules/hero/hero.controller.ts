import { Request, Response } from "express";
import asyncHandler from "../../../shared/async.handler";
import ApiError from "../../../errors/api.error";
import { File } from "../../../interfaces/files.type";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../../../shared/cloudinary";
import { Hero } from "./hero.model";
import resSender from "../../../shared/res.sender";
import { IHero } from "./hero.interface";

// Define types for the request
export interface RequestWithFiles extends Request {
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
  resSender<IHero>(res, {
    statusCode: 201,
    success: true,
    message: "Hero created successfully",
    data: hero,
  });
});

const read = asyncHandler(async (req: Request, res: Response) => {
  const hero = await Hero.findOne();
  resSender<IHero>(res, {
    statusCode: 200,
    success: true,
    message: "Hero fetched successfully",
    data: hero,
  });
});

const update = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...data } = req.body;
  const hero = await Hero.findByIdAndUpdate(id, data, { new: true });
  resSender<IHero>(res, {
    statusCode: 200,
    success: true,
    message: "Hero updated successfully",
    data: hero,
  });
});

const updateBanner = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const bannerLocalPath = req.file?.path;
  if (!bannerLocalPath) {
    throw new ApiError(400, "Logo is required");
  }
  const banner = await uploadOnCloudinary(bannerLocalPath);
  if (!banner) {
    throw new ApiError(500, "Failed to upload banner");
  }
  const hero = await Hero.findById({ _id: id });
  if (!hero) {
    throw new ApiError(404, "hero not found");
  }
  await deleteFromCloudinary(hero.banner.src);

  hero.banner.src = banner.url;
  await hero.save();
  resSender<IHero>(res, {
    statusCode: 200,
    success: true,
    message: "banner updated successfully",
    data: hero,
  });
});
const updateBackgroundBanner = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const backgroundBannerLocalPath = req.file?.path;
    if (!backgroundBannerLocalPath) {
      throw new ApiError(400, "Logo is required");
    }
    const backgroundBanner = await uploadOnCloudinary(
      backgroundBannerLocalPath
    );
    if (!backgroundBanner) {
      throw new ApiError(500, "Failed to upload backgroundBanner");
    }
    const hero = await Hero.findById({ _id: id });
    if (!hero) {
      throw new ApiError(404, "hero not found");
    }
    await deleteFromCloudinary(hero.backgroundBanner.src);

    hero.backgroundBanner.src = backgroundBanner.url;
    await hero.save();
    resSender<IHero>(res, {
      statusCode: 200,
      success: true,
      message: "backgroundBanner updated successfully",
      data: hero,
    });
  }
);
const updateSpiderBackground = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const spiderBackgroundLocalPath = req.file?.path;
    if (!spiderBackgroundLocalPath) {
      throw new ApiError(400, "Spider background is required");
    }
    const spiderBackground = await uploadOnCloudinary(
      spiderBackgroundLocalPath
    );
    if (!spiderBackground) {
      throw new ApiError(500, "Failed to upload spiderBackground");
    }
    const hero = await Hero.findById({ _id: id });
    if (!hero) {
      throw new ApiError(404, "hero not found");
    }
    await deleteFromCloudinary(hero.spiderBackground.src);
    hero.spiderBackground.src = spiderBackground.url;
    await hero.save();
    resSender<IHero>(res, {
      statusCode: 200,
      success: true,
      message: "spiderBackground updated successfully",
      data: hero,
    });
  }
);

const updatePlayButton = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const playButtonLocalPath = req.file?.path;
  if (!playButtonLocalPath) {
    throw new ApiError(400, "Logo is required");
  }
  const playButton = await uploadOnCloudinary(playButtonLocalPath);
  if (!playButton) {
    throw new ApiError(500, "Failed to upload playButton");
  }
  const hero = await Hero.findById({ _id: id });
  if (!hero) {
    throw new ApiError(404, "hero not found");
  }
  await deleteFromCloudinary(hero.playButton.src);
  hero.playButton.src = playButton.url;
  await hero.save();
  resSender<IHero>(res, {
    statusCode: 200,
    success: true,
    message: "playButton updated successfully",
    data: hero,
  });
});

const vanish = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const hero = await Hero.findById({ _id: id });
  if (hero) {
    await deleteFromCloudinary(hero.banner.src);
    await deleteFromCloudinary(hero.backgroundBanner.src);
    await deleteFromCloudinary(hero.spiderBackground.src);
    await deleteFromCloudinary(hero.playButton.src);
  }
  const heros = await Hero.deleteOne({ _id: id }).lean();
  resSender<IHero>(res, {
    statusCode: 200,
    success: true,
    message: "Hero deleted successfully",
  });
});

export const heroController = {
  create,
  read,
  update,
  updateBanner,
  updateBackgroundBanner,
  updateSpiderBackground,
  updatePlayButton,
  vanish,
};
