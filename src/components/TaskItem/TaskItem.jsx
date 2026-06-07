import React from 'react';
import './TaskItem.css';

function TaskItem({ task, formatTime, toggleTimer, completeTask, deleteTask }) {
  return (
    <div className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
      <div className="task-info">
        <span className="task-name" style={task.isCompleted ? { textDecoration: 'line-through' } : {}}>
          {task.name}
        </span>
        <span className="task-cat">{task.category}</span>
      </div>
      <div className="task-controls">
        <span className="timer-display">{formatTime(task.seconds)}</span>

        {!task.isCompleted && (
          <>
            <button 
              className={`action-btn ${task.isRunning ? 'pause' : 'start'}`}
              onClick={() => toggleTimer(task.id)}
            >
              {task.isRunning ? 'Pause' : 'Start'}
            </button>
            <button className="action-btn complete" onClick={() => completeTask(task.id)}>✓</button>
          </>
        )}

        <button className="action-btn delete" onClick={() => deleteTask(task.id)}>×</button>
      </div>
    </div>
  );
}

export default TaskItem;