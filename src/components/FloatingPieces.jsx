import React from "react";

/*
  Simple floating background using Unicode chess pieces.
  These are decorative only.
*/

export default function FloatingPieces() {
  return (
    <div className="floating-bg" aria-hidden>
      <div className="floating-piece fp-1">♛</div>
      <div className="floating-piece fp-2">♜</div>
      <div className="floating-piece fp-3">♟</div>
      <div className="floating-piece fp-4">♞</div>
      <div className="floating-piece fp-5">♚</div>
    </div>
  );
}