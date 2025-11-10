import React, { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    onAdd(task);
    setTask("");
  };

  const styles = {
    form: { display: "flex", gap: "10px", justifyContent: "center", marginBottom: "15px" },
    input: { flex: "1", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" },
    button: { padding: "8px 15px", border: "none", backgroundColor: "#007bff", color: "white", borderRadius: "5px", cursor: "pointer" },
  };

  return React.createElement(
    "form",
    { onSubmit: handleSubmit, style: styles.form },
    React.createElement("input", {
      type: "text",
      placeholder: "Введите задачу...",
      value: task,
      onChange: (e) => setTask(e.target.value),
      style: styles.input,
    }),
    React.createElement("button", { type: "submit", style: styles.button }, "Добавить")
  );
}
