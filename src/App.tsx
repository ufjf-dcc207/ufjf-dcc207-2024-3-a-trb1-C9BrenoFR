import TaskList from './components/TaskList';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>Habitos</h1>
        <span className="items-count">x items</span>
      </div>
      <TaskList />
    </div>
  );
}

export default App;