import { Router } from "express";
import { CategoryController } from "../controller/category";
import { requireLegal } from "../middleware/validate";

export const categoryRouter = Router();
const controller = new CategoryController();


categoryRouter.post("/category", controller.create);
categoryRouter.get("/category", controller.getAll);
categoryRouter.get("/category/:id", controller.get);
categoryRouter.put("/category", controller.update);
categoryRouter.delete("/category", controller.delete);

