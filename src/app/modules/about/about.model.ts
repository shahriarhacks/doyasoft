import { Schema, model } from "mongoose";
import { IAbout } from "./about.interface";
import { buttonSchema, imageSchema } from "../model/common.model";

const aboutSchema = new Schema<IAbout>(
  {
    eyebrow: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    services: [
      {
        name: { type: String, required: true },
        image: imageSchema,
      },
    ],
    director: {
      name: { type: String, required: true },
      designation: { type: String, required: true },
      image: imageSchema,
      sign: imageSchema,
    },
    button: buttonSchema,
    leftImage: imageSchema,
    rightImage: imageSchema,
    playButton: imageSchema,
    dotShape: imageSchema,
    circleShape: imageSchema,
    rectangleShape: imageSchema,
    layShape: imageSchema,
  },
  {
    timestamps: true,
  }
);

export const About = model<IAbout>("About", aboutSchema);
