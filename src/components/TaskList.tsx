import { useState } from 'react';
import Task from './Task';
import './TaskList.css';

interface TaskType {
  id: number;
  titulo: string;
  iniciado: boolean;
  completo: boolean;
}

export default function TaskList() {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [novoTitulo, setNovoTitulo] = useState('');
  
    
    const adicionarTask = () => {
      if (novoTitulo.trim()) {
        const novaTask = {
          id: Date.now(),
          titulo: novoTitulo,
          iniciado: false,
          completo: false
        };
        setTasks([...tasks, novaTask]);
        setNovoTitulo('');
      }
    }
    // Função para deletar uma tarefa pelo ID
    const deletarTask = (id: number) => {
      setTasks(tasks.filter(task => task.id !== id));
    }
  
    const iniciarTask = (id: number) => {
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, iniciado: true } : task
      ));
    }
  
    return (
      <div className="task-container">
        <div className="adicionar-task">
          <input
            type="text"
            value={novoTitulo}
            onChange={(e) => setNovoTitulo(e.target.value)}
            placeholder="Nova tarefa..."
          />
          <button onClick={adicionarTask}>Adicionar</button>
        </div>
        <div className="task-list">
          {tasks.map(task => (
            <Task
              key={task.id}
              {...task}
              onDelete={() => deletarTask(task.id)}
              onStart={() => iniciarTask(task.id)}
            />
          ))}
        </div>
      </div>
    );
  }
