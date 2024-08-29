import mongoose from "mongoose";
import { IButton, IImage } from "../../../interfaces/common.type";

export const imageSchema = new mongoose.Schema<IImage>({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
});

export const buttonSchema = new mongoose.Schema<IButton>({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
});
