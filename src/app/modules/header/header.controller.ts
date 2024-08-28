import { Request, Response } from "express";
import asyncHandler from "../../../shared/async.handler";
import ApiError from "../../../errors/api.error";
import { uploadOnCloudinary } from "../../../shared/cloudinary";
import { Header } from "./header.model";
import resSender from "../../../shared/res.sender";
import { IHeader } from "./header.interface";

const create = asyncHandler(async (req: Request, res: Response) => {
  const {
    logoAlt,
    logoUrl,
    homeUrl,
    aboutUrl,
    serviceUrl,
    contactUrl,
    sideButton,
    sideUrl,
    home,
    about,
    service,
    contact,
    blog,
    blogUrl,
  } = req.body;

  console.log(
    logoAlt,
    logoUrl,
    homeUrl,
    aboutUrl,
    serviceUrl,
    contactUrl,
    sideButton,
    sideUrl,
    home,
    about,
    service,
    contact,
    blog,
    blogUrl
  );
  if (
    [
      logoAlt,
      logoUrl,
      homeUrl,
      aboutUrl,
      serviceUrl,
      contactUrl,
      sideButton,
      sideUrl,
      home,
      about,
      service,
      contact,
      blog,
      blogUrl,
    ].some((field) => field.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const logoLocalPath = req.file?.path;

  if (!logoLocalPath) {
    throw new ApiError(400, "Logo is required");
  }
  const logo = await uploadOnCloudinary(logoLocalPath);
  if (!logo) {
    throw new ApiError(500, "Failed to upload logo");
  }
  const headersData = {
    logo: {
      src: logo.url,
      url: logoUrl,
      alt: logoAlt,
    },
    navItems: [
      {
        name: home,
        url: homeUrl,
      },
      {
        name: about,
        url: aboutUrl,
      },
      {
        name: service,
        url: serviceUrl,
      },
      {
        name: blog,
        url: blogUrl,
      },
      {
        name: contact,
        url: contactUrl,
      },
    ],
    rightSideButton: {
      name: sideButton,
      url: sideUrl,
    },
  };
  const header = await Header.create(headersData);
  resSender<IHeader>(res, {
    statusCode: 201,
    success: true,
    message: "Header created successfully",
    data: header,
  });
});

const read = asyncHandler(async (req: Request, res: Response) => {
  const header = await Header.findOne();
  resSender<IHeader>(res, {
    statusCode: 200,
    success: true,
    message: "Header fetched successfully",
    data: header,
  });
});

const update = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...data } = req.body;
  const header = await Header.findByIdAndUpdate(id, data, { new: true });
  resSender<IHeader>(res, {
    statusCode: 200,
    success: true,
    message: "Header updated successfully",
    data: header,
  });
});

const vanish = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const header = await Header.deleteOne({ _id: id }).lean();
  resSender<IHeader>(res, {
    statusCode: 200,
    success: true,
    message: "Header vanished successfully",
  });
});

export const headerController = { create, read, update, vanish };
