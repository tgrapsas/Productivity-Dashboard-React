import React from 'react';
import './Analytics.css';

function Analytics({ totalTasks, totalTime }) {
  return (
    <div className="analytics-bar">
      <div className="analytic-card">
        <span className="title">Συνολικά Tasks</span>
        <span>{totalTasks}</span>
      </div>
      <div className="analytic-card">
        <span className="title">Συνολικός Χρόνος</span>
        <span>{totalTime}</span>
      </div>
    </div>
  );
}

export default Analytics;