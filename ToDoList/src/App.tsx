import { useTodo } from "./hooks/useTodo"
import { useCallback, useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const {tasks, getAllTodos, createTodo, editTodo, deleteTodo} = useTodo();
  const [taskName, setTaskName] = useState('');
  const [editing, setEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTaskName, setEditingTaskName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  useEffect(() => {
    getAllTodos();
    
  },[getAllTodos, tasks])
  const tasksAFazer = tasks.filter(task => task.completed);
  const handleFocusInput = () => {
    inputRef.current?.focus();
  };
  const handleDeleteTask = useCallback(async (taskId: number) => {
    const confirmDelete = () => {
      toast.dismiss();
      deleteTask(taskId);
    };

    const deleteTask = async (taskId: number) => {
      try {
        await deleteTodo(taskId);
        await getAllTodos();
        toast.success("Tarefa deletada com sucesso!");
      } catch (error) {
        toast.error("Erro ao deletar a tarefa.");
      }
    };

    toast(
      (
        <>
          <div className="font-bold text-base text-center text-red-500 mb-2">
            Tem certeza de que deseja excluir a tarefa?
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded"
            >
              Sim
            </button>
            <button
              onClick={() => toast.dismiss()}
              className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-1 px-4 rounded"
            >
              Não
            </button>
          </div>
        </>
      ),
      { autoClose: false }
    );
    
  }, [deleteTodo, getAllTodos]);
  


  const handleCreateTask = useCallback(async () => {
    if (taskName.trim() === '') {
      toast.error('Por favor, insira um nome para a tarefa. A tarefa não pode estar em branco.');
      return;
    }
    try {
      await createTodo({ title: taskName, completed: false });
      await getAllTodos();
      inputRef.current?.focus();
      setTaskName("");
      toast.success("Tarefa criada com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar a tarefa.");
    }
  }, [createTodo, getAllTodos, taskName, tasks]);

  const handleEditTask = useCallback(async () => {
    if (editingTaskId === null) return;
    const task = tasks.find(t => t.id === editingTaskId);
    if (!task) return;
    try {
      await editTodo(task.id, { title: editingTaskName, completed: task.completed });
      await getAllTodos();
      setEditing(false);
      setEditingTaskId(null);
      toast.success("Tarefa editada com sucesso!");
    } catch (error) {
      toast.error("Erro ao editar a tarefa.");
    }
  }, [editTodo, editingTaskId, editingTaskName, getAllTodos, tasks]);

  const handleEditClick = (taskId: number) => {
    setEditing(true);
    setEditingTaskId(taskId);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setEditingTaskName(task.title.toString());
    }
    setTimeout(() => {
      inputRef2.current?.focus();
    }, 0);
  };


  const handleCancelClick = () => {
    setEditing(false);
    setEditingTaskId(null);
    setTaskName(taskName);
  };

  const handleCheckboxChange = async (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    try{
      await editTodo(task.id, { title: task.title, completed: !task.completed });
      await getAllTodos();
      toast.success(task.completed ? "Tarefa marcada como não concluída!" : "Tarefa marcada como concluída!");
           
    } catch (error) {
      toast.error("Erro ao alterar se a tarefa foi concluída ou não.");
    }
  };


  return (
    <div className="min-h-screen min-w-screen">
      {/* Header */}
      <header className="cursor-default select-none flex items-center justify-start w-full md:max-w-1440 h-16 md:h-28 bg-back-whi px-4">
        <img src=".\src\assets\Logo Inovax-blue 1.png" alt="Logo" className="h-8 md:h-12" />
        <div className="w-0.5 h-8 md:h-12 bg-blue-sep mx-2"></div>
        <div className="flex flex-col">
          <div className="cursor-default text-lg md:text-2xl font-extrabold">TO DO LIST</div>
          <div className="cursor-default text-sm md:text-base font-normal">Teste de capacidade técnica</div>  
        </div>
        
      </header>
      <div className="w-full h-0.5 bg-stone-300 mx-0"></div>
      {/* Main */}
      <div select-none className="select-none justify-center items-center py-5 px-3 bg-white">
        <div className="w-full md:max-w-900 h-full justify-center items-center flex flex-col space-y-4">
          <div className="flex flex-row space-x-1">  
              <input ref={inputRef} type="text" placeholder="Descreva a tarefa aqui" title="Digite o nome da tarefa" className="bg-stone-200 w-full md:w-747 h-full md:h-39 border rounded-lg  px-4 py-2"
              value={taskName} onChange={(e) => setTaskName(e.target.value)} />
              <button className="bg-blue-sep hover:bg-blue-700 text-white w-full md:w-109 h-full md:h-39 font-bold 
              py-2 px-0 rounded" onClick={handleCreateTask} title="Criar tarefa">Criar tarefa</button>
          </div>
          <div className="select-none flex flex-row justify-end items-start space-x-2 w-full md:w-860 h-6 md:h-19">
            <div className="font-inter font-extrabold text-xs md:text-sm text-blue-let">TAREFAS A FAZER</div>
            <div className="bg-blue-box font-inter text-xs md:text-sm font-semibold text-black px-0.5 md:px-1">{tasks.length}</div>
            <div className="font-bold text-xs md:text-sm text-green-box">CONCLUIDA</div>
            <div className="text-white font-bold text-xs md:text-sm bg-green-box px-1 md:px-2">{tasksAFazer.length} de {tasks.length}</div>            
          </div>
        {tasks.length === 0 ? (
          <>  
          <div className="flex flex-col justify-center items-center p-0 gap-0 w-full md:w-860 h-full md:h-626 border-2 border-dashed border-blue-let shadow-md">
            <img src=".\src\assets\FolderSimpleDotted.png" alt="Logo" className="h-24 md:h-48" />
            
            <div className="font-inter font-bold text-xs md:text-sm text-blue-let">
              A SUA LISTA DE TAREFAS ESTÁ VAZIA
            </div>
            <div className="font-inter font-normal text-xs md:text-sm text-blue-let cursor-pointer hover:text-blue-600 hover:underline" onClick={handleFocusInput}>
              Adicione uma nova tarefa e comece a organizar o seu dia
            </div>
          
          </div>
          </>
        ) : 
        (
          tasks.map((task) => (
              <div key={task.id} className="w-full md:w-860 h-full md:h-79 flex items-center py-1 border-b border-gray-200">
                {editing  && editingTaskId === task.id ? (<>
                  <div className="w-full md:w-46 h-full md:h-79 flex items-center justify-center bg-blue-sep rounded-tl-lg  rounded-bl-lg">
                    <input type="checkbox" title="Definir tarefa como concluída ou não." checked={Boolean(task.completed)} onChange={() => handleCheckboxChange(task.id)} className="checked:bg-gray-500 border-gray-700 rounded-lg w-25 h-25" />
                  </div>
                  <div className="flex w-full md:w-771 h-full md:h-79 bg-blue-sep border  px-4 py-2 mx-0.5">
                    <input type="text" ref={inputRef2} title="Tarefa sendo editada" value={editingTaskName} onChange={(e) => setEditingTaskName(e.target.value)}className={task.completed ? "items-bottom line-through text-white font-bold text-xs md:text-base w-full md:w-771 h-full md:h-79 bg-blue-sep": "items-bottom text-white font-bold text-xs md:text-base w-full md:w-771 h-full md:h-70 bg-blue-sep "}/>
                  </div>
                  <div className="w-full md:w-35 h-full md:h-79 flex items-center justify-center flex-col mx-0.5">
                    <button className="w-full md:w-35 h-full md:h-37.5 bg-gray-500 hover:bg-gray-300 text-white px-1 my-0.5 rounded-tr-lg"><img src=".\src\assets\cancel.png" alt="Cancelar" title="Cancelar alteração" onClick={handleCancelClick} className="w-full md:w-25 h-full md:h-25 rounded"/></button>
                    <button className="w-full md:w-35 h-full md:h-37.5 bg-gray-500 hover:bg-gray-300 text-white px-1 rounded-br-lg"><img src=".\src\assets\confirm.png" alt="Confirmar" title="Confirmar alteração" onClick={handleEditTask} className="w-full md:w-25 h-full md:h-25 rounded"/></button>
                  </div> </>) : (<>
                    <div className="w-full md:w-46 h-full md:h-79 flex items-center justify-center bg-blue-sep rounded-tl-lg  rounded-bl-lg">
                    <input type="checkbox" checked={Boolean(task.completed)} title="Definir tarefa como concluída ou não" onChange={() => handleCheckboxChange(task.id)} className="checked:bg-gray-500 border-gray-700 rounded-lg w-25 h-25" />
                  </div>
                  <div className="flex items-bottom w-full md:w-771 h-full md:h-79 bg-blue-sep border  px-4 py-2 mx-0.5">
                    <div title="Tarefa a ser realizada"className={task.completed ? "top-0 left-0 line-through text-blue-let2 font-bold text-xs md:text-base": "text-white font-bold text-xs md:text-base"}>{task.title}</div>
                  </div>
                  <div className="w-full md:w-35 h-full md:h-79 flex items-center justify-center flex-col mx-0.5">
                    <button className="w-full md:w-35 h-full md:h-37.5 bg-red-700 hover:bg-red-500 text-white px-1 my-0.5 rounded-tr-lg"><img src=".\src\assets\Delete.png" alt="Deletar" title="Deletar tarefa" onClick={() => handleDeleteTask(task.id)} className="w-full md:w-25 h-full md:h-25 rounded"/></button>
                    <button className="w-full md:w-35 h-full md:h-37.5 bg-gray-500 hover:bg-gray-300 text-white px-1 rounded-br-lg"><img src=".\src\assets\Edit.png" alt="Editar" title="Editar tarefa" onClick={() => handleEditClick(task.id)} className="w-full md:w-25 h-full md:h-25 rounded"/></button>
                  </div>
                  </>
                  )
                }
              </div>
          ))
        )}
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>

  )
}

export default App
