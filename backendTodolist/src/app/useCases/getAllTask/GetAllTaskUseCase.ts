import { Task } from "@prisma/client";
import { prisma } from "../../../prisma/client";

export class GetAllTaskUseCase {
  async execute(): Promise<Task[]> {
    const MAX_RETRIES = 5;
    const RETRY_DELAY = 5000; // 5 segundos

    const retry = async (operation: () => Promise<Task[]>, retriesLeft: number): Promise<Task[]> => {
      try {
        return await operation();
      } catch (error) {
        if (retriesLeft === 0) {
          console.error(`Erro ao importar tarefas: ${error}`);
          throw new Error("Não foi possível importar tarefas");
        }

        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        return retry(operation, retriesLeft - 1);
      }
    };

    const getAllTasksOperation = async () => {
      return await prisma.task.findMany({});
    };

    return retry(getAllTasksOperation, MAX_RETRIES);
  }
}
