import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  increment,
  onSnapshot
} from "firebase/firestore";

import PgnModal from "../components/PgnModal";
import FloatingPieces from "../components/FloatingPieces";

export default function Home() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showWishModal, setShowWishModal] = useState(false);
  const [wishCount, setWishCount] = useState(0);
  const [hasWished, setHasWished] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  const wishRef = doc(db, "global", "wishCounter");

  useEffect(() => {
    const unsubscribe = onSnapshot(wishRef, (docSnap) => {
      if (docSnap.exists()) {
        setWishCount(docSnap.data().count || 0);
      }
    });

    const localWish = localStorage.getItem("hasWished");
    if (localWish === "true") {
      setHasWished(true);
    }

    return () => unsubscribe();
  }, []);

  const handleWish = async () => {
    if (hasWished) return;

    try {
      const snap = await getDoc(wishRef);

      if (!snap.exists()) {
        await setDoc(wishRef, { count: 1 });
      } else {
        await updateDoc(wishRef, {
          count: increment(1)
        });
      }

      localStorage.setItem("hasWished", "true");
      setHasWished(true);
      setShowWishModal(false);
      setShowThanks(true);

      setTimeout(() => {
        setShowThanks(false);
      }, 2500);

    } catch (error) {
      console.error("Error updating wish:", error);
    }
  };

  const openWishCard = () => {
    if (hasWished) return;
    setShowWishModal(true);
  };

  return (
    <>
      {/* MAIN CONTENT */}
      <div className="app-container">
        <FloatingPieces />

        <div className="home-content">

          {/* HERO SECTION (Title + Cards + Wish Centered on Mobile) */}
          <div className="hero-section">

            <h1 className="main-title">
            <span className="title-white">Acu</span>
            <span className="title-red">rish</span>
            <span className="title-white"> Chess</span>
            </h1>

            {/* MAIN CARDS */}
            <div className="card-group">
              <div className="glass-card" onClick={() => navigate("/learn")}>
                <div className="card-title">Learn</div>
                <div className="card-desc">
                  Master mating motifs with guided steps and examples
                </div>
              </div>

              <div className="glass-card" onClick={() => setShowModal(true)}>
                <div className="card-title">Analyze</div>
                <div className="card-desc">
                  Paste PGN and review moves with engine insight
                </div>
              </div>
            </div>

            {/* WISH CARD */}
            <div
              className={`wish-card ${hasWished ? "wish-disabled" : ""}`}
              onClick={openWishCard}
            >
              <div>
                <div className="wish-title"> Wishes</div>
                <div className="wish-sub">
                  {hasWished
                    ? "You already wished ❤️"
                    : "Tap to make a wish"}
                </div>
              </div>

              <div className="wish-count">{wishCount}</div>
            </div>

          </div>

          {/* PGN GUIDE SECTION */}
          <div className="pgn-guide">
            <h2 className="guide-title">How to Copy & Paste PGN</h2>

            <div className="guide-grid">
              <div className="guide-card">
                <h3>💻 From Chess.com (Web)</h3>
                <ol>
                  <li>Open your completed game.</li>
                  <li>Click <b>"Share"</b> below the board.</li>
                  <li>Select <b>"PGN"</b>.</li>
                  <li>Click <b>"Copy PGN"</b>.</li>
                  <li>Paste it in the Analyze section.</li>
                </ol>
              </div>

              <div className="guide-card">
                <h3>📱 From Chess.com App</h3>
                <ol>
                  <li>Open the game.</li>
                  <li>Tap the <b>3 dots (⋮)</b> menu.</li>
                  <li>Select <b>"Export PGN"</b>.</li>
                  <li>Choose <b>"Copy PGN"</b>.</li>
                  <li>Paste it in Analyze.</li>
                </ol>
              </div>
            </div>

            <div className="guide-note">
              ⚠ Note: Not only Chess.com. You can use PGN from
              <b> Lichess, Chess24, ChessBase, or any chess platform</b>.
              If you have a valid PGN file, you can analyze it here.
            </div>
          </div>

        </div>

        {/* ANALYZE MODAL */}
        {showModal && <PgnModal onClose={() => setShowModal(false)} />}

        {/* WISH MODAL */}
        {showWishModal && (
          <div className="modal-overlay">
            <div className="wish-modal">
              <div
                className="wish-close"
                onClick={() => setShowWishModal(false)}
              >
                ✕
              </div>
              <h2>Willing to wish?</h2>
              <div className="wish-buttons">
                <button className="wish-yes" onClick={handleWish}>
                  Yes
                </button>
                <button
                  className="wish-no"
                  onClick={() => setShowWishModal(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {/* THANK YOU POPUP */}
        {showThanks && (
          <div className="thanks-popup">
            ❤️ Thanks for your wishes!
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">

          <div className="footer-section">
            <h3 className="footer-logo">♟ Acurish Chess</h3>
            <p className="footer-text">
              Analyze, learn and improve your chess games with powerful PGN insights.
              Built for serious players.
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li onClick={() => navigate("/")}>Home</li>
              <li onClick={() => navigate("/learn")}>Learn</li>
              <li onClick={() => setShowModal(true)}>Analyze</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Feedback</h4>
            <p className="footer-text">
              Have suggestions or found a bug?
            </p>
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=nandhagopalr246@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-contact"
            >
              📩 Contact Us
            </a>
          </div>

        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Checkmate Studio. All rights reserved.
        </div>
      </footer>
    </>
  );
}