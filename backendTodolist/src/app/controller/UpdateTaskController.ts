import { Request, Response } from "express";
import { UpdateTaskUseCase } from "../useCases/updateTask/UpdateTaskUseCase";

export class UpdateTaskController{
    async handle(req: Request, res: Response){
      const {id} = req.params;
      const {title, completed} = req.body;

      const updateTaskUseCase = new UpdateTaskUseCase();

      const result = await updateTaskUseCase.execute(Number(id), {title, completed});
      
      return res.status(201).json(result);
    }
}