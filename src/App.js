import React, { useState, useEffect } from 'react';
import './App.css';
import Analytics from './components/Analytics/Analytics';
import TaskItem from './components/TaskItem/TaskItem';

function App() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem('prodTasks')) || [];
  });
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark-theme';
  });
  const [taskInput, setTaskInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("💻 Coding");

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('prodTasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.isRunning ? { ...task, seconds: task.seconds + 1 } : task
        )
      );
    }, 1000);
    return () => clearInterval(interval); 
  }, []);

  const handleAddTask = () => {
    if (taskInput.trim() === "") {
      alert("Δώσε ένα όνομα στο task!");
      return;
    }
    const newTask = {
      id: Date.now(),
      name: taskInput,
      category: categoryInput,
      seconds: 0,
      isRunning: false,
      isCompleted: false
    };
    setTasks([...tasks, newTask]);
    setTaskInput("");
  };

  const toggleTimer = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, isRunning: !t.isRunning } : t));
  };

  const completeTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, isCompleted: true, isRunning: false } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark-theme' ? 'light-theme' : 'dark-theme');
  };

  const formatTime = (totalSeconds) => {
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const totalTimeSeconds = tasks.reduce((sum, t) => sum + t.seconds, 0);

  return (
    <div className="dashboard-wrapper">
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'dark-theme' ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <header className="dashboard-header">
        <h2>⏱️ Developer Productivity Dashboard</h2>
        <p>Οργανώστε τα tasks σας και μετρήστε τον χρόνο εργασίας σας σε πραγματικό χρόνο.</p>
      </header>

      {/* Analytics Component */}
      <Analytics 
        totalTasks={tasks.length} 
        totalTime={formatTime(totalTimeSeconds)} 
      />

      <div className="input-section">
        <input 
          type="text" 
          placeholder="Τι θα δουλέψετε τώρα;..." 
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
        />
        <select value={categoryInput} onChange={(e) => setCategoryInput(e.target.value)}>
          <option value="💻 Coding">Coding</option>
          <option value="🎨 Design">Design</option>
          <option value="📝 Review">Code Review</option>
          <option value="☕ Break">Break</option>
        </select>
        <button onClick={handleAddTask}>Προσθήκη Task</button>
      </div>

      <div className="tasks-section">
        <h3>📋 Λίστα Εργασιών</h3>
        <div id="tasksList">
          {tasks.length === 0 ? (
            <p style={{textAlign: 'center', color: '#64748b', padding: '20px'}}>
              Δεν υπάρχουν tasks ακόμη. Ξεκινήστε προσθέτοντας ένα!
            </p>
          ) : (
            tasks.map(task => (
              /* TaskItem Component */
              <TaskItem 
                key={task.id}
                task={task}
                formatTime={formatTime}
                toggleTimer={toggleTimer}
                completeTask={completeTask}
                deleteTask={deleteTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;