import { Schema, model } from "mongoose";
import { IAbout } from "./about.interface";

const aboutSchema = new Schema<IAbout>(
  {
    eyebrow: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    services: [
      {
        title: { type: String, required: true },
        image: {
          src: { type: String, required: true },
          alt: { type: String, required: true },
        },
      },
    ],
    director: {
      name: { type: String, required: true },
      designation: { type: String, required: true },
      image: {
        src: { type: String, required: true },
        alt: { type: String, required: true },
      },
      sign: {
        src: { type: String, required: true },
        alt: { type: String, required: true },
      },
    },
    button: {
      name: { type: String, required: true },
      url: { type: String },
    },
    leftImage: {
      src: { type: String, required: true },
      alt: { type: String, required: true },
    },
    rightImage: {
      src: { type: String, required: true },
      alt: { type: String, required: true },
    },
    playButton: {
      src: { type: String, required: true },
      alt: { type: String, required: true },
    },
    dotShape: {
      src: { type: String, required: true },
      alt: { type: String, required: true },
    },
    circleShape: {
      src: { type: String, required: true },
      alt: { type: String, required: true },
    },
    rectangleShape: {
      src: { type: String, required: true },
      alt: { type: String, required: true },
    },
    layShape: {
      src: { type: String, required: true },
      alt: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

export const About = model<IAbout>("About", aboutSchema);
