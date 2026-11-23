const statuses = ["All", "To do", "In progress", "Completed"];

export default function FilterTabs({ status, onStatusChange, priority, onPriorityChange }) {
  return (
    <div className="filter-row">
      <div className="status-tabs" role="group" aria-label="Filter tasks by status">
        {statuses.map((item) => (
          <button
            key={item}
            className={`tab ${status === item ? "active" : ""}`}
            onClick={() => onStatusChange(item)}
            aria-pressed={status === item}
          >
            {item}
          </button>
        ))}
      </div>

      <label className="priority-filter">
        <span className="sr-only">Filter by priority</span>
        <select value={priority} onChange={(event) => onPriorityChange(event.target.value)}>
          <option value="All">All priorities</option>
          <option value="Low">Low priority</option>
          <option value="Medium">Medium priority</option>
          <option value="High">High priority</option>
        </select>
      </label>
    </div>
  );
}
