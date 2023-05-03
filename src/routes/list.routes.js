import { Router } from "express";
import { getList,getListId, createList, createItem,deletePacient, updateOffer, updatePriority } from "../controllers/list.controllers.js";
import { auth } from "../middlewares/middlewares.js";

const listRouter = Router();

listRouter.get("/",auth, getList);
listRouter.get("/:lid",auth, getListId);
listRouter.post("/create",auth, createList);
listRouter.post("/create/pacient",auth, createItem);
listRouter.post("/delete/pacient",auth, deletePacient);
listRouter.post("/update/offer",auth, updateOffer)
listRouter.post("/update/priority",auth, updatePriority)




export default listRouter