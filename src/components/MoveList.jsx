import React, { useEffect, useMemo, useRef } from "react";
import "../styles/movelist.css";

/* --- Piece SVG Imports --- */
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

/* --- Classification PNG Imports (500x500) --- */
import brilliantPng from "../assets/icons/classification/brilliant.png";
import greatPng from "../assets/icons/classification/great.png";
import bestPng from "../assets/icons/classification/best.png";
import excellentPng from "../assets/icons/classification/excellent.png";
import goodPng from "../assets/icons/classification/good.png";
import inaccuracyPng from "../assets/icons/classification/inaccuracy.png";
import missPng from "../assets/icons/classification/miss.png";
import mistakePng from "../assets/icons/classification/mistake.png";
import blunderPng from "../assets/icons/classification/blunder.png";

const pieceMap = {
  w: { p: wp, n: wn, b: wb, r: wr, q: wq },
  b: { p: bp, n: bn, b: bb, r: br, q: bq },
};

const classificationIcons = {
  brilliant: brilliantPng,
  great: greatPng,
  best: bestPng,
  excellent: excellentPng,
  good: goodPng,
  inaccuracy: inaccuracyPng,
  mistake: mistakePng,
  miss: missPng,
  blunder: blunderPng,
};

export default function MoveList({
  moveClassifications = [],
  currentPly = 0,
  onGoToMove,
}) {
  const containerRef = useRef();

  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < moveClassifications.length; i += 2) {
      result.push({
        moveNumber: Math.floor(i / 2) + 1,
        white: moveClassifications[i] || null,
        black: moveClassifications[i + 1] || null,
      });
    }
    return result;
  }, [moveClassifications]);

  useEffect(() => {
    const el = containerRef.current?.querySelector(
      `[data-ply="${currentPly}"]`
    );
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [currentPly]);

  function renderCell(move) {
    if (!move) return <div className="move-cell empty">—</div>;

    const isActive = currentPly === move.moveIndex;
    const pieceImg =
      pieceMap[move.side?.[0]]?.[move.piece] || null;

    const classIcon =
      classificationIcons[move.classificationName];

    return (
      <div
        className={`move-cell ${isActive ? "active" : ""}`}
        data-ply={move.moveIndex}
        onClick={() => onGoToMove(move.moveIndex)}
      >
        <div className="move-left">
          {pieceImg && (
            <img
              src={pieceImg}
              alt=""
              className="move-piece-icon"
            />
          )}
          <span className="move-san">
            {move.san || `${move.from}${move.to}`}
          </span>
        </div>

        <div className="move-right">
          {classIcon && (
            <img
              src={classIcon}
              alt=""
              className="classification-icon-img"
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="move-list-root">
      <div className="move-list-header">
        <div>#</div>
        <div>White</div>
        <div>Black</div>
      </div>

      <div className="move-list-body" ref={containerRef}>
        {rows.map((row) => (
          <div key={row.moveNumber} className="move-row-wrapper">
            <div className="move-number">
              {row.moveNumber}.
            </div>

            {renderCell(row.white)}
            {renderCell(row.black)}
          </div>
        ))}
      </div>
    </div>
  );
}