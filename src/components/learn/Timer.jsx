import { useEffect, useRef, useState } from "react";

export default function Timer({ seconds, onExpire, running }) {
    const [timeLeft, setTimeLeft] = useState(seconds);
    const intervalRef = useRef(null);

    useEffect(() => {
        setTimeLeft(seconds);
    }, [seconds]);

    useEffect(() => {
        if (!running) {
            clearInterval(intervalRef.current);
            return;
        }
        intervalRef.current = setInterval(() => {
            setTimeLeft((t) => {
                if (t <= 1) {
                    clearInterval(intervalRef.current);
                    if (onExpire) onExpire();
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(intervalRef.current);
    }, [running, onExpire]);

    const mins = Math.floor(timeLeft / 60)
        .toString()
        .padStart(2, "0");
    const secs = (timeLeft % 60).toString().padStart(2, "0");

    const colorClass =
        timeLeft > 20 ? "timer-green" : timeLeft > 10 ? "timer-orange" : "timer-red";

    return (
        <div className={`timer-display ${colorClass} ${timeLeft <= 10 ? "timer-pulse" : ""}`}>
            <span className="timer-icon">⏱</span>
            <span className="timer-text">
                {mins}:{secs}
            </span>
        </div>
    );
}
