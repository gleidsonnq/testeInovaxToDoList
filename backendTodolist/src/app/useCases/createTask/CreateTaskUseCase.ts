import { CreateTaskDTO } from "../../dtos/CreateTaskDTO";
import { prisma } from "../../../prisma/client";
import { Task } from "@prisma/client";

export class CreateTaskUseCase {
  async execute({ title }: CreateTaskDTO): Promise<Task> {
    const MAX_RETRIES = 5;
    const RETRY_DELAY = 5000; // 5 segundos

    const retry = async (operation: () => Promise<Task>, retriesLeft: number): Promise<Task> => {
      try {
        return await operation();
      } catch (error) {
        if (retriesLeft === 0) {
          console.error(`Erro ao criar tarefa: ${error}`);
          throw new Error("Não foi possível criar a tarefa");
        }

        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        return retry(operation, retriesLeft - 1);
      }
    };

    const createTaskOperation = async () => {
      return await prisma.task.create({
        data: {
          title,
        },
      });
    };

    return retry(createTaskOperation, MAX_RETRIES);
  }
}
