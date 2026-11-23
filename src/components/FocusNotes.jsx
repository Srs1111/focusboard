import { useState } from "react";
import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react";


const notes = [
  {
    title: "Start with a Plan",
    description: "Plan your important tasks and decide what needs your attention today."
  },
  {
    title: "Stay Focused",
    description: "Avoid distractions. Complete one task at a time and keep moving forward."
  },
  {
    title: "Make Every Day Count",
    description: "Every small step brings you closer to achieving your goals."
  }
];

export default function FocusNotes() {
  const [active, setActive] = useState(0);

  function previous() {
    setActive((current) => (current - 1 + notes.length) % notes.length);
  }

  function next() {
    setActive((current) => (current + 1) % notes.length);
  }

  return (
    <section className="focus-card" id="focus-notes" aria-label="Focus notes carousel">
      <div className="focus-top">
        <span className="focus-icon"><Lightbulb size={19} /></span>
        <span>FOCUS NOTES · {active + 1} OF {notes.length}</span>
      </div>
      <div className="focus-content" aria-live="polite">
        <h3>{notes[active].title}</h3>
        <p>{notes[active].description}</p>
      </div>
      <div className="focus-bottom">
        <div className="carousel-dots" aria-label="Choose a focus note">
          {notes.map((note, index) => (
            <button
              key={note.title}
              className={`dot ${active === index ? "selected" : ""}`}
              onClick={() => setActive(index)}
              aria-label={`Show focus note ${index + 1}`}
              aria-pressed={active === index}
            />
          ))}
        </div>
        <div className="carousel-actions">
          <button className="round-button" onClick={previous} aria-label="Previous focus note"><ArrowLeft size={17} /></button>
          <button className="round-button" onClick={next} aria-label="Next focus note"><ArrowRight size={17} /></button>
        </div>
      </div>
    </section>
  );
}
