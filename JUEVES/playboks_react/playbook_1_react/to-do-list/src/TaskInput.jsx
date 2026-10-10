// Importación del hook personalizado 'useTasks' desde TaskContext
// Este hook proporciona el estado compartido de las tareas y funciones como setTask
// y addTask
import { useTasks } from './TaskContext';


// Componente funcional para el área de entrada de tareas
function TaskInput() {
  // Desestructurar el estado de las tareas y las funciones de manejo desde el hook personalizado
  const { task, setTask, addTask } = useTasks();


  return (
    <div className="todo-input-wrapper">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Introduce una tarea"
      />
      <button onClick={addTask}>Agregar</button>
    </div>
  );
}


// Exportación del componente TaskInput
export default TaskInput;
