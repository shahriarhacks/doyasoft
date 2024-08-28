import express, { Router } from "express";
import { headerRoute } from "../modules/header/header.route";

export const router = express.Router();

type IModuleRouter = { path: string; route: Router };

const moduleRouters: IModuleRouter[] = [
  {
    path: "/header",
    route: headerRoute,
  },
];

moduleRouters.forEach(({ path, route }) => {
  router.use(path, route);
});
