interface TaskProps {
    id: number;
    titulo: string;
    iniciado: boolean;
    completo: boolean;
    onDelete: () => void;
    onStart: () => void;
  }
  
  export default function Task({ titulo, iniciado, onDelete, onStart }: TaskProps) {
    return (
      <div className="task">
        <div className="titulo">{titulo}</div>
        <div className="status">
          {!iniciado ? (
            <button className="comecar" onClick={onStart}>
              Começar
            </button>
          ) : (
            <span className="em-andamento">Em andamento</span>
          )}
        </div>
        <button className="deletar" onClick={onDelete}>
          🗑️
        </button>
      </div>
    );
  }