
import React, { useCallback, useState } from "react";


export default function GuideStep({ step, index }) {
    const isReverse = index % 2 !== 0; // Zig-zag: Odd indexes are reversed
    const [speaking, setSpeaking] = useState(false);

    const handleRead = useCallback(() => {
        if (!("speechSynthesis" in window)) return;

        // If already speaking, clicking again stops it
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            setSpeaking(false);
            return;
        }

        setSpeaking(true);
        window.speechSynthesis.cancel();

        const text = `Step ${step.id}. ${step.title}. ${step.description}`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        utterance.onend = () => setSpeaking(false);
        utterance.onerror = () => setSpeaking(false);
        window.speechSynthesis.speak(utterance);
    }, [step]);

    return (
        <div className={`step-row ${isReverse ? "reverse" : ""}`}>
            {/* Text Section */}
            <div className="step-content">
                <div className="step-number">{step.id}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.description}</p>

                {/* 🔊 Read Aloud button */}
                <button
                    className={`guide-step-read-btn ${speaking ? "speaking" : ""}`}
                    onClick={handleRead}
                    title={speaking ? "Stop reading" : "Read this step aloud"}
                >
                    {speaking ? "⏹ Stop" : "🔊 Read Aloud"}
                </button>
            </div>

            {/* Image Section */}
            <div className="step-image-container">
                <div className="image-wrapper">
                    <img
                        src={step.image}
                        alt={step.title}
                        className="step-image"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/600x400/1e293b/white?text=Screenshot+Placeholder";
                        }}
                        style={{
                            transformOrigin: `${step.highlight.x}% ${step.highlight.y}%`,
                        }}
                    />
                    {/* Animated Arrow Overlay */}
                    <div
                        className="arrow-overlay"
                        style={{
                            left: `${step.highlight.x}%`,
                            top: `${step.highlight.y}%`,
                        }}
                    >
                        <svg
                            width="60"
                            height="60"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="arrow-svg"
                        >
                            <path
                                d="M12 2L12 18M12 18L5 11M12 18L19 11"
                                stroke="#ef4444"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
