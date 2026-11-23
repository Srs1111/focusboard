import { CheckSquare, LayoutDashboard, CalendarDays, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <a className="brand" href="#dashboard" aria-label="FocusBoard home">
        <span className="brand-mark"><CheckSquare size={22} /></span>
        <span>Focus<span className="brand-light">Board</span></span>
      </a>

      <p className="nav-label">WORKSPACE</p>
      <nav className="side-nav" aria-label="Main navigation">
        <a className="nav-link active" href="#dashboard"><LayoutDashboard size={18} /> Dashboard</a>
        <a className="nav-link" href="#tasks"><CheckSquare size={18} /> My Tasks</a>
        <a className="nav-link" href="#focus-notes"><CalendarDays size={18} /> Focus Notes</a>
      </nav>

      <div className="sidebar-bottom">
        <a className="nav-link" href="#settings"><Settings size={18} /> Settings</a>
        <div className="profile-mini">
          <div className="avatar">S</div>
          <div><strong>Workspace</strong><span>Personal planner</span></div>
        </div>
      </div>
    </aside>
  );
}
