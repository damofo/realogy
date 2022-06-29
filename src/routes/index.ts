import express from "express";
import usersRoute from "./users.routes";
import departmentsRoute from "./departments.routes";

const router = express.Router();

router.use("/users", usersRoute);
router.use("/departments", departmentsRoute);

export default router;
