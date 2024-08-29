import express, { Router } from "express";
import { headerRoute } from "../modules/header/header.route";
import { heroRoute } from "../modules/hero/hero.route";

export const router = express.Router();

type IModuleRouter = { path: string; route: Router };

const moduleRouters: IModuleRouter[] = [
  {
    path: "/header",
    route: headerRoute,
  },
  {
    path: "/hero",
    route: heroRoute,
  },
];

moduleRouters.forEach(({ path, route }) => {
  router.use(path, route);
});
