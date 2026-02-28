// src/components/AdvancedChessBoard.jsx
import React, { useEffect, useState, useMemo, useRef } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

/* classification icons */
import brilliantPng from "../assets/icons/classification/brilliant.png";
import greatPng from "../assets/icons/classification/great.png";
import bestPng from "../assets/icons/classification/best.png";
import excellentPng from "../assets/icons/classification/excellent.png";
import goodPng from "../assets/icons/classification/good.png";
import inaccuracyPng from "../assets/icons/classification/inaccuracy.png";
import missPng from "../assets/icons/classification/miss.png";
import mistakePng from "../assets/icons/classification/mistake.png";
import blunderPng from "../assets/icons/classification/blunder.png";

/* exact label-text colors */
const CLASS_META = {
  brilliant: { color: "#1cada6", icon: brilliantPng },
  great: { color: "#5b8baf", icon: greatPng },
  best: { color: "#96bc4b", icon: bestPng },
  excellent: { color: "#96bc4b", icon: excellentPng },
  good: { color: "#95af8a", icon: goodPng },
  inaccuracy: { color: "#f7bf44", icon: inaccuracyPng },
  miss: { color: "#ee6c56", icon: missPng },
  mistake: { color: "#e58f2a", icon: mistakePng },
  blunder: { color: "#ca3531", icon: blunderPng },
  default: { color: "#95af8a", icon: goodPng },
};

export default function AdvancedChessBoard({
  pgn,
  onCaptureUpdate,
  moveClassifications = [],
  onMoveChange, // <-- NEW prop
  externalMoveIndex,
}) {
  const [position, setPosition] = useState("start");
  const [moves, setMoves] = useState([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [boardOrientation, setBoardOrientation] = useState("white");
  const [highlightSquares, setHighlightSquares] = useState({});
  const [arrowSquares, setArrowSquares] = useState([]);
  const [arrowColor, setArrowColor] = useState("rgba(34,197,94,0.9)");
  const [iconSquare, setIconSquare] = useState(null);
  const [iconImage, setIconImage] = useState(null);
  const [previewMove, setPreviewMove] = useState(null);

  // responsive width
  const containerRef = useRef(null);
  const [boardWidth, setBoardWidth] = useState(560); // default desktop width

  useEffect(() => {
    if (!pgn) return;

    const chess = new Chess();
    chess.loadPgn(pgn);

    const history = chess.history({ verbose: true });
    setMoves(history);

    chess.reset();
    setPosition("start");
    setCurrentMoveIndex(0);
    setHighlightSquares({});
    setIconSquare(null);

    // notify parent that we're reset to start
   // if (typeof onMoveChange === "function") onMoveChange(0);
  }, [pgn]); // eslint-disable-line

  // 🔥 React when parent changes move index (MoveList click)
  useEffect(() => {
    if (
      typeof externalMoveIndex === "number" &&
      externalMoveIndex !== currentMoveIndex
    ) {
      goToMove(externalMoveIndex);
    }
  }, [externalMoveIndex]); // eslint-disable-line

  // ResizeObserver to compute container width and adapt the chessboard
  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;

   const compute = (w) => {
  if (window.innerWidth >= 1025) {
    setBoardWidth(560); // desktop fixed
  } else {
    setBoardWidth(w);   // mobile full width
  }
};

    compute(target.clientWidth);

    let ro = null;
    try {
      ro = new ResizeObserver((entries) => {
        if (!entries || !entries.length) return;
        const w = entries[0].contentRect.width;
        compute(w);
      });
      ro.observe(target);
    } catch (err) {
      // Fallback to window resize
      const handler = () => compute(target.clientWidth);
      window.addEventListener("resize", handler);
      return () => window.removeEventListener("resize", handler);
    }

    return () => ro && ro.disconnect();
  }, []);

  const goToMove = (index, orientation = boardOrientation) => {
    setPreviewMove(null);
    const chess = new Chess();
    const whiteCaptured = [];
    const blackCaptured = [];

    for (let i = 0; i < index; i++) {
      const move = chess.move(moves[i]);
      if (move?.captured) {
        if (move.color === "w") whiteCaptured.push(move.captured);
        else blackCaptured.push(move.captured);
      }
    }

    setPosition(chess.fen());
    setCurrentMoveIndex(index);

    // notify parent about index change
    if (typeof onMoveChange === "function") onMoveChange(index);

    onCaptureUpdate && onCaptureUpdate(whiteCaptured, blackCaptured, orientation);

    const newHighlights = {};
    let iconSq = null;
    let iconImg = null;

    if (index > 0 && moves[index - 1]) {
      const last = moves[index - 1];
      const classification =
        moveClassifications[index - 1]?.classificationName;

      const meta = CLASS_META[classification] || CLASS_META.default;

      newHighlights[last.from] = {
        backgroundColor: meta.color + "55",
      };

      newHighlights[last.to] = {
        backgroundColor: meta.color + "77",
      };

      iconSq = last.to;
      iconImg = meta.icon;
    }

    setHighlightSquares(newHighlights);
    setIconSquare(iconSq);
    setIconImage(iconImg);

    // ===============================
    // BEST MOVE / MISSED MATE ARROW
    // ===============================
    let arrows = [];
    let color = "rgba(34,197,94,0.9)"; // default green

    if (index > 0 && moveClassifications[index - 1]) {
      const moveData = moveClassifications[index - 1];

      if (moveData.bestMove) {
        const bestFrom = moveData.bestMove.substring(0, 2);
        const bestTo = moveData.bestMove.substring(2, 4);

        const missedMate =
          moveData.mateBefore !== null &&
          moveData.mateBefore !== undefined &&
          Math.abs(moveData.mateBefore) <= 6 &&
          moveData.uci !== moveData.bestMove;

        if (moveData.uci !== moveData.bestMove) {
          arrows.push([bestFrom, bestTo]);

          // 🔴 RED IF MISSED MATE
          if (missedMate) {
            color = "rgba(220,38,38,1)"; // strong red
          }
        }
      }
    }

    setArrowSquares(arrows);
    setArrowColor(color);
  };

  useEffect(() => {
    const handleControl = (e) => {
      setPreviewMove(null);
      const action = e.detail.action;

      if (action === "start") goToMove(0);
      if (action === "prev" && currentMoveIndex > 0)
        goToMove(currentMoveIndex - 1);
      if (action === "next" && currentMoveIndex < moves.length)
        goToMove(currentMoveIndex + 1);
      if (action === "end") goToMove(moves.length);

      if (action === "flip") {
        const newOrientation =
          boardOrientation === "white" ? "black" : "white";
        setBoardOrientation(newOrientation);
        goToMove(currentMoveIndex, newOrientation);
      }
    };

    const handleGoToMove = (e) => {
      const index = e.detail.index;
      if (index >= 0 && index <= moves.length) {
        goToMove(index);
      }
    };

    const handleGoToFen = (e) => {
      const { fen, move } = e.detail;
      if (!fen) return;

      setPosition(fen); // 🔥 Just trust the computed fen

      setHighlightSquares({});
      setArrowSquares([]);

      if (move) {
        const from = move.substring(0, 2);
        const to = move.substring(2, 4);

        setHighlightSquares({
          [from]: { backgroundColor: "rgba(124,58,237,0.4)" },
          [to]: { backgroundColor: "rgba(124,58,237,0.6)" },
        });

        setIconSquare(to);
        setIconImage(CLASS_META.best.icon);
      } else {
        setIconSquare(null);
        setIconImage(null);
      }
    };

    window.addEventListener("control-action", handleControl);
    window.addEventListener("go-to-move", handleGoToMove);
    window.addEventListener("go-to-fen", handleGoToFen);

    return () => {
      window.removeEventListener("control-action", handleControl);
      window.removeEventListener("go-to-move", handleGoToMove);
      window.removeEventListener("go-to-fen", handleGoToFen);
    };
  }, [currentMoveIndex, moves, boardOrientation, moveClassifications]); // eslint-disable-line

  const customSquareStyles = useMemo(() => highlightSquares, [highlightSquares]);

  return (
    // containerRef used to measure available width
    <div
  ref={containerRef}
  style={{
    width: "100%",
    maxWidth: window.innerWidth >= 1025 ? 560 : "100%",
    position: "relative",
  }}
>
      <Chessboard
        position={position}
        boardOrientation={boardOrientation}
        arePiecesDraggable={false}
        customSquareStyles={customSquareStyles}
        customArrows={arrowSquares}
        customArrowColor={arrowColor}
        boardWidth={boardWidth}
        boardStyle={{
          borderRadius: 12,
          boxShadow: "0 8px 30px rgba(2,6,23,0.45)",
          overflow: "hidden",
        }}
      />

      {/* ICON OVERLAY */}
      {iconSquare && iconImage && (() => {
        const file = iconSquare.charCodeAt(0) - 97;   // a=0
        const rank = parseInt(iconSquare[1], 10) - 1; // 0-7

        const isWhite = boardOrientation === "white";

        const leftPercent = isWhite
          ? file * 12.5
          : (7 - file) * 12.5;

        const topPercent = isWhite
          ? (7 - rank) * 12.5
          : rank * 12.5;

        return (
          <div
            style={{
              position: "absolute",
              pointerEvents: "none",
              width: "12.5%",
              height: "12.5%",
              top: `${topPercent}%`,
              left: `${leftPercent}%`,
              zIndex: 100,
            }}
          >
            <img
              src={iconImage}
              alt=""
              style={{
                position: "absolute",
                top: 3,
                right: 3,
                width: "40%",
                height: "40%",
                filter: "drop-shadow(0 0 4px rgba(0,0,0,0.6))",
                transform: "scale(1.05)",
              }}
            />
          </div>
        );
      })()}
    </div>
  );
}