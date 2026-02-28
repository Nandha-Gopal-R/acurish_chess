import { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { allLessons, levels } from "../data/lessonsData";
import { guidedLessons } from "../data/guidedLessons";
import { getLessonProgress, markPuzzleDone, markLessonComplete, saveBestTime } from "../utils/progress";
import PuzzleBoard from "../components/learn/PuzzleBoard";
import Timer from "../components/learn/Timer";
import GuidedBoard from "../components/learn/GuidedBoard";
import FloatingPieces from "../components/FloatingPieces";

const Confetti = () => {
    const particles = Array.from({ length: 50 });
    return (
        <div className="confetti-container">
            {particles.map((_, i) => (
                <div
                    key={i}
                    className="particle"
                    style={{
                        left: `${Math.random() * 100}%`,
                        backgroundColor: ["#4f46e5", "#7c3aed", "#10b981", "#fbbf24", "#ef4444"][Math.floor(Math.random() * 5)],
                        animationDelay: `${Math.random() * 3}s`,
                        width: `${Math.random() * 8 + 4}px`,
                        height: `${Math.random() * 8 + 4}px`,
                    }}
                />
            ))}
        </div>
    );
};

export default function LessonPage() {
    const { levelId, lessonId } = useParams();
    const navigate = useNavigate();
    const levelNum = parseInt(levelId?.replace("level-", ""), 10);
    const level = levels.find((l) => l.id === levelNum);
    const lesson = allLessons.find((l) => l.slug === lessonId && l.level === levelNum);

    const savedProgress = lesson ? getLessonProgress(lesson.id) : {};
    const [solvedPuzzles, setSolvedPuzzles] = useState(
        new Set(savedProgress.puzzlesDone || [])
    );
    const [currentIdx, setCurrentIdx] = useState(0);
    const [timedRunning, setTimedRunning] = useState(false);
    const [timedSolved, setTimedSolved] = useState(false);
    const [timedExpired, setTimedExpired] = useState(false);
    const [timedElapsed, setTimedElapsed] = useState(0);
    const [timedKey, setTimedKey] = useState(0);
    const [puzzleStatus, setPuzzleStatus] = useState("idle");
    const [section, setSection] = useState("theory"); // theory | demo | puzzles | timed | complete
    const guided = guidedLessons[lesson?.slug];

    // Reset puzzle status whenever the puzzle changes
    useEffect(() => {
        setPuzzleStatus("idle");
    }, [currentIdx]);

    if (!lesson || !level) {
        return (
            <div className="lesson-page-error">
                <p>Lesson not found.</p>
                <button className="back-btn" onClick={() => navigate("/learn")}>← Back to Learn</button>
            </div>
        );
    }

    const allSolved = solvedPuzzles.size >= lesson.puzzles.length;
    const lessonComplete = allSolved && (lesson.timedChallenge ? timedSolved || timedExpired : true);

    const handlePuzzleSolve = useCallback((puzzleId) => {
        setSolvedPuzzles((prev) => {
            const next = new Set(prev);
            next.add(puzzleId);
            markPuzzleDone(lesson.id, puzzleId);
            return next;
        });
        // Auto-advance after short delay
        setTimeout(() => {
            setCurrentIdx((idx) => {
                const nextUnsolved = lesson.puzzles.findIndex(
                    (p, i) => i > idx && !solvedPuzzles.has(p.id)
                );
                if (nextUnsolved !== -1) return nextUnsolved;
                const anyUnsolved = lesson.puzzles.findIndex((p) => !solvedPuzzles.has(p.id) && p.id !== puzzleId);
                return anyUnsolved !== -1 ? anyUnsolved : idx;
            });
        }, 1200);
    }, [lesson.id, lesson.puzzles, solvedPuzzles]);

    const handleTimedSolve = () => {
        const elapsed = (lesson.timedChallenge?.timeLimit || 60) - timedElapsed;
        setTimedSolved(true);
        setTimedRunning(false);
        saveBestTime(lesson.id, elapsed);
        if (allSolved) {
            markLessonComplete(lesson.id);
            setSection("complete");
        }
    };

    const handleTimedExpire = () => {
        setTimedExpired(true);
        setTimedRunning(false);
        if (allSolved) {
            markLessonComplete(lesson.id);
            setSection("complete");
        }
    };

    const startTimedChallenge = () => {
        setTimedSolved(false);
        setTimedExpired(false);
        setTimedKey((k) => k + 1);
        setTimedRunning(true);
        setTimedElapsed(lesson.timedChallenge?.timeLimit || 60);
    };

    if (section === "complete") {
        markLessonComplete(lesson.id);
    }

    const progress = { done: solvedPuzzles.size, total: lesson.puzzles.length };

    return (
        <div className={`lesson-page ${section === "demo" ? "is-demo-mode" : ""} ${["theory", "puzzles", "timed"].includes(section) ? "is-lesson-fullscreen" : ""}`}>
            {allSolved && <Confetti />}
            <FloatingPieces />

            {/* ── Header ── */}
            <div className="lesson-header" style={{ "--level-gradient": level.gradient }}>
                <button className="back-btn" onClick={() => navigate(`/learn/level-${levelNum}`)}>← Back</button>
                <div className="lesson-header-text">
                    <div className="lesson-tags-row">
                        <span className="lesson-level-tag" style={{ background: level.gradient }}>Level {levelNum}</span>
                        <span className={`difficulty-tag ${lesson.difficulty.toLowerCase()}`}>{lesson.difficulty}</span>
                    </div>
                    <h1 className="lesson-title">{lesson.title}</h1>
                </div>
            </div>

            {/* ── Section Tabs ── */}
            <div className="lesson-tabs">
                {["theory", ...(guided ? ["demo"] : []), "puzzles", ...(lesson.timedChallenge ? ["timed"] : [])].map((tab) => (
                    <button
                        key={tab}
                        className={`lesson-tab ${section === tab || (section === "complete" && tab === "timed") ? "active" : ""}`}
                        onClick={() => setSection(tab)}
                        style={{ "--level-gradient": level.gradient }}
                    >
                        {tab === "theory" && "📖 Theory"}
                        {tab === "demo" && "🎬 Demo"}
                        {tab === "puzzles" && `⚡ Puzzles ${progress.done}/${progress.total}`}
                        {tab === "timed" && (timedSolved ? "⏱ Challenge ✓" : "⏱ Challenge")}
                    </button>
                ))}
            </div>

            <div className={`lesson-body ${section === "demo" ? "lesson-body-wide" : ""}`}>

                {section === "demo" && guided && (
                    <GuidedBoard
                        guided={guided}
                        accent={level.gradient}
                        onStartPuzzles={() => setSection("puzzles")}
                        onReadTheory={() => setSection("theory")}
                    />
                )}

                {/* ── Theory Section ── */}
                {section === "theory" && (
                    <div className="theory-section">
                        <div className="theory-card">
                            <h2 className="theory-heading">📖 What is {lesson.title}?</h2>
                            <p className="theory-text">{lesson.explanation}</p>
                        </div>

                        <div className="theory-card">
                            <h3 className="theory-subheading">🔑 Key Ideas</h3>
                            <ul className="key-points">
                                {lesson.keyPoints.map((pt, i) => (
                                    <li key={i}>{pt}</li>
                                ))}
                            </ul>
                        </div>

                        {lesson.commonMistakes && (
                            <div className="theory-card theory-warning">
                                <h3 className="theory-subheading">⚠️ Common Mistakes</h3>
                                <ul className="key-points warning-points">
                                    {lesson.commonMistakes.map((m, i) => (
                                        <li key={i}>{m}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {lesson.whyRare && (
                            <div className="theory-card theory-premium">
                                <h3 className="theory-subheading">💎 Why This Pattern Matters</h3>
                                <p className="theory-text">{lesson.whyRare}</p>
                            </div>
                        )}

                        {lesson.defense && (
                            <div className="theory-card theory-defense">
                                <h3 className="theory-subheading">🛡 How to Defend</h3>
                                <p className="theory-text">{lesson.defense}</p>
                            </div>
                        )}

                        {lesson.whyItWorks && (
                            <div className="theory-card">
                                <h3 className="theory-subheading">🧠 Why It Works</h3>
                                <p className="theory-text">{lesson.whyItWorks}</p>
                            </div>
                        )}

                        <button
                            className="cta-btn"
                            style={{ background: level.gradient }}
                            onClick={() => setSection("puzzles")}
                        >
                            Start Puzzles →
                        </button>
                    </div>
                )}

                {/* ── Puzzles Section ── */}
                {section === "puzzles" && (
                    <div className="puzzles-section">
                        <div className="puzzle-layout-wrapper">
                            <div className="puzzle-area">
                                <h3 className="puzzle-number">
                                    Puzzle {currentIdx + 1} of {lesson.puzzles.length}
                                    {solvedPuzzles.has(lesson.puzzles[currentIdx]?.id) && (
                                        <span className="puzzle-solved-tag"> ✓ Solved</span>
                                    )}
                                </h3>
                                <PuzzleBoard
                                    key={lesson.puzzles[currentIdx]?.id}
                                    puzzle={lesson.puzzles[currentIdx]}
                                    onSolve={() => handlePuzzleSolve(lesson.puzzles[currentIdx]?.id)}
                                    status={puzzleStatus}
                                    setStatus={setPuzzleStatus}
                                />

                            </div>

                            <div className="sidebar-column">
                                <aside className="puzzle-sidebar">
                                    <div className="puzzle-nav-header">
                                        <span className="nav-label">Puzzles</span>
                                        <span className="nav-count">{progress.done}/{progress.total}</span>
                                    </div>
                                    <div className="puzzle-nav-vertical">
                                        {lesson.puzzles.map((p, i) => (
                                            <button
                                                key={p.id}
                                                className={`puzzle-nav-btn ${i === currentIdx ? "active" : ""} ${solvedPuzzles.has(p.id) ? "solved" : ""}`}
                                                onClick={() => setCurrentIdx(i)}
                                                style={{ "--level-gradient": level.gradient }}
                                            >
                                                <span className="btn-num">{i + 1}</span>
                                                {solvedPuzzles.has(p.id) && <span className="btn-check">✓</span>}
                                            </button>
                                        ))}
                                    </div>
                                </aside>
                            </div>
                        </div>

                        {
                            allSolved && (
                                <div className="puzzles-complete-banner premium-banner">
                                    <div className="banner-glow"></div>
                                    <div className="banner-content">
                                        <span className="banner-icon">🏆</span>
                                        <div className="banner-text">
                                            <h3>All Puzzles Mastered!</h3>
                                            <p>
                                                {lesson.timedChallenge
                                                    ? "You're ready for the Timed Challenge."
                                                    : "Great work! You've completed all tasks for this lesson."}
                                            </p>
                                        </div>
                                        {lesson.timedChallenge ? (
                                            <button className="cta-btn pulse-btn" style={{ background: level.gradient }} onClick={() => setSection("timed")}>
                                                Timed Challenge →
                                            </button>
                                        ) : (
                                            <button className="cta-btn pulse-btn" style={{ background: level.gradient }} onClick={() => { markLessonComplete(lesson.id); setSection("complete"); }}>
                                                Complete Lesson →
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )
                        }
                    </div >
                )
                }

                {/* ── Timed Challenge Section ── */}
                {
                    section === "timed" && lesson.timedChallenge && (
                        <div className="timed-section">
                            <div className="timed-header">
                                <h2 className="timed-title">⏱ Timed Challenge</h2>
                                <p className="timed-desc">
                                    Solve the checkmate under time pressure! You have{" "}
                                    <strong>{lesson.timedChallenge.timeLimit} seconds</strong>.
                                </p>
                            </div>

                            {!timedRunning && !timedSolved && !timedExpired && (
                                <button className="cta-btn" style={{ background: level.gradient }} onClick={startTimedChallenge}>
                                    Start Timer →
                                </button>
                            )}

                            {(timedRunning || timedSolved || timedExpired) && (
                                <>
                                    <Timer
                                        key={timedKey}
                                        seconds={lesson.timedChallenge.timeLimit}
                                        running={timedRunning}
                                        onExpire={handleTimedExpire}
                                    />
                                    <PuzzleBoard
                                        key={`timed-${timedKey}`}
                                        puzzle={lesson.timedChallenge}
                                        onSolve={handleTimedSolve}
                                    />
                                </>
                            )}

                            {timedSolved && (
                                <div className="timed-result timed-success">
                                    <span>🏆</span>
                                    <strong>Brilliant! You found the checkmate in time!</strong>
                                    <button className="cta-btn" style={{ background: level.gradient }} onClick={() => { markLessonComplete(lesson.id); setSection("complete"); }}>
                                        Complete Lesson →
                                    </button>
                                </div>
                            )}

                            {timedExpired && !timedSolved && (
                                <div className="timed-result timed-expire">
                                    <span>⏰</span>
                                    <strong>Time's up! Try the timed challenge again.</strong>
                                    <button className="reset-btn" onClick={startTimedChallenge}>↺ Try Again</button>
                                    <button className="cta-btn" style={{ background: level.gradient }} onClick={() => { markLessonComplete(lesson.id); setSection("complete"); }}>
                                        Complete Anyway →
                                    </button>
                                </div>
                            )}
                        </div>
                    )
                }

                {/* ── Completion Section ── */}
                {
                    section === "complete" && (
                        <div className="completion-section">
                            <div className="completion-banner">
                                <div className="completion-icon">🏆</div>
                                <h2 className="completion-title">Lesson Complete!</h2>
                                <p className="completion-subtitle">
                                    You've mastered <strong>{lesson.title}</strong>. Great work!
                                </p>
                                <div className="completion-stats">
                                    <div className="completion-stat">
                                        <span className="stat-num">{progress.total}</span>
                                        <span className="stat-label">Puzzles Solved</span>
                                    </div>
                                    {timedSolved && (
                                        <div className="completion-stat">
                                            <span className="stat-num">✓</span>
                                            <span className="stat-label">Timed Challenge</span>
                                        </div>
                                    )}
                                </div>
                                <div className="completion-actions">
                                    <button className="back-btn" onClick={() => navigate(`/learn/level-${levelNum}`)}>
                                        ← Back to Level {levelNum}
                                    </button>
                                    <button className="cta-btn" style={{ background: level.gradient }} onClick={() => navigate("/learn")}>
                                        All Levels →
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div >
        </div >
    );
}
