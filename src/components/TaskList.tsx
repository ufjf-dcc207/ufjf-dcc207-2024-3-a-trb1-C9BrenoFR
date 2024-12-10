import { useState, useEffect } from 'react';
import Task from './Task';
import './TaskList.css';

interface TaskListProps {
  onTaskCountChange: (count: number) => void;
}

interface TaskType {
  id: number;
  titulo: string;
  iniciado: boolean;
  completo: boolean;
}

export default function TaskList({ onTaskCountChange }: TaskListProps) {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [novoTitulo, setNovoTitulo] = useState('');

    useEffect(() => {
      onTaskCountChange(tasks.length);
    }, [tasks.length, onTaskCountChange]);
  
    const adicionarTask = () => {
        if (novoTitulo.trim()) {
          if (tasks.some(task => task.titulo.toLowerCase() === novoTitulo.toLowerCase())) {
            alert('Tarefa já existe!');
            return;
          }
      const novaTask = {
        id: Date.now(),
        titulo: novoTitulo,
        iniciado: false,
        completo: false
      };
      setTasks([...tasks, novaTask]);
      setNovoTitulo('');
    }
  };
    // Função para deletar uma tarefa pelo ID
    const deletarTask = (id: number) => {
      setTasks(tasks.filter(task => task.id !== id));
    }
  
    const iniciarTask = (id: number) => {
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, iniciado: true } : task
      ));
    }

    const completarTask = (id: number) => {
        // Primeiro marca como completo e depois remove após um delay
        setTasks(tasks.map(task =>
          task.id === id ? { ...task, completo: true } : task
        ));
        
        setTimeout(() => {
          deletarTask(id);
        }, 500);
      };
  
    return (
      <div className="task-container">
        <div className="adicionar-task">
          <input
            type="text"
            value={novoTitulo}
            onChange={(e) => setNovoTitulo(e.target.value)}
            placeholder="Novo desafio..."
            onKeyPress={(e) => {
              if (e.key === 'Enter' && novoTitulo.trim()) {
                adicionarTask();
              }
            }}
          />
          <button onClick={adicionarTask} disabled={!novoTitulo.trim()}>
    	     Adicionar
          </button>

        </div>
        <div className="task-list">
          {tasks.map(task => (
            <Task
              key={task.id}
              {...task}
              onDelete={() => deletarTask(task.id)}
              onStart={() => iniciarTask(task.id)}
              onComplete={() => completarTask(task.id)}
            />
          ))}
        </div>
      </div>
    );
  }
