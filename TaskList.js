import React from "react";

export default function TaskList({ tasks, onDelete, onToggle }) {
  const styles = {
    list: { listStyle: "none", padding: 0 },
    item: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px",
      borderBottom: "1px solid #ddd",
    },
    span: (done) => ({
      flex: 1,
      textAlign: "left",
      textDecoration: done ? "line-through" : "none",
      color: done ? "gray" : "black",
      cursor: "pointer",
    }),
    button: {
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "5px",
      padding: "5px 10px",
      cursor: "pointer",
      marginLeft: "10px",
    },
  };

  if (tasks.length === 0) {
    return React.createElement("p", null, "Список задач пуст.");
  }

  return React.createElement(
    "ul",
    { style: styles.list },
    tasks.map((t) =>
      React.createElement(
        "li",
        { key: t.id, style: styles.item },
        React.createElement(
          "span",
          {
            style: styles.span(t.done),
            onClick: () => onToggle(t.id),
            title: "Кликни, чтобы отметить как выполненную",
          },
          t.text
        ),
        React.createElement(
          "button",
          { onClick: () => onDelete(t.id), style: styles.button },
          "Удалить"
        )
      )
    )
  );
}
