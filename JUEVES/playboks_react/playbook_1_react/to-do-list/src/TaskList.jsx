import { useState, useEffect } from 'react';
import { useTasks } from './TaskContext';


function TaskList() {
  // Obtener las tareas y la función removeTask desde el contexto
  const { tasks, removeTask } = useTasks();


  // Estado para almacenar el mensaje sobre el número de tareas
  const [message, setMessage] = useState('');


  // Actualizar el mensaje cada vez que cambie el arreglo de tareas
  useEffect(() => {
    setMessage(`Tienes ${tasks.length} tarea(s).`);
  }, [tasks]);


  return (
    <div>
      <p>{message}</p>
      <ul>
        {tasks.map((t, index) => (
          <li key={index}>
            {t}
            <button onClick={() => removeTask(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default TaskList;
