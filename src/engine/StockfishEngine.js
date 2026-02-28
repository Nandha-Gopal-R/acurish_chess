// src/engine/StockfishEngine.js

export default class StockfishEngine {
  constructor() {
    this.worker = new Worker("/stockfish-17.1-lite-single-03e3232.js");
    this.isReady = false;

    this.worker.postMessage("uci");

    this.worker.onmessage = (event) => {
      if (event.data === "uciok") {
        this.isReady = true;
      }
    };
  }

  waitUntilReady() {
    return new Promise((resolve) => {
      const check = () => {
        if (this.isReady) resolve();
        else setTimeout(check, 50);
      };
      check();
    });
  }

  async evaluatePosition(fen, depth = 16, multiPv = 1) {
    await this.waitUntilReady();

    return new Promise((resolve) => {
      let bestMove = null;
      let evaluation = 0;
      let mateScore = null;
      const pvLines = {};

      const handleMessage = (event) => {
        const line = event.data;

if (line.startsWith("info") && line.includes(" multipv ")) {
  const parts = line.split(" ");

  let pvIndex = null;
  let scoreType = null;
  let scoreValue = null;
  let pvLine = [];

  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === "multipv") {
      pvIndex = parseInt(parts[i + 1], 10);
    }

    if (parts[i] === "cp") {
      scoreType = "cp";
      scoreValue = parseInt(parts[i + 1], 10);
    }

    if (parts[i] === "mate") {
      scoreType = "mate";
      scoreValue = parseInt(parts[i + 1], 10);
    }

    if (parts[i] === "pv") {
      pvLine = parts.slice(i + 1);
      break;
    }
  }

  if (pvIndex && pvLine.length > 0) {
    pvLines[pvIndex] = {
      type: scoreType,
      value: scoreValue,
      bestMove: pvLine[0],
      pvLine,
    };
  }
}
        // -----------------------------
        // Final best move
        // -----------------------------
        if (line.startsWith("bestmove")) {
          bestMove = line.split(" ")[1];

          const mainLine = pvLines[1];

          if (mainLine?.type === "cp") {
            evaluation = mainLine.value;
          } else if (mainLine?.type === "mate") {
            mateScore = mainLine.value;

            // Convert mate score into large cp equivalent
            evaluation =
              mateScore > 0 ? 10000 : -10000;
          }

          this.worker.removeEventListener("message", handleMessage);

          resolve({
            bestMove,
            evaluation,
            mate: mateScore, // null if not mate
            multiPv: pvLines,
          });
        }
      };

      this.worker.addEventListener("message", handleMessage);

      this.worker.postMessage(`position fen ${fen}`);
      this.worker.postMessage(`setoption name MultiPV value ${multiPv}`);
      this.worker.postMessage(`go depth ${depth}`);
    });
  }

  terminate() {
    this.worker.terminate();
  }
}