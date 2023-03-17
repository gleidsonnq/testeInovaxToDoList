import { useCallback, useState } from "react"
import { ITodo } from "../interfaces";
import { TodoService } from "../services/TodoService"

export const useTodo = () => {
    const [tasks, setTasks] = useState<ITodo[]>([]);

    const getAllTodos = useCallback(async () => {
        const {status, data} = await TodoService.getAllTodos();        
        setTasks(data);

    },[]);

    const createTodo = useCallback(async (todo: Pick<ITodo, 'title'|'completed'> ) => {
        const {status} = await TodoService.createTodo(todo);
        
      }, []);
    
      const deleteTodo = useCallback(async (id: Number) => {
        const {status} = await TodoService.deleteTodo(id.toString());
        console.log(status);
        setTasks(tasks.filter(todo => todo.id !== id));
      }, []);
    
      const editTodo = useCallback(async (id: number, todo: Pick<ITodo, 'title'|'completed'>) => {
        const {status} = await TodoService.editTodo(id.toString(), todo);
        
        
      }, []);

    return{
        tasks,
        getAllTodos,
        createTodo,
        deleteTodo,
        editTodo
    };
}