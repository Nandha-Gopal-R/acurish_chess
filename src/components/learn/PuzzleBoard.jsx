import { useState, useCallback } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

export default function PuzzleBoard({ puzzle, onSolve, status, setStatus }) {
    const [game, setGame] = useState(new Chess(puzzle.fen));
    const [attempts, setAttempts] = useState(0);
    const [showHint, setShowHint] = useState(false);

    // Lock orientation to the initial move side
    const boardOrientation = puzzle.fen.split(" ")[1] === "w" ? "white" : "black";

    const resetPuzzle = useCallback(() => {
        setGame(new Chess(puzzle.fen));
        setStatus("idle");
        setAttempts(0);
        setShowHint(false);
    }, [puzzle.fen, setStatus]);

    function onDrop(sourceSquare, targetSquare, piece) {
        console.log(`[PuzzleBoard] onDrop: ${sourceSquare} -> ${targetSquare} (${piece})`);

        // Block moves if already correct or in "wrong" cooldown
        if (status === "correct" || status === "wrong") {
            return false;
        }

        const gameCopy = new Chess(game.fen());
        let move = null;

        try {
            // Only suggest promotion if it's a pawn reaching the end
            const isPawn = piece[1]?.toLowerCase() === "p";
            const isPromotion = isPawn && (targetSquare[1] === "8" || targetSquare[1] === "1");

            move = gameCopy.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: isPromotion ? "q" : undefined,
            });
        } catch (err) {
            console.warn("[PuzzleBoard] Move error:", err);
            return false;
        }

        if (!move) {
            return false;
        }

        setAttempts((a) => a + 1);
        setGame(gameCopy);

        if (gameCopy.isCheckmate()) {
            setStatus("correct");
            if (onSolve) onSolve();
            return true;
        } else {
            setStatus("wrong");
            // Hold the "wrong" state briefly so user can see their move, then snap back
            setTimeout(() => {
                setGame(new Chess(puzzle.fen));
                setStatus("idle");
            }, 1000);
            return true;
        }
    }

    return (
        <div className="puzzle-board-wrapper">
            <div className={`puzzle-board-inner ${status}`}>
                <Chessboard
                    position={game.fen()}
                    onPieceDrop={onDrop}
                    boardOrientation={boardOrientation}
                    areDraggablePieces={status !== "correct"}
                    customBoardStyle={{
                        borderRadius: "10px",
                        boxShadow: status === "correct"
                            ? "0 0 0 3px #10b981, 0 20px 60px rgba(16,185,129,0.2)"
                            : status === "wrong"
                                ? "0 0 0 3px #ef4444, 0 20px 60px rgba(239,68,68,0.2)"
                                : "0 20px 60px rgba(0,0,0,0.4)",
                        transition: "box-shadow 0.3s ease",
                    }}
                    customDarkSquareStyle={{ backgroundColor: "#3d2c8c" }}
                    customLightSquareStyle={{ backgroundColor: "#c8b9f5" }}
                />
            </div>



            <div className="puzzle-feedback" style={{ width: '100%', maxWidth: '480px', marginBottom: '12px' }}>
                {status === "correct" && (
                    <div className="feedback-correct">
                        <span>✅</span>
                        <span>Checkmate!</span>
                    </div>
                )}
                {status === "wrong" && (
                    <div className="feedback-wrong">
                        <span>❌</span>
                        <span>Not quite</span>
                    </div>
                )}
                {status === "idle" && (
                    <div className="feedback-idle">
                        <span>⚡</span>
                        <span>Find the checkmate move — {puzzle.fen.split(" ")[1] === "w" ? "White" : "Black"} to play</span>
                    </div>
                )}
            </div>

            <div className="puzzle-actions">
                {puzzle.hint && (
                    <button className="hint-btn" onClick={() => setShowHint(!showHint)}>
                        {showHint ? "Hide Hint" : "💡 Show Hint"}
                    </button>
                )}
                <button className="reset-btn" onClick={resetPuzzle}>
                    ↺ Reset
                </button>
            </div>

            {showHint && puzzle.hint && (
                <div className="hint-box">
                    <span>💡</span>
                    <span>{puzzle.hint}</span>
                </div>
            )}
        </div>
    );
}
