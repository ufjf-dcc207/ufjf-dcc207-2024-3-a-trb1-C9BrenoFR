import './Task.css';

interface TaskProps {
  id: number;
  titulo: string;
  iniciado: boolean;
  completo: boolean;
  onDelete: () => void;
  onStart: () => void;
  onComplete: () => void;
}

export default function Task({titulo, iniciado, completo, onDelete, onStart, onComplete }: TaskProps) {
  return (
    <div className={`task ${completo ? 'completo' : ''} ${iniciado ? 'iniciado' : ''}`}>
      <div className="task-titulo">{titulo}</div>
      <div className="task-actions">
        {!completo && !iniciado && <button onClick={onStart}>Iniciar</button>}
        {iniciado && !completo && <button onClick={onComplete}>Completar</button>}
        <button onClick={onDelete}>Deletar</button>
      </div>
    </div>
  );
}
