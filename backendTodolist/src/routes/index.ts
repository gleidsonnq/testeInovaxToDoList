import { Router } from "express";
import { taskRoutes } from "./routes";

const routes = Router();

routes.use("/tasks", taskRoutes);

export {routes};