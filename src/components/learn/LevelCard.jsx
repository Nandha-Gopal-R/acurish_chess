import { useNavigate } from "react-router-dom";
import { getLevelProgress } from "../../utils/progress";
import { allLessons } from "../../data/lessonsData";

export default function LevelCard({ level }) {
    const navigate = useNavigate();
    const { completed, total } = getLevelProgress(level.id, allLessons);
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div
            className="level-card"
            style={{ "--level-accent": level.accent }}
            onClick={() => navigate(`/learn/level-${level.id}`)}
        >
            <div className="level-card-glow" style={{ background: level.gradient }} />

            <div className="level-card-icon">{level.icon}</div>
            <div className="level-card-content">
                <div className="level-card-number">Level {level.id}</div>
                <div className="level-card-title">{level.title}</div>
                <div className="level-card-subtitle">{level.subtitle}</div>
                <p className="level-card-desc">{level.description}</p>

                <div className="level-progress-row">
                    <div className="level-progress-bar">
                        <div
                            className="level-progress-fill"
                            style={{ width: `${pct}%`, background: level.gradient }}
                        />
                    </div>
                    <span className="level-progress-text">
                        {completed}/{total} lessons
                    </span>
                </div>
            </div>

            <div className="level-card-cta" style={{ background: level.gradient }}>
                {completed === total && total > 0 ? "✓ Review" : pct > 0 ? "Continue →" : "Start →"}
            </div>
        </div>
    );
}
