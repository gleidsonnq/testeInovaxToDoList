import { Request, Response } from "express";
import { CreateTaskUseCase } from "../useCases/createTask/CreateTaskUseCase";

export class CreateTaskController{
    async handle(req: Request, res: Response){
      const {title} = req.body;

      const createTaskUseCase = new CreateTaskUseCase();

      const result = await createTaskUseCase.execute({title});

      return res.status(201).json(result);
    }
}