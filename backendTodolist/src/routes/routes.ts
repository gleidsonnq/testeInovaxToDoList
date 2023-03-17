import { Router } from "express";
import { CreateTaskController } from "../app/controller/CreateTaskController";
import { GetAllTaskController } from "../app/controller/GetAllTaskController";
import { UpdateTaskController } from "../app/controller/UpdateTaskController";
import { DeleteTaskController } from "../app/controller/DeleteTaskController";

const createTaskController = new CreateTaskController();
const getAllTaskController = new GetAllTaskController();
const updateTaskController = new UpdateTaskController();
const deleteTaskController = new DeleteTaskController();

const taskRoutes = Router();

//Routes
taskRoutes.post("/", createTaskController.handle);
taskRoutes.get("/", getAllTaskController.handle);
taskRoutes.put("/:id", updateTaskController.handle);
taskRoutes.delete("/:id", deleteTaskController.handle);

export { taskRoutes };