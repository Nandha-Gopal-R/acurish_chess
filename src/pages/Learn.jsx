import { useNavigate } from "react-router-dom";
import FloatingPieces from "../components/FloatingPieces";
import LevelCard from "../components/learn/LevelCard";
import { levels } from "../data/lessonsData";

export default function Learn() {
  const navigate = useNavigate();

  return (
    <div className="learn-hub">
      <FloatingPieces />

      <div className="learn-hub-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>
        <h1 className="learn-hub-title">
          <span className="learn-hub-accent">🎓</span> Learn Chess
        </h1>
        <p className="learn-hub-subtitle">
          25+ structured lessons across 4 levels — from beginner mates to advanced patterns
        </p>
      </div>

      <div className="learn-levels-grid">
        {levels.map((level) => (
          <LevelCard key={level.id} level={level} />
        ))}
      </div>

      <div className="learn-hub-footer">
        <p>Progress is saved automatically • Complete puzzles to unlock badges</p>
      </div>
    </div>
  );
}