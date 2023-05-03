import { Router } from "express";
import { getLogin, postLogin, getFailLogin,getNoFound, getLogOut } from "../controllers/index.controllers.js";
import passport from "passport";
import { isLog,auth } from "../middlewares/middlewares.js";

const rootRouter = Router();

// La ruta api/carts (método get) devuelve el listado de carritos creados.
rootRouter.get("/",isLog, getLogin);

rootRouter.post("/login", passport.authenticate('login',{failureRedirect:'faillogin'}), postLogin);

rootRouter.get('/failLogin', getFailLogin)

rootRouter.get("/logout", getLogOut)

rootRouter.get('*',auth, getNoFound)

export default rootRouter
