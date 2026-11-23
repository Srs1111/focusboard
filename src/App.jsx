import { useMemo, useState } from "react";
import { CheckCircle2, CircleDashed, ListTodo, Plus, Target } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import FocusNotes from "./components/FocusNotes";
import SearchBar from "./components/SearchBar";
import FilterTabs from "./components/FilterTabs";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import sampleTasks from "./data/sampleTasks";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const [tasks, setTasks] = useLocalStorage("focusboard_tasks", sampleTasks);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [formOpen, setFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Calculate statistics from the full task list, not the filtered list.
  const totalTasks = tasks.length;
  const inProgressTasks = tasks.filter((task) => task.status === "In progress").length;
  const completedTasks = tasks.filter((task) => task.status === "Completed").length;
  const completion = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // Search and both filters are applied together.
  const visibleTasks = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(query);
      const matchesStatus = statusFilter === "All" || task.status === statusFilter;
      const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchText, statusFilter, priorityFilter]);

  function openCreateForm() {
    setTaskToEdit(null);
    setFormOpen(true);
  }

  function openEditForm(task) {
    setTaskToEdit(task);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setTaskToEdit(null);
  }

  function saveTask(formData) {
    if (taskToEdit) {
      setTasks((current) =>
        current.map((task) =>
          task.id === taskToEdit.id ? { ...formData, id: taskToEdit.id } : task
        )
      );
    } else {
      const newTask = { ...formData, id: Date.now() };
      setTasks((current) => [newTask, ...current]);
    }
    closeForm();
  }

  function deleteTask(task) {
    const confirmed = window.confirm(`Delete "${task.title}"? This task will be removed.`);
    if (confirmed) {
      setTasks((current) => current.filter((item) => item.id !== task.id));
    }
  }

  function changeStatus(taskId, newStatus) {
    setTasks((current) =>
      current.map((task) => task.id === taskId ? { ...task, status: newStatus } : task)
    );
  }

  return (
    <div className="app-shell" id="dashboard">
      <div className={`sidebar-wrap ${menuOpen ? "menu-open" : ""}`} onClick={() => setMenuOpen(false)}>
        <div onClick={(event) => event.stopPropagation()}><Sidebar /></div>
      </div>

      <main className="main-area">
        <Header onMenuClick={() => setMenuOpen((open) => !open)} />

        <div className="dashboard-content">
          <section className="welcome-row">
            <div>
              <p className="eyebrow">YOUR PRODUCTIVITY SPACE</p>
              <h2>Good day! <span>Ready to focus?</span></h2>
              <p className="muted">Keep your priorities clear and make progress one task at a time.</p>
            </div>
            <button className="button primary add-task-button" onClick={openCreateForm}>
              <Plus size={18} /> Add task
            </button>
          </section>

          <section className="stats-grid" aria-label="Task overview">
            <StatCard label="Total tasks" value={totalTasks} helper="Tasks in your workspace" icon={ListTodo} tone="purple" />
            <StatCard label="In progress" value={inProgressTasks} helper="Currently being worked on" icon={CircleDashed} tone="orange" />
            <StatCard label="Completed" value={completedTasks} helper="Successfully finished" icon={CheckCircle2} tone="green" />
            <StatCard label="Completion" value={`${completion}%`} helper="Overall progress" icon={Target} tone="blue" />
          </section>

          <FocusNotes />

          <section className="tasks-section" id="tasks">
            <div className="section-heading">
              <div>
                <p className="eyebrow">STAY ON TRACK</p>
                <h2>My tasks <span className="task-count">{visibleTasks.length}</span></h2>
              </div>
              <SearchBar value={searchText} onChange={setSearchText} />
            </div>

            <FilterTabs
              status={statusFilter}
              onStatusChange={setStatusFilter}
              priority={priorityFilter}
              onPriorityChange={setPriorityFilter}
            />

            <TaskList
              tasks={visibleTasks}
              onEdit={openEditForm}
              onDelete={deleteTask}
              onStatusChange={changeStatus}
            />
          </section>

          <footer className="footer-note">FocusBoard · Make today count.</footer>
        </div>
      </main>

      <TaskForm
        isOpen={formOpen}
        taskToEdit={taskToEdit}
        onClose={closeForm}
        onSave={saveTask}
      />
    </div>
  );
}
