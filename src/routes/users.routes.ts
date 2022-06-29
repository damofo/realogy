import express from "express";
import controller from "../controllers/users.controller";
const router = express.Router();

router.post("/", controller.createUser);
router.get("/", controller.getUsers);
router
  .route("/:id")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

router.param("id", controller.getById);

export default router;
