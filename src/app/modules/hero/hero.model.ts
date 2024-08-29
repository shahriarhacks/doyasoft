import mongoose from "mongoose";
import { IHero } from "./hero.interface";
import { buttonSchema, imageSchema } from "../model/common.model";

// Define the schema for the Hero model
const heroSchema = new mongoose.Schema<IHero>(
  {
    eyebrow: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    left: {
      type: buttonSchema,
      required: false, // Specify required or optional explicitly
    },
    right: {
      type: buttonSchema,
      required: false,
    },
    banner: {
      type: imageSchema,
      required: true,
    },
    backgroundBanner: {
      type: imageSchema,
      required: false,
    },
    spiderBackground: {
      type: imageSchema,
      required: true,
    },
    playButton: {
      type: imageSchema,
      required: false,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Export the Hero model
export const Hero = mongoose.model<IHero>("Hero", heroSchema);
