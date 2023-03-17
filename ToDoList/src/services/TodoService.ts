import { ITodo } from "../interfaces"
import { Api } from "../providers"

const getAllTodos = () => Api.get<ITodo[]>('/');
const createTodo = (todo: Pick<ITodo, 'title'| 'completed'>) => Api.post<ITodo>('/', todo);
const deleteTodo = (id: string) => Api.delete<boolean>(`/${id}`);
const editTodo = (id: string, todo: Pick<ITodo, 'title'| 'completed'>) => Api.put(`/${id}`, todo);


export const TodoService = {
    getAllTodos,
    createTodo,
    deleteTodo,
    editTodo

}