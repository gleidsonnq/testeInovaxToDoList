import { Request, Response } from "express";
import { DeleteTaskUseCase } from "../useCases/deleteTask/DeleteTaskUseCase";

export class DeleteTaskController{
    async handle(req: Request, res: Response){
        const {id} = req.params;
  
        const deleteTaskUseCase = new DeleteTaskUseCase();
  
        const result = await deleteTaskUseCase.execute(Number(id));
        
        return res.status(201).json(result);
      
    }
}