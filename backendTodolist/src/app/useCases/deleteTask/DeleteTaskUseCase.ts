import { Task } from "@prisma/client";
import { prisma } from "../../../prisma/client";

export class DeleteTaskUseCase {
  async execute(taskId: number): Promise<Task> {
    const MAX_RETRIES = 5;
    const RETRY_DELAY = 5000; // 5 segundos

    const retry = async (operation: () => Promise<Task>, retriesLeft: number): Promise<Task> => {
      try {
        return await operation();
      } catch (error) {
        if (retriesLeft === 0) {
          console.error(`Erro ao Deletar tarefa: ${error}`);
          throw new Error("Não foi possível deletar a tarefa");
        }

        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        return retry(operation, retriesLeft - 1);
      }
    };

    const deleteTaskOperation = async () => {
      return await prisma.task.delete({ where: { id: taskId } });
    };

    return retry(deleteTaskOperation, MAX_RETRIES);
  }
}
