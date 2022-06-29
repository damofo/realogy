import express from "express";
import controller from "../controllers/departments.controller";
const router = express.Router();

router.post("/", controller.createDepartment);
router.get("/", controller.getDepartments);
router
  .route("/:id")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

router.param("id", controller.getById);

export default router;
