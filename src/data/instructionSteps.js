
import step1 from "../assets/instructions/step1.png";
import step2 from "../assets/instructions/step2.png";
import step3 from "../assets/instructions/step3.png";
import step4 from "../assets/instructions/step4.png";
import step5 from "../assets/instructions/step5.png";
import step6 from "../assets/instructions/step6.png";
import step7 from "../assets/instructions/step7.png";

export const instructionSteps = [
    {
        id: 1,
        title: "Go to Profile",
        description: "First, go to the game profile or account profile.",
        image: step1,
        highlight: { x: 3, y: 96 }, // Center default
    },
    {
        id: 2,
        title: "Select Games",
        description: "In that, you can see the option called 'Games'. Click that.",
        image: step2,
        highlight: { x: 20, y: 34 },
    },
    {
        id: 3,
        title: "Game History",
        description: "Next, you can see the game history that you played before. Click that.",
        image: step3,
        highlight: { x: 15, y: 44 },
    },
    {
        id: 4,
        title: "Click Share",
        description: "Next, you can see your previously played game. In that, you can see the analysis column. Under that, you can see the share button. Click that.",
        image: step4,
        highlight: { x: 70, y: 95 },
    },
    {
        id: 5,
        title: "Select PGN",
        description: "Next, after clicking that, you can see the 'PGN' option. Click that.",
        image: step5,
        highlight: { x: 42, y: 27 },
    },
    {
        id: 6,
        title: "Copy Code",
        description: "Next, you see the PGN code. Copy that using the copy symbol.",
        image: step6,
        highlight: { x: 72, y: 79 },
    },
    {
        id: 7,
        title: "Paste & Analyze",
        description: "Next, paste that code IN THE ANALYSIS box above.",
        image: step7,
        highlight: { x: 50, y: 50 },
    },
];
