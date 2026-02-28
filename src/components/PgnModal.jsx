import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PgnModal({ onClose }) {
  const [pgn, setPgn] = useState("");
  const navigate = useNavigate();

  const handleAnalyze = () => {
    if (!pgn.trim()) return;
    localStorage.setItem("gamePgn", pgn);
    onClose?.();
    navigate("/analyze");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2 style={{ marginBottom: 12 }}>Paste Your PGN</h2>
        <textarea placeholder="Paste your PGN here..." value={pgn} onChange={(e) => setPgn(e.target.value)} />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <button className="button" onClick={onClose}>Cancel</button>
          <button className="button button-primary" onClick={handleAnalyze}>Analyze Game</button>
        </div>
      </div>
    </div>
  );
}