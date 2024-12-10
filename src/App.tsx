import { useState } from 'react';

import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [taskCount, setTaskCount] = useState(0);

  return (
    <div className="App">
      <div className="header">
        <h1>Habits</h1>
        <span className="items-count">{taskCount} itens</span>
      </div>
      <TaskList onTaskCountChange={setTaskCount} />
    </div>
  );
}

export default App;