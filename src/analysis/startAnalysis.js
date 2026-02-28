// src/analysis/startAnalysis.js
import { Chess } from "chess.js";
import StockfishEngine from "../engine/StockfishEngine";
import { classifyMove } from "./moveClassification";

export async function startAnalysis(pgn, depth = 12, onProgress) {
  const chess = new Chess();
  try {
    chess.loadPgn(pgn);
  } catch (e) {
    throw new Error("Invalid PGN format");
  }

  const moves = chess.history();
  const engine = new StockfishEngine();

  const result = {
    whiteStats: { best: 0, brilliant: 0, excellent: 0, good: 0, great: 0, inaccuracy: 0, mistake: 0, miss: 0, blunder: 0 },
    blackStats: { best: 0, brilliant: 0, excellent: 0, good: 0, great: 0, inaccuracy: 0, mistake: 0, miss: 0, blunder: 0 },
    moves: [],
    whiteAccuracy: 0,
    blackAccuracy: 0,
    whiteRating: 0,
    blackRating: 0,
    whiteMissedMate: 0,
    blackMissedMate: 0,
  };

  function calculateMaterialByColor(boardChess) {
    const values = { p: 1, n: 3, b: 3, r: 5, q: 9 };
    let white = 0;
    let black = 0;
    boardChess.board().forEach((row) =>
      row.forEach((piece) => {
        if (!piece) return;
        if (!values[piece.type]) return;
        if (piece.color === "w") white += values[piece.type];
        else black += values[piece.type];
      })
    );
    return { white, black };
  }

  function getMoveObjAndUci(sanOrAlg, fen) {
    const tmp = new Chess(fen);
    const mv = tmp.move(sanOrAlg, { sloppy: true });
    if (!mv) return null;
    const uci = mv.from + mv.to + (mv.promotion || "");
    return {
      moveObj: mv,
      uci,
      movedTo: mv.to,
      wasCapture: !!mv.captured,
      piece: mv.piece,
      from: mv.from,
      to: mv.to,
    };
  }

  chess.reset();

  // keep original depth behavior: use provided depth for "before" eval,
  // and a slightly lower safe depth for "after" eval (as previous code did)
  const depthBefore = depth;
  const depthAfter = Math.max(12, depth - 2);

  for (let i = 0; i < moves.length; i++) {
    const san = moves[i];

    const fenBefore = chess.fen();
    const materialBefore = calculateMaterialByColor(chess);

    const {
      bestMove: rawBestMoveBefore,
      evaluation: rawBestEvalBefore,
      mate: mateBefore,
      multiPv,
    } = await engine.evaluatePosition(fenBefore, depthBefore, 1);

    let bestEvalBefore = rawBestEvalBefore;
    if (chess.turn() === "b") bestEvalBefore = -rawBestEvalBefore;

    const evalBefore = bestEvalBefore;
    const bestMoveBefore = rawBestMoveBefore;

    const mvInfo = getMoveObjAndUci(san, fenBefore);
    if (!mvInfo) {
      // if move cannot be parsed, advance the internal chess state and continue
      // this mirrors previous flow where a continue would skip the rest of logic
      try {
        chess.move(san, { sloppy: true });
      } catch (e) {
        // ignore and continue
      }
      if (onProgress) onProgress(i + 1, moves.length);
      continue;
    }

    const { uci: moveUci, movedTo, wasCapture, piece, from, to } = mvInfo;
    const pieceValues = { p: 1, n: 3, b: 3, r: 5, q: 9 };
    const movedPieceValue = pieceValues[piece] || 0;

    chess.move(san, { sloppy: true });
    const gaveCheck = chess.inCheck();

    const fenAfter = chess.fen();
    const materialAfter = calculateMaterialByColor(chess);

    // ===============================
    // GAME PHASE DETECTION
    // ===============================

    const totalMaterial =
      materialAfter.white + materialAfter.black;

    let phaseWeight = 1;

    // Opening
    if (totalMaterial > 60) phaseWeight = 0.85;

    // Middlegame
    else if (totalMaterial > 30) phaseWeight = 1.15;

    // Endgame
    else phaseWeight = 1.05;

    const side = i % 2 === 0 ? "white" : "black";

    let mateLine = [];

if (
  mateBefore !== null &&
  Math.abs(mateBefore) <= 6 &&
  multiPv &&
  multiPv[1] &&
  multiPv[1].pvLine
) {
  mateLine = multiPv[1].pvLine || [];
}
    // ===============================
    // MISSED CHECKMATE DETECTION
    // ===============================

    if (
      mateBefore !== null &&
      Math.abs(mateBefore) <= 6 &&
      rawBestMoveBefore !== moveUci
    ) 
    
    {
      if (side === "white") result.whiteMissedMate++;
      else result.blackMissedMate++;
    }

    const sacrificeValue =
      side === "white"
        ? materialBefore.white - materialAfter.white
        : materialBefore.black - materialAfter.black;

    const {
      bestMove: rawBestMoveAfter,
      evaluation: rawEvalAfter,
    } = await engine.evaluatePosition(fenAfter, depthAfter, 1);

    let evalAfter = rawEvalAfter;
    if (chess.turn() === "b") evalAfter = -rawEvalAfter;

    let immediateCaptureByBest = false;
    if (
  rawBestMoveAfter &&
  /^[a-h][1-8][a-h][1-8]/.test(rawBestMoveAfter)
) {
  const bmFrom = rawBestMoveAfter.substring(0, 2);
  const bmTo = rawBestMoveAfter.substring(2, 4);
  const promotion = rawBestMoveAfter.length === 5
    ? rawBestMoveAfter[4]
    : undefined;

  const temp = new Chess(fenAfter);

  const moveObj = {
    from: bmFrom,
    to: bmTo,
  };

  if (promotion) {
    moveObj.promotion = promotion;
  }

  const mvAttempt = temp.move(moveObj);

  if (mvAttempt && mvAttempt.captured && bmTo === movedTo)
    immediateCaptureByBest = true;
}

    let playerEvalBefore = evalBefore;
    let playerEvalAfter = evalAfter;
    if (side === "black") {
      playerEvalBefore = -evalBefore;
      playerEvalAfter = -evalAfter;
    }

    let playerBestEval = bestEvalBefore;
    if (side === "black") playerBestEval = -bestEvalBefore;

    // ----------------------------
    // CLASSIFY MOVE
    // ----------------------------
    const classification = classifyMove({
      moveUci,
      bestMove: bestMoveBefore,
      evalBefore: playerEvalBefore,
      evalAfter: playerEvalAfter,
      bestEval: playerBestEval,
      sacrificeValue,
      immediateCaptureByBest,
      movedPieceValue,
      gaveCheck,
      moveIndex: i + 1,
      mateBefore: mateBefore,
    });

    // ==============================
    // ADVANCED ACCURACY SYSTEM
    // ==============================

    let centipawnLoss = playerBestEval - playerEvalAfter;
    if (centipawnLoss < 0) centipawnLoss = 0;

    // Base exponential (strong depth 16 tuning)
    let moveAccuracy =
      100 * Math.exp(-centipawnLoss / 140);

    // Apply phase weight
    moveAccuracy *= phaseWeight;

    // -----------------------------
    // Classification Adjustments
    // -----------------------------

    if (classification.isBrilliant) moveAccuracy += 3;
    if (classification.isGreat) moveAccuracy += 1.5;

    // Blunder penalty depends on position balance
    const positionBalance = Math.abs(playerEvalBefore);

    // If position equal → heavy punishment
    // If already losing big → lighter punishment
    let blunderMultiplier = 1;

    if (positionBalance < 100) blunderMultiplier = 1.2;
    else if (positionBalance > 300) blunderMultiplier = 0.7;

    if (classification.isInaccuracy)
      moveAccuracy -= 8 * blunderMultiplier;

    if (classification.isMistake)
      moveAccuracy -= 18 * blunderMultiplier;

    if (classification.isBlunder)
      moveAccuracy -= 35 * blunderMultiplier;

    // Clamp
    if (moveAccuracy > 100) moveAccuracy = 100;
    if (moveAccuracy < 0) moveAccuracy = 0;

    moveAccuracy = Number(moveAccuracy.toFixed(1));

    const turnColor = side;

    Object.keys(classification).forEach((key) => {
      if (classification[key])
        result[`${turnColor}Stats`][key.replace("is", "").toLowerCase()]++;
    });

    let classificationName = "good";

    if (classification.isBrilliant) classificationName = "brilliant";
    else if (classification.isGreat) classificationName = "great";
    else if (classification.isBest) classificationName = "best";
    else if (classification.isExcellent) classificationName = "excellent";
    else if (classification.isGood) classificationName = "good";
    else if (classification.isInaccuracy) classificationName = "inaccuracy";
    else if (classification.isMistake) classificationName = "mistake";
    else if (classification.isMiss) classificationName = "miss";
    else if (classification.isBlunder) classificationName = "blunder";

    result.moves.push({
      moveIndex: i + 1,
      side: turnColor,
      from,
      to,
      uci: moveUci,
      piece,
      classificationName,
        raw: {
    ...classification,
    evalBefore: playerEvalBefore,   // ✅ ADD
    evalAfter: playerEvalAfter,     // ✅ ADD
    bestEval: playerBestEval        // ✅ ADD
  },
      bestMove: bestMoveBefore,
      accuracy: moveAccuracy,
      mateBefore: mateBefore,
      mateLine: mateLine,  
      fenBefore: fenBefore,
    });

    if (onProgress) onProgress(i + 1, moves.length);
  }

  // ===============================
  // FINAL ACCURACY CALCULATION (AVERAGE)
  // ===============================
  let whiteTotal = 0;
  let whiteMoves = 0;
  let blackTotal = 0;
  let blackMoves = 0;

  result.moves.forEach((m) => {
    if (m.side === "white") {
      whiteTotal += m.accuracy;
      whiteMoves++;
    } else {
      blackTotal += m.accuracy;
      blackMoves++;
    }
  });

  result.whiteAccuracy =
    whiteMoves > 0 ? Number((whiteTotal / whiteMoves).toFixed(1)) : 0;

  result.blackAccuracy =
    blackMoves > 0 ? Number((blackTotal / blackMoves).toFixed(1)) : 0;

  // ===============================
  // PERFORMANCE RATING SYSTEM
  // ===============================

  const whiteBlunders = result.whiteStats.blunder;
  const blackBlunders = result.blackStats.blunder;

  const avgAccuracy =
    (result.whiteAccuracy + result.blackAccuracy) / 2;

  result.whiteRating = Math.round(
    1000 +
    result.whiteAccuracy * 15 +
    (avgAccuracy - result.blackAccuracy) * 3 -
    whiteBlunders * 60
  );

  result.blackRating = Math.round(
    1000 +
    result.blackAccuracy * 15 +
    (avgAccuracy - result.whiteAccuracy) * 3 -
    blackBlunders * 60
  );

  engine.terminate();
  return result;
}