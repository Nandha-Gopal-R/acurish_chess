import { useState, useEffect, useRef, useCallback } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";


export default function GuidedBoard({ guided, accent, onStartPuzzles, onReadTheory }) {
    const [phase, setPhase] = useState("idle");
    const [stepMode, setStepMode] = useState(false);
    const [currentStep, setCurrentStep] = useState(-1);
    const [position, setPosition] = useState(guided.initialFen);
    const [arrows, setArrows] = useState([]);
    const [highlights, setHighlights] = useState({});
    const [controlsLocked, setControlsLocked] = useState(false);
    const [voiceMuted, setVoiceMuted] = useState(false);

    const gameRef = useRef(new Chess(guided.initialFen));
    const stepAudioRef = useRef(null);   // active Audio element
    const stepRef = useRef(-1);     // mirrors currentStep for async callbacks
    const stepModeRef = useRef(false);  // mirrors stepMode for async callbacks
    const voiceMutedRef = useRef(false);  // mirrors voiceMuted for async callbacks
    const cancelTokenRef = useRef(0);      // incremented to cancel running chain
    const boardRef = useRef(null);
    const phaseRef = useRef("idle");

    const totalSteps = guided.steps.length;

    // ── Keep refs in sync ─────────────────────────────────────────────────────
    useEffect(() => { voiceMutedRef.current = voiceMuted; }, [voiceMuted]);
    useEffect(() => { stepModeRef.current = stepMode; }, [stepMode]);
    useEffect(() => { phaseRef.current = phase; }, [phase]);

    // ── Stop any active narration ──────────────────────────────────────────────
    const stopNarration = useCallback(() => {
        if ("speechSynthesis" in window) window.speechSynthesis.cancel();
        if (stepAudioRef.current) {
            const a = stepAudioRef.current;
            a.onended = null;
            a.onerror = null;
            a.pause();
            a.currentTime = 0;
            stepAudioRef.current = null;
        }
    }, []);

    // ── Cleanup on unmount ─────────────────────────────────────────────────────
    useEffect(() => () => {
        cancelTokenRef.current++;
        stopNarration();
    }, [stopNarration]);

    // ── Phase 1: Show arrow + highlight when voice STARTS ────────────────────
    const showStepVisuals = useCallback((idx) => {
        const step = guided.steps[idx];
        if (!step) return;

        const hColor = step.highlightColor || "rgba(255, 0, 0, 0.4)";
        const aColor = step.arrowColor || "#22c55e";

        // ── DEBUG LOGS ──────────────────────────────────────────────────────
        console.group(`%c[GuidedBoard] Step ${idx} START`, "color: #4ade80; font-weight: bold;");
        console.log("Description:", step.description);
        console.log("Highlights:", step.highlight || "none", "| Color:", hColor);
        console.log("Arrow:", step.arrow || "none", "| Color:", aColor);
        console.log("FEN Before:", gameRef.current.fen());
        console.log("Audio Time:", new Date().toLocaleTimeString());
        console.groupEnd();
        // ────────────────────────────────────────────────────────────────────

        // Arrow
        if (step.arrow) {
            setArrows([[step.arrow[0], step.arrow[1], aColor]]);
        } else {
            setArrows([]);
        }

        // Square highlights
        if (step.highlight?.length) {
            const styles = {};
            step.highlight.forEach((sq) => {
                styles[sq] = {
                    backgroundColor: hColor,
                    borderRadius: "4px",
                };
            });
            setHighlights(styles);
        } else {
            setHighlights({});
        }
    }, [guided.steps]);

    // ── Phase 2: Execute move + clear visuals when voice ENDS ─────────────────
    const applyStepMove = useCallback((idx) => {
        const step = guided.steps[idx];
        if (!step) return;

        const fenBefore = gameRef.current.fen();

        // Execute piece move — reads step.promotion field (default "q")
        if (step.move) {
            try {
                gameRef.current.move({
                    from: step.move[0],
                    to: step.move[1],
                    promotion: step.promotion || "q",
                });
                const fenAfter = gameRef.current.fen();
                setPosition(fenAfter);

                // ── DEBUG LOGS ──────────────────────────────────────────────────
                console.group(`%c[GuidedBoard] Step ${idx} END → MOVE`, "color: #f97316; font-weight: bold;");
                console.log("Move executed:", step.move[0], "→", step.move[1]);
                console.log("FEN After:", fenAfter);
                console.log("Audio End Time:", new Date().toLocaleTimeString());
                console.groupEnd();
                // ───────────────────────────────────────────────────────────────
            } catch (e) {
                console.error(`%c[GuidedBoard] Step ${idx} INVALID MOVE`, "color: red; font-weight: bold;",
                    step.move[0], "→", step.move[1], "|", e.message);
            }
        } else {
            console.log(`%c[GuidedBoard] Step ${idx} END (No move)`, "color: #94a3b8;");
        }

        // Clear arrow and highlight — narration is done
        setArrows([]);
        setHighlights({});
    }, [guided.steps]);

    // ── Core audio player ──────────────────────────────────────────────────────
    // Accepts a callback `onEnd` that runs when audio/TTS finishes.
    // Board visuals should be applied INSIDE that callback.
    const playStepAudio = useCallback((stepData, onEnd) => {
        stopNarration();

        if (voiceMutedRef.current) {
            onEnd();
            return;
        }

        const audioPath = stepData?.audio;
        const textContent = stepData?.description;

        if (audioPath) {
            const audio = new Audio(audioPath);
            stepAudioRef.current = audio;
            audio.onended = onEnd;
            audio.onerror = () => {
                // Fallback to TTS when audio file is missing / 404
                if (textContent && "speechSynthesis" in window && !voiceMutedRef.current) {
                    const utt = new SpeechSynthesisUtterance(textContent);
                    utt.rate = 0.9;
                    utt.onend = onEnd;
                    utt.onerror = onEnd;
                    window.speechSynthesis.speak(utt);
                } else {
                    onEnd();
                }
            };
            audio.play().catch(onEnd);

        } else if (textContent && "speechSynthesis" in window) {
            const utt = new SpeechSynthesisUtterance(textContent);
            utt.rate = 0.9;
            utt.pitch = 1.0;
            utt.volume = 1.0;
            utt.onend = onEnd;
            utt.onerror = onEnd;
            window.speechSynthesis.speak(utt);

        } else {
            // No audio, no description — fire instantly
            onEnd();
        }
    }, [stopNarration]);

    // ── Auto-play chain ────────────────────────────────────────────────────────
    const playChain = useCallback(async (fromIdx, token) => {
        for (let i = fromIdx; i < totalSteps; i++) {
            if (cancelTokenRef.current !== token) return;

            // Wait if paused (don't advance to next step until resumed)
            while (phaseRef.current === "paused") {
                await new Promise((resolve) => setTimeout(resolve, 100));
                if (cancelTokenRef.current !== token) return;
            }

            const step = guided.steps[i];

            // 1. Mark step active in sidebar, clear previous visuals
            setCurrentStep(i);
            stepRef.current = i;
            setArrows([]);
            setHighlights({});

            // 2. Show arrow + highlight immediately as voice starts
            showStepVisuals(i);

            // 3. Play audio — when it ends, move piece + clear visuals
            await new Promise((resolve) => {
                playStepAudio(step, () => {
                    if (cancelTokenRef.current !== token) {
                        resolve();
                        return;
                    }
                    // Voice ended → execute move, clear arrow/highlight
                    applyStepMove(i);
                    resolve();
                });
            });

            if (cancelTokenRef.current !== token) return;
        }

        // ── 5 Second Delay Before completion ──
        await new Promise((resolve) => setTimeout(resolve, 5000));
        if (cancelTokenRef.current !== token) return;

        setPhase("complete");
        setControlsLocked(false);
    }, [totalSteps, guided.steps, playStepAudio, showStepVisuals, applyStepMove]);

    // ── Reset board ───────────────────────────────────────────────────────────
    const resetBoard = useCallback(() => {
        gameRef.current = new Chess(guided.initialFen);
        setPosition(guided.initialFen);
        setArrows([]);
        setHighlights({});
        setCurrentStep(-1);
        setControlsLocked(false);
        stepRef.current = -1;
    }, [guided.initialFen]);

    // ── Start lesson ──────────────────────────────────────────────────────────
    const handleStart = useCallback(async (mode = "auto") => {
        stopNarration();
        resetBoard();

        const isStepMode = mode === "step";
        setStepMode(isStepMode);
        stepModeRef.current = isStepMode;

        setPhase("playing");
        boardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

        const token = ++cancelTokenRef.current;

        // Play intro narration first
        if (guided.intro || guided.audio) {
            await new Promise((resolve) => {
                playStepAudio({ description: guided.intro, audio: guided.audio }, resolve);
            });
            if (cancelTokenRef.current !== token) return;
        }

        if (!isStepMode) {
            playChain(0, token);
        }
    }, [resetBoard, stopNarration, guided.intro, guided.audio, playStepAudio, playChain]);

    // ── Pause ─────────────────────────────────────────────────────────────────
    const handlePause = useCallback(() => {
        setPhase("paused");
        // Pause current audio/TTS without killing the loop promise
        if (stepAudioRef.current) {
            stepAudioRef.current.pause();
        }
        if ("speechSynthesis" in window && window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
        }
    }, []);

    // ── Resume ────────────────────────────────────────────────────────────────
    const handleResume = useCallback(() => {
        setPhase("playing");
        // Resume native playback — the playChain's pending promise will 
        // eventually resolve when narration truly ends.
        if (stepAudioRef.current) {
            stepAudioRef.current.play().catch(() => { });
        }
        if ("speechSynthesis" in window && window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
        }
    }, []);

    // ── Pre-calculate FEN for specific step (for backward navigation) ──────────
    const getFenForStep = useCallback((stepIdx) => {
        const tempGame = new Chess(guided.initialFen);
        for (let i = 0; i <= stepIdx; i++) {
            const s = guided.steps[i];
            if (s.move) {
                tempGame.move({
                    from: s.move[0],
                    to: s.move[1],
                    promotion: s.promotion || "q"
                });
            }
        }
        return tempGame.fen();
    }, [guided.initialFen, guided.steps]);

    // ── Previous Step (step mode) ─────────────────────────────────────────────
    const handlePrevStep = useCallback(async () => {
        const prev = stepRef.current - 1;
        if (prev < -1) return; // Already at the very start

        stopNarration();
        cancelTokenRef.current++; // Stop any ongoing playChain

        setPhase("playing");
        setControlsLocked(true);
        setCurrentStep(prev);
        stepRef.current = prev;

        // Reconstruct board state to THE START of this step
        // If prev is -1, it means we go back to the intro/initial state
        if (prev === -1) {
            gameRef.current = new Chess(guided.initialFen);
            setPosition(guided.initialFen);
        } else {
            // Reconstruct up to the move BEFORE this step (the state at which this step starts)
            const targetFen = prev > 0 ? getFenForStep(prev - 1) : guided.initialFen;
            gameRef.current = new Chess(targetFen);
            setPosition(targetFen);
        }

        // Clear previous visuals
        setArrows([]);
        setHighlights({});

        if (prev >= 0) {
            // Show visuals for the step we just moved back to
            showStepVisuals(prev);

            const step = guided.steps[prev];
            // Play audio for this step
            await new Promise((resolve) => {
                playStepAudio(step, () => {
                    // No automatic move on 'back' — let user see/hear the step start
                    // If we want it to move automatically after audio, we'd call applyStepMove(prev)
                    // But usually 'Back' means "I want to see/hear this step again"
                    setControlsLocked(false);
                    resolve();
                });
            });
        } else {
            // Back to intro
            setControlsLocked(false);
            if (guided.intro || guided.audio) {
                playStepAudio({ description: guided.intro, audio: guided.audio }, () => { });
            }
        }
    }, [guided.initialFen, guided.steps, guided.intro, guided.audio, stopNarration, getFenForStep, playStepAudio, showStepVisuals]);

    // ── Next Step (step mode) ─────────────────────────────────────────────────
    const handleNextStep = useCallback(async () => {
        const next = stepRef.current + 1;
        if (next >= totalSteps) return;

        setPhase("playing");
        setControlsLocked(true);
        setCurrentStep(next);
        stepRef.current = next;

        // 1. Clear previous visuals
        setArrows([]);
        setHighlights({});

        // 2. Show arrow + highlight as voice starts
        showStepVisuals(next);

        const step = guided.steps[next];

        // 3. Play audio → on end, move piece + clear visuals
        await new Promise((resolve) => {
            playStepAudio(step, () => {
                applyStepMove(next);
                resolve();
            });
        });

        if (next >= totalSteps - 1) {
            // ── 5 Second Delay Before completion ──
            await new Promise((resolve) => setTimeout(resolve, 5000));
            // Check if user hasn't switched away or reset during the wait
            if (stepRef.current === next && phaseRef.current === "playing") {
                setPhase("complete");
            }
        }
        setControlsLocked(false);
    }, [totalSteps, guided.steps, showStepVisuals, playStepAudio, applyStepMove]);

    // ── Replay ────────────────────────────────────────────────────────────────
    const handleReplay = useCallback(() => {
        cancelTokenRef.current++;
        stopNarration();
        gameRef.current = new Chess(guided.initialFen);
        setPosition(guided.initialFen);
        setArrows([]);
        setHighlights({});
        setCurrentStep(-1);
        setControlsLocked(false);
        stepRef.current = -1;
        setPhase("idle");
        // Microtask: let React flush the reset before starting
        Promise.resolve().then(() => handleStart());
    }, [stopNarration, guided.initialFen, handleStart]);

    // ── Mute toggle ───────────────────────────────────────────────────────────
    const handleToggleMute = useCallback(() => {
        setVoiceMuted((prev) => {
            const next = !prev;
            voiceMutedRef.current = next;
            if (next) stopNarration();
            return next;
        });
    }, [stopNarration]);

    // ── Derived ───────────────────────────────────────────────────────────────
    const isIdle = phase === "idle";
    const isPlaying = phase === "playing";
    const isPaused = phase === "paused";
    const isComplete = phase === "complete";

    const currentDesc = currentStep >= 0
        ? guided.steps[currentStep]?.description
        : guided.intro;

    const pct = totalSteps > 0
        ? Math.round(((currentStep + 1) / totalSteps) * 100)
        : 0;

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div className="guided-layout" ref={boardRef}>

            {/* ── LEFT: Board ──────────────────────────────────────── */}
            <div className="guided-board-col">

                <div className="guided-board-shell-container">
                    <div className="guided-board-shell">
                        <Chessboard
                            position={position}
                            areDraggablePieces={false}
                            customArrows={arrows}
                            customSquareStyles={highlights}
                            animationDuration={300}
                            customBoardStyle={{
                                borderRadius: "12px",
                                boxShadow: "0 24px 72px rgba(0,0,0,0.55)",
                            }}
                            customDarkSquareStyle={{ backgroundColor: "#3d2c8c" }}
                            customLightSquareStyle={{ backgroundColor: "#c8b9f5" }}
                        />

                        {/* ── START OVERLAY ── */}
                        {(isIdle || isComplete) && (
                            <div className="guided-board-overlay">
                                <div className="overlay-content">
                                    <h3 className="overlay-title">
                                        {isComplete ? "Lesson Complete" : "Master This Pattern"}
                                    </h3>
                                    <p className="overlay-subtitle">
                                        {isComplete
                                            ? "Rewatch or practice step-by-step"
                                            : "Choose how you want to learn"}
                                    </p>
                                    <div className="overlay-actions">
                                        {onReadTheory && (
                                            <button
                                                className="overlay-btn overlay-btn-secondary"
                                                onClick={onReadTheory}
                                            >
                                                <span className="btn-icon">📖</span>
                                                <div className="btn-text">
                                                    <strong>Read Theory</strong>
                                                    <span>Review the concepts</span>
                                                </div>
                                            </button>
                                        )}
                                        <button
                                            className="overlay-btn overlay-btn-primary"
                                            onClick={() => handleStart("auto")}
                                        >
                                            <span className="btn-icon">▶</span>
                                            <div className="btn-text">
                                                <strong>Auto Mode</strong>
                                                <span>Full cinematic walkthrough</span>
                                            </div>
                                        </button>
                                        <button
                                            className="overlay-btn overlay-btn-secondary"
                                            onClick={() => handleStart("step")}
                                        >
                                            <span className="btn-icon">👆</span>
                                            <div className="btn-text">
                                                <strong>Step Mode</strong>
                                                <span>Learn at your own pace</span>
                                            </div>
                                        </button>
                                        {isComplete && onStartPuzzles && (
                                            <button
                                                className="overlay-btn overlay-btn-accent"
                                                onClick={onStartPuzzles}
                                                style={{ background: accent || "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" }}
                                            >
                                                <span className="btn-icon">⚡</span>
                                                <div className="btn-text">
                                                    <strong>Start Puzzles</strong>
                                                    <span>Test your knowledge</span>
                                                </div>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── VERTICAL SIDEBAR CONTROLS ── */}
                    {(isPlaying || isPaused) && (
                        <div className="guided-sidebar-controls">
                            {isPlaying ? (
                                <button
                                    className="sidebar-btn sidebar-btn-pause"
                                    onClick={handlePause}
                                    disabled={isPlaying && controlsLocked && !stepMode}
                                >
                                    ⏸
                                </button>
                            ) : (
                                <button
                                    className="sidebar-btn sidebar-btn-resume"
                                    style={{ background: accent }}
                                    onClick={handleResume}
                                >
                                    ▶
                                </button>
                            )}

                            <button
                                className={`sidebar-btn sidebar-btn-mode ${stepMode ? "active" : ""}`}
                                onClick={() => {
                                    if (isPlaying || isPaused) {
                                        cancelTokenRef.current++;
                                        stopNarration();
                                        setPhase("paused");
                                    }
                                    setStepMode((s) => !s);
                                }}
                                disabled={controlsLocked}
                            >
                                🔄
                            </button>

                            {stepMode && (
                                <>
                                    <button
                                        className="sidebar-btn sidebar-btn-prev"
                                        onClick={handlePrevStep}
                                        disabled={controlsLocked || currentStep < 0}
                                    >
                                        ←
                                    </button>
                                    <button
                                        className="sidebar-btn sidebar-btn-next"
                                        onClick={handleNextStep}
                                        disabled={controlsLocked || currentStep >= totalSteps - 1}
                                    >
                                        →
                                    </button>
                                </>
                            )}

                            <button
                                className="sidebar-btn sidebar-btn-mute"
                                onClick={handleToggleMute}
                            >
                                {voiceMuted ? "🔇" : "🔊"}
                            </button>

                            <div className="sidebar-spacer" />

                            <button
                                className="sidebar-btn sidebar-btn-exit"
                                onClick={() => setPhase("idle")}
                            >
                                ↺
                            </button>
                        </div>
                    )}
                </div>

            </div>

            {/* ── RIGHT: Narration + Steps ──────────────────────────── */}
            <div className="guided-text-col">

                <div className={`guided-narration-card ${!isIdle ? "visible" : ""}`}>
                    {isIdle ? (
                        <>
                            <div className="guided-intro-icon">🎬</div>
                            <h3 className="guided-title">{guided.title}</h3>
                            <p className="guided-intro-text">
                                {guided.intro ||
                                    "Click \"Start Lesson\" to begin the interactive board demonstration."}
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="guided-narration-label">
                                {isComplete ? "✅ Lesson complete!" : "💬 Narration"}
                            </div>
                            <p className="guided-narration-text">
                                {isComplete
                                    ? "You've watched the full demonstration. Click Replay to watch again, or move to Puzzles to practice."
                                    : currentDesc || "Watch the board..."}
                            </p>
                        </>
                    )}
                </div>

                {/* ── Progress ── */}
                {!isIdle && (
                    <div className="guided-progress">
                        <div className="guided-progress-track">
                            <div
                                className="guided-progress-fill"
                                style={{
                                    width: `${pct}%`,
                                    background: accent || "linear-gradient(90deg,#4f46e5,#7c3aed)",
                                }}
                            />
                        </div>
                        <span className="guided-step-count">
                            {isComplete
                                ? "✓ Complete"
                                : `Step ${Math.max(currentStep + 1, 0)} / ${totalSteps}`}
                        </span>
                    </div>
                )}

                <div className="guided-steps-scroll-area">
                    <div className="guided-steps-list">
                        {guided.steps.map((step, i) => {
                            const state =
                                i < currentStep ? "done"
                                    : i === currentStep ? "active"
                                        : "upcoming";
                            return (
                                <div key={i} className={`guided-step-item guided-step-${state}`}>
                                    <div className="guided-step-dot">
                                        {state === "done" ? "✓" : i + 1}
                                    </div>
                                    <div className="guided-step-item-body">
                                        <span className="guided-step-item-text">
                                            {step.description || `Step ${i + 1}`}
                                        </span>
                                        {step.move && state === "upcoming" && (
                                            <span className="guided-step-move-hint">
                                                {step.move[0]} → {step.move[1]}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
