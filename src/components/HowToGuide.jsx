
import React from "react";
import { instructionSteps } from "../data/instructionSteps";
import GuideStep from "./GuideStep";

export default function HowToGuide() {
    return (
        <div className="guide-container">
            <h2 className="main-title" style={{ fontSize: "2.5rem", marginTop: "40px" }}>
                How to Analyze Your Game
            </h2>
            <div className="steps-wrapper">
                {instructionSteps.map((step, index) => (
                    <GuideStep key={step.id} step={step} index={index} />
                ))}
            </div>
        </div>
    );
}
