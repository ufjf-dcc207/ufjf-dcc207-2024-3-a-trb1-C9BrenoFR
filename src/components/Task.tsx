import './Task.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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
        {!completo && !iniciado && <button className="btn-comecar"onClick={onStart}>Iniciar</button>}
        {iniciado && !completo && <button className="btn-complete" onClick={onComplete}>Completar</button>}
        <button className="btn-deletar" onClick={onDelete}><FontAwesomeIcon icon={faTrash} /></button>
      </div>
    </div>
  );
}
