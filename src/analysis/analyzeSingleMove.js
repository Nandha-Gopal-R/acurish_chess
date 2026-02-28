import StockfishEngine from "../engine/StockfishEngine";

export async function analyzeSingleMove(fen, depth = 20) {
  const engine = new StockfishEngine();
  const result = await engine.evaluatePosition(fen, depth, 3);

  const { multiPv } = result;
  let alternatives = [];

  if (multiPv) {
    Object.keys(multiPv)
      .sort((a, b) => Number(a) - Number(b))
      .forEach((key) => {
        const line = multiPv[key];
        if (!line?.bestMove) return;

        alternatives.push({
          uci: line.bestMove,
          score:
            typeof line.value === "number"
              ? line.value
              : 0,
          continuation: Array.isArray(line.pvLine)
            ? line.pvLine
            : [],
        });
      });
  }

  engine.terminate();

  return {
    bestMove: result.bestMove,
    evaluation: result.evaluation,
    mate: result.mate,
    alternatives,
  };
}