import { Response } from "express";
import { IResSender } from "../interfaces/res.sender.type";

const resSender = <T>(res: Response, data: IResSender<T>): void => {
  const resData: IResSender<T> = {
    statusCode: data?.statusCode,
    success: data?.success,
    message: data?.message || null,
    meta: data?.meta || null,
    data: data?.data || null,
  };
  res.status(data.statusCode).json(resData);
};

export default resSender;
