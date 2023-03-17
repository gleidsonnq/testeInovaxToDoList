import { Task } from "@prisma/client";
import { prisma } from "../../../prisma/client";

export class UpdateTaskUseCase {
  async execute(taskId: number, taskData: Partial<Task>): Promise<Task> {
    const MAX_RETRIES = 5;
    const RETRY_DELAY = 5000; // 5 segundos

    const retry = async (operation: () => Promise<Task>, retriesLeft: number): Promise<Task> => {
      try {
        return await operation();
      } catch (error) {
        if (retriesLeft === 0) {
          console.error(`Erro ao Atualizar tarefa: ${error}`);
          throw new Error("Não foi possível atualizar a tarefa");
        }

        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        return retry(operation, retriesLeft - 1);
      }
    };

    const updateTaskOperation = async () => {
      return await prisma.task.update({
        where: { id: taskId },
        data: taskData,
      });
    };

    return retry(updateTaskOperation, MAX_RETRIES);
  }
}
