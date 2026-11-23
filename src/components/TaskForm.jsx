import { useEffect, useState } from "react";
import { X } from "lucide-react";

const emptyForm = {
  title: "",
  description: "",
  category: "Development",
  status: "To do",
  priority: "Medium",
  dueDate: ""
};

export default function TaskForm({ isOpen, taskToEdit, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  // load selected task for editing
  useEffect(() => {
    if (taskToEdit) {
      setForm({ ...emptyForm, ...taskToEdit });
    } else {
      setForm(emptyForm);
    }
    setError("");
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const cleanTitle = form.title.trim();
    if (!cleanTitle) {
      setError("Please enter a task title.");
      return;
    }
    if (!form.status || !form.priority || !form.dueDate) {
      setError("Please complete the status, priority and due date fields.");
      return;
    }

    onSave({ ...form, title: cleanTitle });
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="task-modal" role="dialog" aria-modal="true" aria-labelledby="task-form-title">
        <div className="modal-heading">
          <div>
            <p className="eyebrow">{taskToEdit ? "UPDATE YOUR WORK" : "ADD TO YOUR WORKSPACE"}</p>
            <h2 id="task-form-title">{taskToEdit ? "Edit task" : "Create a task"}</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close form"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="form-field">
            Task title <span className="required">*</span>
            <input name="title" value={form.title} onChange={updateField} placeholder="e.g. Complete dashboard" autoFocus />
          </label>

          <label className="form-field">
            Description
            <textarea name="description" value={form.description} onChange={updateField} rows="3" placeholder="Add a short description..." />
          </label>

          <div className="form-grid">
            <label className="form-field">
              Category
              <select name="category" value={form.category} onChange={updateField}>
                <option>Design</option><option>Development</option><option>Testing</option><option>Research</option>
              </select>
            </label>
            <label className="form-field">
              Status <span className="required">*</span>
              <select name="status" value={form.status} onChange={updateField}>
                <option>To do</option><option>In progress</option><option>Completed</option>
              </select>
            </label>
            <label className="form-field">
              Priority <span className="required">*</span>
              <select name="priority" value={form.priority} onChange={updateField}>
                <option>Low</option><option>Medium</option><option>High</option>
              </select>
            </label>
            <label className="form-field">
              Due date <span className="required">*</span>
              <input type="date" name="dueDate" value={form.dueDate} onChange={updateField} />
            </label>
          </div>

          {error && <p className="form-error" role="alert">{error}</p>}

          <div className="modal-actions">
            <button type="button" className="button secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="button primary">{taskToEdit ? "Save changes" : "Create task"}</button>
          </div>
        </form>
      </section>
    </div>
  );
}
