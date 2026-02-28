import { useNavigate } from "react-router-dom";
import ProgressBadge from "./ProgressBadge";

const DIFFICULTY_COLORS = {
    Beginner: "#6366f1",
    Intermediate: "#ec4899",
    Expert: "#10b981",
};

export default function LessonCard({ lesson, levelId }) {
    const navigate = useNavigate();

    return (
        <div
            className="lesson-card"
            onClick={() => navigate(`/learn/level-${levelId}/${lesson.slug}`)}
        >
            <div className="lesson-card-left">
                <div
                    className="difficulty-tag"
                    style={{ "--tag-color": DIFFICULTY_COLORS[lesson.difficulty] || "#6366f1" }}
                >
                    {lesson.difficulty}
                </div>
                <h3 className="lesson-card-title">{lesson.title}</h3>
                <p className="lesson-card-meta">{lesson.puzzles.length} puzzles</p>
            </div>
            <div className="lesson-card-right">
                <ProgressBadge lessonId={lesson.id} total={lesson.puzzles.length} />
                <span className="lesson-card-arrow">→</span>
            </div>
        </div>
    );
}
