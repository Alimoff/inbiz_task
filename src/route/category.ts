import { Router } from "express";
import { CategoryController } from "../controller/category";
import { requireAdmin } from "../middleware/validate";

export const categoryRouter = Router();
const controller = new CategoryController();


categoryRouter.post("/category", controller.create);
categoryRouter.get("/category", controller.getAll);
categoryRouter.get("/category/:id", controller.get);
categoryRouter.put("/category",requireAdmin, controller.update);
categoryRouter.delete("/category",requireAdmin, controller.delete);

