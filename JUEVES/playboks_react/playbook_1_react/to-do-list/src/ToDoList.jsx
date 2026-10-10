import { TaskProvider } from './TaskContext';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import './TodoList.css';


function TodoList() {
return (
    <div className="todo-container">


      {/* Envolver los componentes con TaskProvider para que puedan acceder al
          estado compartido de las tareas */}
      <TaskProvider>
        {/* Componente para introducir una nueva tarea */}
        <TaskInput />


        {/* Componente para mostrar la lista de tareas */}
        <TaskList />
      </TaskProvider>


    </div>
  );
}


export default TodoList;
