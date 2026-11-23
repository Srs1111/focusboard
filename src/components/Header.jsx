import { Bell, Menu } from "lucide-react";

export default function Header({ onMenuClick }) {
  return (
    <header className="topbar">
      <button className="icon-button mobile-menu" onClick={onMenuClick} aria-label="Open navigation">
        <Menu size={20} />
      </button>
      <div>
        <p className="breadcrumb">Workspace <span>/</span> Dashboard</p>
        <h1>My Dashboard</h1>
      </div>
      <div className="topbar-actions">
        <button className="icon-button" aria-label="Notifications"><Bell size={19} /></button>
        <div className="avatar">S</div>
      </div>
    </header>
  );
}
