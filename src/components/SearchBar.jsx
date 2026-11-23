import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <label className="search-box">
      <Search size={18} aria-hidden="true" />
      <span className="sr-only">Search tasks by title</span>
      <input
        type="search"
        placeholder="Search tasks..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
