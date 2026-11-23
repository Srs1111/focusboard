import { CalendarDays, Pencil, Trash2 } from "lucide-react";

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <article className="task-card">
      <div className="task-main">
        <div className="task-title-line">
          <h3>{task.title}</h3>
          <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
        </div>
        {task.description && <p className="task-description">{task.description}</p>}
        <div className="task-meta">
          <span className="category">{task.category}</span>
          <span><CalendarDays size={14} /> {task.dueDate || "No due date"}</span>
        </div>
      </div>

      <div className="task-actions">
        <label className="status-select-label">
          <span className="sr-only">Status for {task.title}</span>
          <select
            className={`status-select status-${task.status.toLowerCase().replace(" ", "-")}`}
            value={task.status}
            onChange={(event) => onStatusChange(task.id, event.target.value)}
          >
            <option>To do</option>
            <option>In progress</option>
            <option>Completed</option>
          </select>
        </label>
        <button className="small-icon-button" onClick={() => onEdit(task)} aria-label={`Edit ${task.title}`}><Pencil size={16} /></button>
        <button className="small-icon-button danger" onClick={() => onDelete(task)} aria-label={`Delete ${task.title}`}><Trash2 size={16} /></button>
      </div>
    </article>
  );
}
