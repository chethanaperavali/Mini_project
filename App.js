import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  function handleAddTask(e) {
    e.preventDefault();
    if (input.trim() === '') return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: input.trim(), completed: false }
    ]);
    setInput('');
  }

  function handleToggleTask(id) {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    ));
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 16, border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Personal Task Manager</h2>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a new task"
          style={{ width: "70%", padding: "8px" }}
        />
        <button type="submit" style={{ padding: "8px 12px", marginLeft: 8 }}>Add</button>
      </form>
      <ul style={{ listStyle: "none", padding: 0, marginTop: 16 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ marginBottom: 12, display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(task.id)}
            />
            <span
              style={{
                marginLeft: 8,
                textDecoration: task.completed ? "line-through" : "none"
              }}
            >
              {task.text}
            </span>
            <button
              onClick={() => handleDeleteTask(task.id)}
              style={{ marginLeft: "auto", padding: "4px 8px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {tasks.length === 0 && <p style={{ color: "#888" }}>No tasks yet!</p>}
    </div>
  );
}

export default App;