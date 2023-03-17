import { Request, Response } from "express";
import { GetAllTaskUseCase } from "../useCases/getAllTask/GetAllTaskUseCase";

export class GetAllTaskController{
    async handle(req: Request, res: Response){
      const {title} = req.body;

      const getAllTaskUseCase = new GetAllTaskUseCase();

      const result = await getAllTaskUseCase.execute();

      return res.status(201).json(result);
    }
}