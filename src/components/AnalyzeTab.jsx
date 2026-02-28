// src/components/AnalyzeTab.jsx
import React from "react";
import "../styles/analyze.css";
import { Chess } from "chess.js";

import wp from "../assets/pieces/wp.svg";
import wn from "../assets/pieces/wn.svg";
import wb from "../assets/pieces/wb.svg";
import wr from "../assets/pieces/wr.svg";
import wq from "../assets/pieces/wq.svg";

import bp from "../assets/pieces/bp.svg";
import bn from "../assets/pieces/bn.svg";
import bb from "../assets/pieces/bb.svg";
import br from "../assets/pieces/br.svg";
import bq from "../assets/pieces/bq.svg";

function formatEval(evalValue) {
  if (evalValue === null || evalValue === undefined) return "+0.00";
  const val = (evalValue / 100).toFixed(2);
  return val > 0 ? `+${val}` : val;
}

function getPieceSvg(piece, side) {
  const map = {
    p: side === "white" ? wp : bp,
    n: side === "white" ? wn : bn,
    b: side === "white" ? wb : bb,
    r: side === "white" ? wr : br,
    q: side === "white" ? wq : bq,
  };
  return map[piece?.toLowerCase()] || (side === "white" ? wp : bp);
}

function MoveCard({
  icon,
  title,
  evalText,
  classification,
  accuracy,
  highlight,
  continuation,
  activePly,
  isBestCard = false,
  isOpen = false,
  onToggle = () => {},
  shrink = false,
}) {
  // Controlled open state: isOpen, onToggle, shrink are provided by parent

  const goTo = (i) => {
    if (!continuation || continuation.length === 0) return;

    const chess = new Chess();

    const pgn = localStorage.getItem("gamePgn");
    if (pgn) {
      try {
        chess.loadPgn(pgn);
      } catch {
        chess.reset();
      }
    }

    const history = chess.history({ verbose: true });
    chess.reset();

    // Correct base position
    const basePly = isBestCard ? activePly - 1 : activePly;

    for (let j = 0; j < basePly; j++) {
      chess.move(history[j]);
    }

    // Apply continuation sequentially
    for (let k = 0; k <= i; k++) {
      const mv = continuation[k];
      if (!mv) break;

      const result = chess.move({
        from: mv.substring(0, 2),
        to: mv.substring(2, 4),
        promotion: mv.length > 4 ? mv[4] : undefined,
      });

      if (!result) {
        console.warn("Illegal engine move:", mv);
        break;
      }
    }

    window.ignoreBoardSync = true;

    window.dispatchEvent(
      new CustomEvent("go-to-fen", {
        detail: {
          fen: chess.fen(),
          move: continuation[i],
        },
      })
    );

    setTimeout(() => {
      window.ignoreBoardSync = false;
    }, 200);
  };

  return (
    <div
      className={`an-card ${highlight ? "highlight" : ""} ${
        isOpen ? "expanded" : ""
      } ${shrink ? "shrink" : ""}`}
    >
      <div className="an-row">
        <div className="an-inline">
  <div className="an-icon mobile-hide">
    {icon && <img src={icon} alt="" className="an-piece-img" />}
  </div>

  <span className="an-title">{title}</span>

  {evalText && (
    <span className="an-eval mobile-hide">
      {evalText}
    </span>
  )}

          {classification && (
            <span className={`label-text ${classification}`}>
              is {classification}
            </span>
          )}

          {continuation?.length > 0 && (
            <span className="an-inline-cont">
              {continuation.slice(0, 3).map((m, i) => (
                <span
                  key={i}
                  className="cont-move clickable"
                  onClick={() => goTo(i)}
                >
                  {m}
                </span>
              ))}
            </span>
          )}
        </div>

        <div className="an-right">
          {accuracy && <span className="an-accuracy">{accuracy}%</span>}
          <span
            className={`expand-btn ${isOpen ? "open" : ""}`}
            onClick={onToggle}
          >
            ⌄
          </span>
        </div>
      </div>

      {isOpen && continuation && (
        <div className="an-continuation">
          {continuation.map((m, i) => (
            <span
              key={i}
              className="cont-move clickable"
              onClick={() => goTo(i)}
            >
              {m}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function MissedMateCard({ mateIn, continuation, moveData }) {
  const [open, setOpen] = React.useState(false);

  const goTo = (i) => {
    if (!continuation || continuation.length === 0) return;

    // Use the exact FEN the engine analyzed (stored in moveData)
    const startFen = moveData?.fenBefore || undefined;
    const chess = startFen ? new Chess(startFen) : new Chess();

    for (let k = 0; k <= i; k++) {
      const mv = continuation[k];
      if (!mv) break;

      const result = chess.move({
        from: mv.substring(0, 2),
        to: mv.substring(2, 4),
        promotion: mv.length > 4 ? mv[4] : undefined,
      });

      if (!result) break;
    }

    window.ignoreBoardSync = true;

    window.dispatchEvent(
      new CustomEvent("go-to-fen", {
        detail: {
          fen: chess.fen(),
          move: continuation[i],
        },
      })
    );

    setTimeout(() => {
      window.ignoreBoardSync = false;
    }, 200);
  };

  return (
    <div className="missed-mate-card">
      <div className="mm-top">
        <div className="mm-left">
          <div className="mm-fire">🔥</div>
          <div>
            <div className="mm-title">Missed Checkmate in {mateIn}</div>
            <div className="mm-sub">A forced mate was available</div>
          </div>
        </div>

        <div
          className={`expand-btn ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
        >
          ⌄
        </div>
      </div>

      <div className="mm-line">
        {continuation.slice(0, 4).map((m, i) => (
          <span
            key={i}
            className="mm-move cont-move clickable"
            onClick={() => goTo(i)}
          >
            {m}
          </span>
        ))}
      </div>

      {open && (
        <div className="mm-full-line">
          {continuation.map((m, i) => (
            <span
              key={i}
              className="mm-move cont-move clickable"
              onClick={() => goTo(i)}
            >
              {m}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AnalyzeTab({
  moveClassifications = [],
  activePly = 0,
  deepAnalysis,
}) {
  // Controlled "which card is open" state (null = none)
  const [openCard, setOpenCard] = React.useState(null);

  if (!moveClassifications.length) return null;

  if (activePly === 0) {
    const suggestions =
      deepAnalysis?.alternatives?.slice(0, 3).map((m) => m.uci) || [
        "e2e4",
        "d2d4",
        "c2c4",
      ];

    return (
      <div className="an-root">
        {suggestions.map((move, i) => (
          <MoveCard
            key={i}
            icon={wp}
            title={move}
            continuation={suggestions}
            activePly={0}
            isOpen={openCard === `start-${i}`}
            onToggle={() =>
              setOpenCard(openCard === `start-${i}` ? null : `start-${i}`)
            }
            shrink={openCard !== null && openCard !== `start-${i}`}
          />
        ))}
      </div>
    );
  }

  const moveData = moveClassifications[activePly - 1];
  if (!moveData) return null;

  const cards = [];

  const { from, to, classificationName, accuracy } = moveData;

  const playedMove = `${from} → ${to}`;
  const mateLine = moveData.mateLine || [];

  // Played card (always first)
  cards.push(
    <MoveCard
      key="played"
      icon={getPieceSvg(moveData.piece, moveData.side)}
      title={playedMove}
      evalText={formatEval(moveData.raw?.evalAfter)}
      classification={classificationName}
      accuracy={accuracy}
      highlight
      continuation={mateLine}
      activePly={activePly}
      isOpen={openCard === "played"}
      onToggle={() => setOpenCard(openCard === "played" ? null : "played")}
      shrink={openCard !== null && openCard !== "played"}
    />
  );

  // Set up current board to determine engine side and piece icons
  const chess = new Chess();
  const pgn = localStorage.getItem("gamePgn");

  if (pgn) chess.loadPgn(pgn);

  const history = chess.history({ verbose: true });
  chess.reset();

  for (let j = 0; j < activePly; j++) {
    chess.move(history[j]);
  }

  const engineSide = chess.turn() === "w" ? "white" : "black";
  const isMissedMate =
    moveData.mateBefore !== null &&
    Math.abs(moveData.mateBefore) <= 6 &&
    moveData.bestMove !== moveData.uci;

  if (isMissedMate) {
    const mateIn = Math.abs(moveData.mateBefore);

    const mateLineStable = moveData.mateLine || [];

    cards.push(
      <MissedMateCard
        key="missed-mate"
        mateIn={mateIn}
        continuation={mateLineStable}
        moveData={moveData}
      />
    );
  } else {
    const alternatives = deepAnalysis?.alternatives?.slice(0, 3) || [];

    alternatives.forEach((alt, i) => {
      const chessForPiece = new Chess();
      const pgn2 = localStorage.getItem("gamePgn");
      if (pgn2) chessForPiece.loadPgn(pgn2);

      const history2 = chessForPiece.history({ verbose: true });
      chessForPiece.reset();

      for (let j = 0; j < activePly; j++) {
        chessForPiece.move(history2[j]);
      }

      const fromSq = alt.uci.substring(0, 2);
      const pieceObj = chessForPiece.get(fromSq);
      const pieceType = pieceObj?.type || "p";

      cards.push(
        <MoveCard
          key={`engine-${i}`}
          icon={getPieceSvg(pieceType, engineSide)}
          title={alt.uci}
          evalText={i === 0 ? "Best Move" : formatEval(alt.score)}
          continuation={alt.continuation}
          activePly={activePly}
          isOpen={openCard === `engine-${i}`}
          onToggle={() =>
            setOpenCard(openCard === `engine-${i}` ? null : `engine-${i}`)
          }
          shrink={openCard !== null && openCard !== `engine-${i}`}
        />
      );
    });
  }

  return <div className="an-root">{cards}</div>;
}