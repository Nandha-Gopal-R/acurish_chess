import { useNavigate, useParams } from "react-router-dom";
import { levels, allLessons } from "../data/lessonsData";
import { getLevelProgress } from "../utils/progress";
import LessonCard from "../components/learn/LessonCard";
import FloatingPieces from "../components/FloatingPieces";

export default function LearnLevel() {
    const { levelId } = useParams();
    const navigate = useNavigate();
    const levelNum = parseInt(levelId?.replace("level-", ""), 10);
    const level = levels.find((l) => l.id === levelNum);
    const lessons = allLessons.filter((l) => l.level === levelNum);
    const { completed, total } = getLevelProgress(levelNum, allLessons);
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    if (!level) {
        return (
            <div className="learn-hub">
                <p style={{ textAlign: "center", marginTop: 80 }}>Level not found.</p>
                <button className="back-btn" onClick={() => navigate("/learn")}>← Back to Learn</button>
            </div>
        );
    }

    return (
        <div className="learn-level-page">
            <FloatingPieces />

            <div className="learn-level-header" style={{ "--level-gradient": level.gradient }}>
                <button className="back-btn" onClick={() => navigate("/learn")}>← Back</button>
                <div className="level-header-icon">{level.icon}</div>
                <div className="level-header-text">
                    <div className="level-header-label">Level {level.id}</div>
                    <h1 className="level-header-title">{level.title}</h1>
                    <p className="level-header-subtitle">{level.description}</p>
                </div>
                <div className="level-header-progress">
                    <div className="level-progress-bar wide">
                        <div
                            className="level-progress-fill"
                            style={{ width: `${pct}%`, background: level.gradient }}
                        />
                    </div>
                    <span className="level-progress-text">{completed}/{total} completed — {pct}%</span>
                </div>
            </div>

            <div className="lesson-list">
                {lessons.map((lesson) => (
                    <LessonCard key={lesson.id} lesson={lesson} levelId={levelNum} />
                ))}
            </div>
        </div>
    );
}
