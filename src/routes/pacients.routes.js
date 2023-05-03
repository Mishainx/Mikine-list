import { Router } from "express";
import { getPacients,findPacients,findPacientsId, updatePacients } from "../controllers/pacients.controllers.js";
import { auth } from "../middlewares/middlewares.js";
const pacientsRouter = Router();

// La ruta api/carts (método get) devuelve el listado de carritos creados.
pacientsRouter.get("/",auth, getPacients);
pacientsRouter.post("/find",auth, findPacients);
pacientsRouter.post("/id",auth, findPacientsId);
pacientsRouter.post("/updatepacients",auth, updatePacients);

export default pacientsRouter