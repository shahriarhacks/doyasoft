import { Request } from "express";

export interface File {
  // Define the properties you expect in the file object
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface RequestWithFiles extends Request {
  files?: { [key: string]: File[] } | File[] | any;
}
