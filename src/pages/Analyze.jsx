// src/pages/Analyze.jsx
import React, { useEffect, useRef, useState } from "react";
import "../styles/analysis.css";
import "../styles/analysis-responsive.css"; // mobile tweaks

import AdvancedChessBoard from "../components/AdvancedChessBoard";
import CaptureBox from "../components/CaptureBox";
import SummaryPanel from "../components/SummaryPanel";
import { startAnalysis } from "../analysis/startAnalysis";
import AnalyzeTab from "../components/AnalyzeTab";
import { analyzeSingleMove } from "../analysis/analyzeSingleMove";
import { Chess } from "chess.js";
import MoveList from "../components/MoveList";

export default function Analyze() {
  const [activeTab, setActiveTab] = useState(0);
  const [whiteCaptured, setWhiteCaptured] = useState([]);
  const [blackCaptured, setBlackCaptured] = useState([]);
  const [boardOrientation, setBoardOrientation] = useState("white");

  const [moveClassifications, setMoveClassifications] = useState([]);
  const [currentPly, setCurrentPly] = useState(0);
  const [deepAnalysis, setDeepAnalysis] = useState(null);


  useEffect(() => {
    window.ignoreBoardSync = false;
  }, []);

  useEffect(() => {
    if (activeTab !== 1) return; // Only Analyze tab

    const pgn = localStorage.getItem("gamePgn");
    if (!pgn) return;

    const chess = new Chess();
    chess.loadPgn(pgn);

    const history = chess.history({ verbose: true });

    chess.reset();

    for (let i = 0; i < currentPly; i++) {
      chess.move(history[i]);
    }

    const fen = chess.fen();

    analyzeSingleMove(fen, 20).then((res) => {
      setDeepAnalysis(res);
    });
  }, [activeTab, currentPly]);

  const [summaryData, setSummaryData] = useState({
    whiteAccuracy: 0,
    blackAccuracy: 0,
    whiteRating: 0,
    blackRating: 0,
    whiteMissedMate: 0,
    blackMissedMate: 0,
    whiteStats: {
      brilliant: 0,
      great: 0,
      best: 0,
      excellent: 0,
      good: 0,
      inaccuracy: 0,
      mistake: 0,
      miss: 0,
      blunder: 0,
    },
    blackStats: {
      brilliant: 0,
      great: 0,
      best: 0,
      excellent: 0,
      good: 0,
      inaccuracy: 0,
      mistake: 0,
      miss: 0,
      blunder: 0,
    },
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [depth, setDepth] = useState(16);
  const cancelRequestedRef = useRef(false);

  const runIdRef = useRef(0);

  // When child components (board) update captures
  const handleCaptureUpdate = (white, black, orientation) => {
    setWhiteCaptured(white || []);
    setBlackCaptured(black || []);
    setBoardOrientation(orientation || "white");
  };

  // Run analysis
  const runAnalysis = async (runAutomatically = true) => {
    const pgn = localStorage.getItem("gamePgn");
    if (!pgn) {
      alert("No game PGN found in localStorage (key: gamePgn).");
      return;
    }

    const currentRunId = ++runIdRef.current;
    cancelRequestedRef.current = false;

    setIsAnalyzing(true);
    setProgress({ done: 0, total: 1 });

    try {
      const result = await startAnalysis(pgn, depth, (done, total) => {
        if (currentRunId !== runIdRef.current) return;
        setProgress({ done, total });
      });

      setMoveClassifications(result.moves || []);

      if (cancelRequestedRef.current || currentRunId !== runIdRef.current) {
        setIsAnalyzing(false);
        setProgress((p) => ({ ...p, done: p.total }));
        return;
      }

      setSummaryData((prev) => ({
        ...prev,
        whiteAccuracy: result.whiteAccuracy ?? 0,
        blackAccuracy: result.blackAccuracy ?? 0,
        whiteRating: result.whiteRating ?? 0,
        blackRating: result.blackRating ?? 0,
        whiteMissedMate: result.whiteMissedMate ?? 0,
        blackMissedMate: result.blackMissedMate ?? 0,
        whiteStats: {
          ...prev.whiteStats,
          best: result.whiteStats?.best ?? prev.whiteStats.best,
          brilliant: result.whiteStats?.brilliant ?? prev.whiteStats.brilliant,
          excellent: result.whiteStats?.excellent ?? prev.whiteStats.excellent,
          great: result.whiteStats?.great ?? prev.whiteStats.great,
          good: result.whiteStats?.good ?? prev.whiteStats.good,
          inaccuracy: result.whiteStats?.inaccuracy ?? prev.whiteStats.inaccuracy,
          mistake: result.whiteStats?.mistake ?? prev.whiteStats.mistake,
          miss: result.whiteStats?.miss ?? prev.whiteStats.miss,
          blunder: result.whiteStats?.blunder ?? prev.whiteStats.blunder,
        },
        blackStats: {
          ...prev.blackStats,
          best: result.blackStats?.best ?? prev.blackStats.best,
          brilliant: result.blackStats?.brilliant ?? prev.blackStats.brilliant,
          excellent: result.blackStats?.excellent ?? prev.blackStats.excellent,
          great: result.blackStats?.great ?? prev.blackStats.great,
          good: result.blackStats?.good ?? prev.blackStats.good,
          inaccuracy: result.blackStats?.inaccuracy ?? prev.blackStats.inaccuracy,
          mistake: result.blackStats?.mistake ?? prev.blackStats.mistake,
          miss: result.blackStats?.miss ?? prev.blackStats.miss,
          blunder: result.blackStats?.blunder ?? prev.blackStats.blunder,
        },
      }));

      if (runAutomatically) setActiveTab(0);
      setProgress((p) => ({ ...p, done: p.total }));
    } catch (err) {
      console.error("Analysis error:", err);
      alert("Analysis failed: " + (err && err.message ? err.message : err));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCancel = () => {
    cancelRequestedRef.current = true;
    setIsAnalyzing(false);
    setProgress((p) => ({ ...p, done: p.total }));
  };

  // Control button dispatcher
  const dispatchControl = (action) => {
    window.dispatchEvent(new CustomEvent("control-action", { detail: { action } }));
  };

  useEffect(() => {
    // Auto-run analysis on mount
    const shouldAutoRun = true;
    if (shouldAutoRun) {
      const t = setTimeout(() => runAnalysis(true), 400);
      return () => clearTimeout(t);
    }
  }, []); // eslint-disable-line

  const controlButtons = [
    ["flip", "↻", "Flip Board"],
    ["start", "⏮", "Go to Start"],
    ["prev", "◀", "Previous Move"],
    ["next", "▶", "Next Move"],
    ["end", "⏭", "Go to End"],
  ];

  const loadingPct = progress.total ? Math.round((progress.done / progress.total) * 100) : 0;

  return (
    // Add a toggled class when mobile menu is open so CSS can position the report panel overlay
    <div className="analysis-root">
      {/* Mobile report toggle button (visible only on small screens via CSS) */}

      <div className="analysis-container">
        {/* Keep original DOM order for desktop.
            CSS will reorder on mobile so board appears first on phones. */}

        <div className="report-panel" style={{ position: "relative" }}>
          {/* Close for mobile */}

          <div style={{ display: "flex", gap: 24, justifyContent: "center", marginBottom: 16 }}>
            {["Summary", "Analyze", "Move List"].map((item, index) => (
              <div
                key={item}
                onClick={() => setActiveTab(index)}
                style={{
                  cursor: "pointer",
                  fontWeight: 500,
                  fontSize: 17,
                  paddingTop: 4,
                  paddingBottom: 2,
                  transition: "0.3s",
                  borderBottom: activeTab === index ? "2px solid #7c3aed" : "2px solid transparent",
                  color: activeTab === index ? "#c4b5fd" : "rgba(255,255,255,0.7)",
                }}
              >
                {item}
              </div>
            ))}
          </div>

          {isAnalyzing && (
            <div
              className="analysis-loading-overlay"
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 60,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(180deg, rgba(10,8,20,0.65), rgba(8,6,16,0.85))",
                borderRadius: 12,
                padding: 20,
                gap: 18,
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <div style={{ display: "flex", gap: 14, alignItems: "center", flexDirection: "column" }}>
                <svg width="84" height="84" viewBox="0 0 100 100" aria-hidden>
                  <defs>
                    <linearGradient id="g1" x1="0" x2="1">
                      <stop offset="0" stopColor="#a78bfa" />
                      <stop offset="1" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.06)" strokeWidth="6" fill="none" />
                  <path
                    stroke="url(#g1)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="130"
                    strokeDashoffset={130 - (130 * loadingPct) / 100}
                    fill="none"
                    d="M50 8 A42 42 0 1 1 49.999 8"
                  />
                  <text x="50" y="55" textAnchor="middle" fontSize="14" fontWeight="700" fill="#f8fbff">
                    {loadingPct}%
                  </text>
                </svg>

                <div style={{ color: "rgba(230,238,255,0.95)", fontWeight: 700, fontSize: 16 }}>
                  Analyzing game — optimizing for speed and accuracy
                </div>

                <div style={{ width: 360, maxWidth: "86%" }}>
                  <div style={{ height: 10, background: "rgba(255,255,255,0.06)", borderRadius: 10, overflow: "hidden" }}>
                    <div
                      style={{
                        width: `${loadingPct}%`,
                        height: "100%",
                        background: "linear-gradient(90deg,#7c3aed,#a78bfa)",
                        transition: "width 200ms",
                      }}
                    />
                  </div>
                </div>

                <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13 }}>{progress.done}/{progress.total} moves analyzed</div>

                <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                  <button
                    onClick={() => handleCancel()}
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      color: "#fff",
                      padding: "8px 12px",
                      borderRadius: 8,
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // manual re-run with same depth
                      runAnalysis(true);
                    }}
                    style={{
                      background: "linear-gradient(90deg,#7c3aed,#a78bfa)",
                      border: "none",
                      color: "#fff",
                      padding: "8px 12px",
                      borderRadius: 8,
                      cursor: "pointer",
                    }}
                  >
                    Re-run
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="tab-pages">
            {activeTab === 0 && (
              <div className="tab-page">
                <SummaryPanel summary={summaryData} />
              </div>
            )}

            {activeTab === 1 && (
              <div className="tab-page">
                <AnalyzeTab
                  moveClassifications={moveClassifications}
                  activePly={currentPly}
                  deepAnalysis={deepAnalysis}
                />
              </div>
            )}

            {activeTab === 2 && (
              <div className="tab-page">
                <MoveList
                  moveClassifications={moveClassifications}
                  currentPly={currentPly}
                  onGoToMove={(ply) => {
                    setCurrentPly(ply);
                    // When user selects a move from the move list on mobile, we can auto-close the report panel for better UX
                  }}
                />
              </div>
            )}
          </div>

          <div style={{ marginTop: 18, display: "flex", justifyContent: "center" }} className="desktop-controls-wrapper">
            <div className="analysis-controls">
              {controlButtons.map(([action, icon, label]) => (
                <div key={action} className="tooltip-wrapper" style={{ margin: "0 6px" }}>
                  <button className="control-btn" onClick={() => dispatchControl(action)}>
                    {icon}
                  </button>
                  <span className="tooltip-text">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="board-panel">
          <div className="board-card">
            <AdvancedChessBoard
              pgn={localStorage.getItem("gamePgn")}
              onCaptureUpdate={handleCaptureUpdate}
              moveClassifications={moveClassifications}
              externalMoveIndex={currentPly}
              onMoveChange={(index) => {
                if (window.ignoreBoardSync) return;
                setCurrentPly(index);
              }}
            />
          </div>

          {/* Mobile controls: duplicates desktop buttons but only visible on mobile via CSS */}
          <div className="mobile-controls">
            <div className="analysis-controls">
              {controlButtons.map(([action, icon, label]) => (
                <button key={action} className="control-btn" onClick={() => dispatchControl(action)} title={label}>
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* CaptureBox (desktop only; hidden on phone by CSS) */}
          <div className="capture-wrapper">
            <CaptureBox whiteCaptured={whiteCaptured} blackCaptured={blackCaptured} boardOrientation={boardOrientation} />
          </div>
        </div>
      </div>
    </div>
  );
}