// src/components/SummaryPanel.jsx
import React from "react";

/* --- import PNG icons (500x500 each) from your assets folder --- */
import brilliantPng from "../assets/icons/classification/brilliant.png";
import greatPng from "../assets/icons/classification/great.png";
import bestPng from "../assets/icons/classification/best.png";
import excellentPng from "../assets/icons/classification/excellent.png";
import goodPng from "../assets/icons/classification/good.png";
import inaccuracyPng from "../assets/icons/classification/inaccuracy.png";
import missPng from "../assets/icons/classification/miss.png";
import mistakePng from "../assets/icons/classification/mistake.png";
import blunderPng from "../assets/icons/classification/blunder.png";

import FloatingPieces from "./FloatingPieces";

/* --- classification metadata using png images --- */
const classificationMeta = {
  brilliant: { label: "Brilliant", img: brilliantPng, className: "brilliant" },
  great: { label: "Great", img: greatPng, className: "great" },
  best: { label: "Best", img: bestPng, className: "best" },
  excellent: { label: "Excellent", img: excellentPng, className: "excellent" },
  good: { label: "Good", img: goodPng, className: "good" },
  inaccuracy: { label: "Inaccuracy", img: inaccuracyPng, className: "inaccuracy" },
  miss: { label: "Miss", img: missPng, className: "miss" },
  mistake: { label: "Mistake", img: mistakePng, className: "mistake" },
  blunder: { label: "Blunder", img: blunderPng, className: "blunder" },
};

export default function SummaryPanel({ summary }) {
  if (!summary) return null;

  const renderClassRows = (stats) =>
    Object.entries(stats).map(([key, value]) => {
      const meta = classificationMeta[key] || { label: key, img: null, className: "" };
      return (
        <div key={key} className="class-row">
          <div className={`icon-cell ${meta.className}`} aria-hidden>
            {meta.img ? (
              <img src={meta.img} alt={meta.label} className="classification-img" />
            ) : (
              <div className="classification-fallback" />
            )}
          </div>

          <div className="class-label">
            <div className={`label-text ${meta.className}`}>{meta.label}</div>
          </div>

          <div className="class-count">{value}</div>
        </div>
      );
    });

  return (
    <div className="summary-root">
      <FloatingPieces />
      <div className="accuracy-wrapper">
        <div className="accuracy-block white">
          <div className="acc-header">White Accuracy</div>
          <div className="acc-main">
            <div className="acc-value">{summary.whiteAccuracy}%</div>
            <div className="acc-rating">
              <span>Rating</span>
              <strong>{summary.whiteRating}</strong>
            </div>
          </div>
        </div>

        <div className="accuracy-block black">
          <div className="acc-header">Black Accuracy</div>
          <div className="acc-main">
            <div className="acc-value">{summary.blackAccuracy}%</div>
            <div className="acc-rating">
              <span>Rating</span>
              <strong>{summary.blackRating}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="tactical-wrapper">
        <div className="miss-card white-miss">
          <div className="miss-icon">♚</div>
          <div className="miss-text">
            <div className="miss-title">White Missed Wins</div>
            <div className="miss-count">{summary.whiteMissedMate ?? 0}</div>
          </div>
        </div>

        <div className="miss-card black-miss">
          <div className="miss-icon">♔</div>
          <div className="miss-text">
            <div className="miss-title">Black Missed Wins</div>
            <div className="miss-count">{summary.blackMissedMate ?? 0}</div>
          </div>
        </div>
      </div>

      <div className="classification-wrapper">
        <div className="classification-card">
          <div className="class-header">White Move Classification</div>
          <div className="class-grid">{renderClassRows(summary.whiteStats)}</div>
        </div>

        <div className="classification-card">
          <div className="class-header">Black Move Classification</div>
          <div className="class-grid">{renderClassRows(summary.blackStats)}</div>
        </div>
      </div>
    </div>
  );
}
