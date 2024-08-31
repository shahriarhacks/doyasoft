import { Response } from "express";
import asyncHandler from "../../../shared/async.handler";
import { File, RequestWithFiles } from "../../../interfaces/files.type";
import ApiError from "../../../errors/api.error";
import { uploadOnCloudinary } from "../../../shared/cloudinary";
import { About } from "./about.model";
import resSender from "../../../shared/res.sender";
import { IAbout } from "./about.interface";

const create = asyncHandler(async (req: RequestWithFiles, res: Response) => {
  const {
    eyebrow,
    title,
    description,
    service1,
    service2,
    service3,
    service4,
    directorName,
    directorDesignation,
    button,
    buttonUrl,
  } = req.body;
  if (
    [
      eyebrow,
      title,
      description,
      service1,
      service2,
      service3,
      service4,
      directorName,
      directorDesignation,
      button,
      buttonUrl,
    ].some((x) => x.trim() === "")
  ) {
    throw new ApiError(400, "Please fill all the fields");
  }
  const service1IconLocal: File | undefined = req.files?.webIcon[0];
  const service2IconLocal: File | undefined = req.files?.appIcon[0];
  const service3IconLocal: File | undefined = req.files?.uiIcon[0];
  const service4IconLocal: File | undefined = req.files?.ppsIcon[0];
  const leftImageLocal: File | undefined = req.files?.leftImage[0];
  const rightImageLocal: File | undefined = req.files?.rightImage[0];
  const playButtonLocal: File | undefined = req.files?.playButton[0];
  const dotShapeLocal: File | undefined = req.files?.dotShape[0];
  const circleShapeLocal: File | undefined = req.files?.circleShape[0];
  const rectangleShapeLocal: File | undefined = req.files?.rectangleShape[0];
  const layShapeLocal: File | undefined = req.files?.layShape[0];
  const directorImageLocal: File | undefined = req.files?.directorImage[0];
  const directorSignLocal: File | undefined = req.files?.directorSign[0];

  if (!service1IconLocal) {
    throw new ApiError(400, "Service 1 icon is required");
  }
  if (!service2IconLocal) {
    throw new ApiError(400, "Service 2icon is required");
  }
  if (!service3IconLocal) {
    throw new ApiError(400, "Service 3 icon is required");
  }
  if (!service4IconLocal) {
    throw new ApiError(400, "Service 4 icon is required");
  }
  if (!leftImageLocal) {
    throw new ApiError(400, "Left image is required");
  }
  if (!rightImageLocal) {
    throw new ApiError(400, "Right image is required");
  }
  if (!playButtonLocal) {
    throw new ApiError(400, "Play button is required");
  }
  if (!dotShapeLocal) {
    throw new ApiError(400, "Dot shape is required");
  }
  if (!circleShapeLocal) {
    throw new ApiError(400, "Circle shape is required");
  }
  if (!rectangleShapeLocal) {
    throw new ApiError(400, "Rectangle shape is required");
  }
  if (!layShapeLocal) {
    throw new ApiError(400, "Lay shape is required");
  }
  if (!directorImageLocal) {
    throw new ApiError(400, "Director image is required");
  }
  if (!directorSignLocal) {
    throw new ApiError(400, "Director sign is required");
  }
  const service1Icon = await uploadOnCloudinary(service1IconLocal.path);
  const service2Icon = await uploadOnCloudinary(service2IconLocal.path);
  const service3Icon = await uploadOnCloudinary(service3IconLocal.path);
  const service4Icon = await uploadOnCloudinary(service4IconLocal.path);
  const leftImage = await uploadOnCloudinary(leftImageLocal.path);
  const rightImage = await uploadOnCloudinary(rightImageLocal.path);
  const playButton = await uploadOnCloudinary(playButtonLocal.path);
  const dotShape = await uploadOnCloudinary(dotShapeLocal.path);
  const circleShape = await uploadOnCloudinary(circleShapeLocal.path);
  const rectangleShape = await uploadOnCloudinary(rectangleShapeLocal.path);
  const layShape = await uploadOnCloudinary(layShapeLocal.path);
  const directorImage = await uploadOnCloudinary(directorImageLocal.path);
  const directorSign = await uploadOnCloudinary(directorSignLocal.path);

  const aboutData = {
    eyebrow,
    title,
    description,
    services: [
      {
        name: service1,
        image: {
          src: service1Icon?.url,
          alt: service2Icon?.fieldname,
        },
      },
      {
        name: service2,
        image: {
          src: service2Icon?.url,
          alt: service2Icon?.fieldname,
        },
      },
      {
        name: service3,
        image: {
          src: service3Icon?.url,
          alt: service2Icon?.fieldname,
        },
      },
      {
        name: service4,
        image: {
          src: service4Icon?.url,
          alt: service2Icon?.fieldname,
        },
      },
    ],
    director: {
      name: directorName,
      designation: directorDesignation,
      image: {
        src: directorImage?.url,
        alt: directorImage?.fieldname,
      },
      sign: {
        src: directorSign?.url,
        alt: directorSign?.fieldname,
      },
    },
    leftImage: {
      src: leftImage?.url,
      alt: leftImage?.fieldname,
    },
    rightImage: {
      src: rightImage?.url,
      alt: rightImage?.fieldname,
    },
    playButton: {
      src: playButton?.url,
      alt: playButton?.fieldname,
    },
    dotShape: {
      src: dotShape?.url,
      alt: dotShape?.fieldname,
    },
    circleShape: {
      src: circleShape?.url,
      alt: circleShape?.fieldname,
    },
    rectangleShape: {
      src: rectangleShape?.url,
      alt: rectangleShape?.fieldname,
    },
    layShape: {
      src: layShape?.url,
      alt: layShape?.fieldname,
    },
  };
  const about = await About.create(aboutData);
  resSender<IAbout>(res, {
    statusCode: 201,
    success: true,
    message: "About created successfully",
    data: about,
  });
});

export const aboutController = { create };
