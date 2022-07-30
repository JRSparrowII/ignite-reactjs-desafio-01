import { useEffect, useState } from 'react'
import '../styles/tasklist.scss'
import { FiTrash, FiCheckSquare } from 'react-icons/fi'
import {Pencil}from 'phosphor-react'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [taskCount, setTaskCount] = useState(0);
  const [taskCountFinished, setTaskCountFinished] = useState(0);


  useEffect(() => {
    setTaskCount(tasks.length);

    var taskFinished = tasks.filter(item => {
       return  item.isComplete == true               
    })
     setTaskCountFinished(taskFinished.length);
  }, [tasks]);

  // function handleTaskCount(taskCount: number) {
  //   setTaskCount(taskCount + 1);
  // }

  // function handleTaskCountFinished(taskCount: number) {
  //   setTaskCountFinished(taskCountFinished + 1);
  // }

  // FUNÇÃO DE EDITAR

  // function updateTask(id: number, newContent: string){
  //   const newUpdateTask = tasks.find((task) => {
  //     return task.id === id;
  //   });
  //   newUpdateTask.tasks = newContent;
  // }
  

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    if (newTaskTitle == '') {
      // alert('Informe a sua atividade');
      return;
    }
    const newTask = {
        id: tasks.length + 1,
        title: newTaskTitle,    
        isComplete: false
    }
    setTasks(antigoDados => [...antigoDados, newTask]);
    // setNewTask('');

  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    const taskNaoRiscada = tasks.map(item =>{
      if (item.id == id) {        
        if(item.isComplete == true){
          item.isComplete = false;          
        }else if(item.isComplete == false){
          item.isComplete = true;
        }          
      } 
      return item;
    })    
    setTasks(taskNaoRiscada)  
    
  }

  function handleRemoveTask(idDelete : number) {
    // Remova uma task da listagem pelo ID    
    const taskUndeleted = tasks.filter(item =>{
      return item.id !== idDelete;
    })
    setTasks(taskUndeleted);  
    setTaskCount(tasks.length)  
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo"             
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <span>Criar</span>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <div className="countTask">
          <span className='createtask'>Tarefas Criadas {taskCount}</span>
          <span className='fineshedtask'>Concluidas [{taskCountFinished} de {taskCount}]</span>
        </div>
        <ul>
          {tasks.map(task => (
            
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p> {task.title}</p>
              </div>
              <div>
                <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                  <FiTrash size={16}/>
                </button>
               
              </div>              
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}