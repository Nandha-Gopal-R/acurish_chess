import React from "react";
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

const pieceValues = { p: 1, n: 3, b: 3, r: 5, q: 9 };
const pieceOrder = ["p", "n", "b", "r", "q"];

const pieceMap = {
  p: { white: wp, black: bp },
  n: { white: wn, black: bn },
  b: { white: wb, black: bb },
  r: { white: wr, black: br },
  q: { white: wq, black: bq },
};

function group(pieces) {
  const grouped = {};
  pieceOrder.forEach((p) => (grouped[p] = 0));
  pieces.forEach((p) => grouped[p.toLowerCase()]++);
  return grouped;
}

function material(pieces) {
  return pieces.reduce((s, p) => s + pieceValues[p], 0);
}

export default function CaptureBox({
  whiteCaptured = [],
  blackCaptured = [],
  boardOrientation = "white",
}) {
  const leftIsWhite = boardOrientation === "white";

  const leftPieces = leftIsWhite ? whiteCaptured : blackCaptured;
  const rightPieces = leftIsWhite ? blackCaptured : whiteCaptured;

  const leftColor = leftIsWhite ? "white" : "black";
  const rightColor = leftIsWhite ? "black" : "white";

  const leftGrouped = group(leftPieces);
  const rightGrouped = group(rightPieces);

  const diff = material(whiteCaptured) - material(blackCaptured);

  const leftDiff =
    diff > 0 && leftIsWhite
      ? `+${diff}`
      : diff < 0 && !leftIsWhite
      ? `+${Math.abs(diff)}`
      : null;

  const rightDiff =
    diff > 0 && !leftIsWhite
      ? `+${diff}`
      : diff < 0 && leftIsWhite
      ? `+${Math.abs(diff)}`
      : null;

  return (
    <div className="capture-container">
      {/* LEFT SIDE */}
      <div className="capture-side left">
        <div className="pile left-pile">
  {pieceOrder.map((type) =>
    leftGrouped[type] > 0 && (
      <div key={type} className="piece-group">
        {[...Array(leftGrouped[type])].map((_, i) => (
          <img
            key={type + i}
            src={pieceMap[type][leftColor]}
            className="piece"
            alt=""
          />
        ))}
      </div>
    )
  )}
</div>

        {leftDiff && <span className="material">{leftDiff}</span>}
      </div>

      {/* RIGHT SIDE */}
      <div className="capture-side right">
        {rightDiff && <span className="material">{rightDiff}</span>}
        <div className="pile right-pile">
  {pieceOrder.map((type) =>
    rightGrouped[type] > 0 && (
      <div key={type} className="piece-group">
        {[...Array(rightGrouped[type])].map((_, i) => (
          <img
            key={type + i}
            src={pieceMap[type][rightColor]}
            className="piece"
            alt=""
          />
        ))}
      </div>
    )
  )}
</div>

      </div>
    </div>
  );
}
