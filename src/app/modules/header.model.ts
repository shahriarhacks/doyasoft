import mongoose from "mongoose";
import { IHeader, INavItem } from "./header/header.interface";

const navItemSchema = new mongoose.Schema<INavItem>({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const headerSchema = new mongoose.Schema<IHeader>({
  logo: {
    src: {
      type: String, //Cloudinary URL
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  navItems: {
    type: [navItemSchema], // Ensuring array of navItemSchema
    required: true, // Assuming navItems is required
  },
  rightSideButton: {
    type: navItemSchema,
    required: true,
  },
});

export const Header = mongoose.model<IHeader>("Header", headerSchema);
