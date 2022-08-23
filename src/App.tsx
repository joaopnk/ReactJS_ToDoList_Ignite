import { useEffect } from "react";
import { useState } from "react";
import { Header } from "./components/Header/Header"
import { Tasks } from "./components/Tasks/Tasks"


const LOCAL_STORAGE_KEY = "todo:tarefasSalvas";


export interface ITask{
  id: string;
  title: string;
  isCompleted: boolean;
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  // Recuperando tarefas salvas no localStorage
  function loadSavedTasks(){
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(saved){

      // Atualizando e convertendo já de volta
      setTasks(JSON.parse(saved));
    }
  }

  // Chamando a função apenas uma vez (quando a pagina for carregada)
  useEffect(() => {
    loadSavedTasks();
  }, [])

  // Para salvar no navegador do usuario (não perder no F5)
  function setTasksAndSave(newTasks: ITask[]){
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  } 

  // Para adicionar nova task
  function addTask(taskTitle: string){

    // Armazenando a nova mantendo os antigos
    setTasksAndSave([
      ...tasks,
      {
        id: crypto.randomUUID(), //Gerando um ID Aleatorio com func. nativa
        title: taskTitle,
        isCompleted: false
      }
    ]);
  }

  // Para deletar uma task
  function deleteTaskById(taskId: string){
    // Armazenando tasks que tem o ID diferente da que deseja teletar
    const newTasks = tasks.filter(task => task.id !== taskId);
    // Salvando as novas tasks
    setTasksAndSave(newTasks);

  }

  // Para marcar como concluida uma task
  function toggleTaskCompletedById(taskId: string){
    const newTasks = tasks.map(task => {
      // Conferindo se a tarefa que vou inverter o check tem o mesmo id da que to passando
      if(task.id === taskId){
        // Retornando ela do jeito que tava, apenas com o check alterado
        return {
          ...task,
          isCompleted: !task.isCompleted,
        }
      }
      else{
        return task;
      }
    });

    setTasksAndSave(newTasks);
  }

  return (
    <>
      <Header
        // Mandando a função para o header 
        onAddTask={addTask}
      />
      <Tasks 
        // Mandando task's para o componente (para a exibição)
        tasks={tasks}
        onDelete={deleteTaskById}
        onComplete={toggleTaskCompletedById}
      />
    </>
  )
}

export default App
