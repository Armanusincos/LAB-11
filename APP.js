import React, { useState, useEffect } from "react";
import TaskList from "./TaskList.js";
import TaskForm from "./TaskForm.js";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Добавление задачи
  const addTask = (text) => {
    const newTask = { id: Date.now(), text, done: false };
    setTasks([...tasks, newTask]);
  };

  // Удаление одной задачи
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Очистить все задачи
  const clearAll = () => {
    if (tasks.length === 0) return;
    if (confirm("Удалить все задачи?")) setTasks([]);
  };

  // Переключить статус выполнено/не выполнено
  const toggleDone = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  // Стили
  const styles = {
    container: {
      maxWidth: "400px",
      margin: "50px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
    },
    button: {
      padding: "8px 15px",
      border: "none",
      backgroundColor: "#dc3545",
      color: "white",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "10px",
    },
    counter: {
      marginTop: "10px",
      fontSize: "14px",
      color: "#555",
    },
  };

  const completedCount = tasks.filter((t) => t.done).length;

  return React.createElement(
    "div",
    { style: styles.container },
    React.createElement("h1", null, "Список задач"),

    // Форма добавления
    React.createElement(TaskForm, { onAdd: addTask }),

    // Список задач
    React.createElement(TaskList, { tasks, onDelete: deleteTask, onToggle: toggleDone }),

    // Счётчик задач
    React.createElement(
      "p",
      { style: styles.counter },
      `Всего задач: ${tasks.length} | Выполнено: ${completedCount}`
    ),

    // Кнопка очистки всех задач
    React.createElement(
      "button",
      { style: styles.button, onClick: clearAll },
      "Очистить все задачи"
    )
  );
}
