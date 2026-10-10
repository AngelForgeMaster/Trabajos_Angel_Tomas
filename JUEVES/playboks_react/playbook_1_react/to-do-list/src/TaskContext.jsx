// Importación de los hooks y utilidades necesarios de React
import { createContext, useState, useContext } from 'react';


// 1. Crear el contexto
// Esto crea un nuevo contexto para las tareas que se utilizará para compartir el estado
// entre los componentes
const TaskContext = createContext();


// 2. Crear el componente proveedor
// Este componente envolverá las partes de la aplicación que necesitan acceso al
// estado de las tareas
export function TaskProvider({ children }) {
  // Estado para almacenar la lista de tareas
  const [tasks, setTasks] = useState([]);


  // Estado para almacenar el valor actual del campo de entrada para una nueva tarea
  const [task, setTask] = useState('');


  // Función para agregar una tarea a la lista
  const addTask = () => {
    // Agregar la tarea únicamente si no contiene solo espacios en blanco
    if (task.trim()) {
      // Agregar la nueva tarea al arreglo de tareas existente
      setTasks([...tasks, task]);
      // Limpiar el campo de entrada después de agregarla
      setTask('');
    }
  };


  // Función para eliminar una tarea mediante su índice
  const removeTask = (index) => {
    // Crear un nuevo arreglo sin la tarea ubicada en el índice especificado
    setTasks(tasks.filter((_, i) => i !== index));
  };


  // El proveedor comparte el estado de las tareas y las funciones relacionadas con
  // cualquier componente hijo
  return (
    <TaskContext value={{ tasks, task, setTask, addTask, removeTask }}>
      {children}
    </TaskContext>
    );
}


// 3. Exportar un hook personalizado para utilizar el contexto más fácilmente
// Esto permite que otros componentes accedan al estado y a las funciones
// relacionadas con las tareas
export const useTasks = () => useContext(TaskContext);


