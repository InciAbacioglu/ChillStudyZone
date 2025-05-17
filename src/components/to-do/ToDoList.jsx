import React from "react";
import "./ToDoList.css";

function ToDoList({ tasks, setTasks, newtask, setNewTask }) {
  const handleAddTask = () => {
    if (newtask.trim() !== "") {
      setTasks([
        ...tasks,
        { text: newtask.trim(), completed: false, id: Date.now() },
      ]);
      setNewTask("");
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleCompletion = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const handleUpMove = (i) => {
    if (i > 0) {
      const updated = [...tasks];
      [updated[i], updated[i - 1]] = [updated[i - 1], updated[i]];
      setTasks(updated);
    }
  };

  const handleDownMove = (i) => {
    if (i < tasks.length - 1) {
      const updated = [...tasks];
      [updated[i], updated[i + 1]] = [updated[i + 1], updated[i]];
      setTasks(updated);
    }
  };

  return (
    <div className="todo-container">
      <h2>To-Do List ✅</h2>

      <div className="todo-input-group">
        <input
          value={newtask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={handleAddTask}>➕ Add</button>
      </div>

      <ul className="task-list">
        {tasks.map((task, i) => (
          <li
            key={task.id}
            className={`task-item ${task.completed ? "completed" : ""}`}
          >
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleCompletion(i)}
              />
              <span className="checkmark" />
            </label>

            <span className="task-text">{task.text}</span>

            <div className="task-actions">
              <button onClick={() => handleUpMove(i)}>⬆</button>
              <button onClick={() => handleDownMove(i)}>⬇</button>
              <button onClick={() => handleDeleteTask(task.id)}>🗑</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
