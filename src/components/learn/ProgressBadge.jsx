import { getLessonProgress } from "../../utils/progress";

export default function ProgressBadge({ lessonId, total }) {
    const progress = getLessonProgress(lessonId);

    if (progress.completed) {
        return <span className="badge badge-complete">✓ Completed</span>;
    }

    const done = progress.puzzlesDone?.length || 0;
    if (done > 0) {
        return (
            <span className="badge badge-partial">
                {done}/{total} Puzzles
            </span>
        );
    }

    return <span className="badge badge-new">New</span>;
}
