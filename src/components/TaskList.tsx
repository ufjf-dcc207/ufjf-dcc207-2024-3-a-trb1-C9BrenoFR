import { useState, useEffect } from 'react';
import Task from './Task';
import './TaskList.css';
import Clock from './Clock';

interface TaskListProps {
  onTaskCountChange: (count: number) => void;
}

interface TaskType {
  id: number;
  titulo: string;
  iniciado: boolean;
  completo: boolean;
  segundos: number,
  minutos: number,
  horas: number,
}

export default function TaskList({ onTaskCountChange }: TaskListProps) {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [novoTitulo, setNovoTitulo] = useState('');
    const [novoSegundo, setNovoSegundo] = useState(0);
    const [novoMinuto, setNovoMinuto] = useState(0);
    const [novaHora, setNovaHora] = useState(0);
    const [sendSeconds, setSendSeconds] = useState(0);
    const [sendMinutes, setSendMinutes] = useState(0);
    const [sendHours, setSendHours] = useState(0);

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
        completo: false,
        segundos: novoSegundo,
        minutos: novoMinuto,
        horas: novaHora
      };
      setTasks([...tasks, novaTask]);
      setNovoTitulo('');
    }
  };
    // Função para deletar uma tarefa pelo ID
    const deletarTask = (id: number) => {
      setTasks(tasks.filter(task => task.id !== id));
      setSendHours(0);
      setSendMinutes(0);
      setSendSeconds(0);
    }
  
    const iniciarTask = (id: number, seconds: number,minutes: number, hours: number) => {
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, iniciado: true } : task
      ));
      setSendSeconds(seconds);
      setSendMinutes(minutes);
      setSendHours(hours);
    }

    useEffect(() => {
      console.log(sendMinutes);
    }, [sendMinutes]);

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
      <div className="general-container">
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
            <div className='novas-horas'>
              <p>Horas:⠀</p>
              <input
                type="number"
                className='time'
                value={novaHora}
                onChange={(e) => setNovaHora(Number(e.target.value))}
                placeholder="horas"
              />
              <p>⠀Minutos:⠀</p>
              <input
                type="number"
                className='time'
                value={novoMinuto}
                onChange={(e) => setNovoMinuto(Number(e.target.value))}
                placeholder="minutos"
              />
              <p>⠀Segundos:⠀</p>
              <input
                type="number"
                className='time'
                value={novoSegundo}
                onChange={(e) => setNovoSegundo(Number(e.target.value))}
                placeholder="segundos"
              />
            
            </div>
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
                onStart={() => iniciarTask(task.id, task.segundos, task.minutos, task.horas)}
                onComplete={() => completarTask(task.id)}
              />
            ))}
          </div>
        </div>
        <Clock reciaveSeconds={sendSeconds} reciaveMinutes={sendMinutes} reciaveHours={sendHours}/>
      </div>
    );
  }
