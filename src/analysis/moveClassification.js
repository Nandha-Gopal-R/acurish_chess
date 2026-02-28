export function classifyMove({
  moveUci,
  bestMove,
  evalBefore,
  evalAfter,
  bestEval,
  sacrificeValue,
  immediateCaptureByBest,
  movedPieceValue,
  gaveCheck,
  moveIndex,
}) {

  // ----------------------------
  // BLUNDER LOGIC
  // ----------------------------
  const evalDrop = evalAfter - evalBefore;
  const isBlunder = evalDrop <= -350;

  // ----------------------------
  // BEST MOVE
  // ----------------------------
  let isBest = moveUci === bestMove;

  // ----------------------------
  // ENGINE APPROVAL
  // ----------------------------
  const closeToBest = Math.abs(evalAfter - bestEval) <= 15;
  const safeEval = evalAfter >= evalBefore - 20;
  const strongEval = Math.abs(evalAfter) >= 100;

  const permanentSacrifice = sacrificeValue >= 3;
  const temporarySacrifice =
    immediateCaptureByBest && movedPieceValue >= 3;

  const strongImprovement = evalAfter - evalBefore >= 66;
  const forcingIdea = gaveCheck && strongImprovement;

  const isBrilliant =
    closeToBest &&
    safeEval &&
    strongEval &&
    (permanentSacrifice || temporarySacrifice || forcingIdea);

  // ----------------------------------
  // GREAT MOVE
  // ----------------------------------

  const closeToBestLoose = Math.abs(evalAfter - bestEval) <= 10;
  const improvement = evalAfter - evalBefore >= 90;

  const isGreat =
    !isBest &&
    !isBrilliant &&
    !isBlunder &&
    closeToBestLoose &&
    (improvement || Math.abs(evalAfter) >= 100);

  // ----------------------------------
  // EXCELLENT MOVE
  // ----------------------------------

  const isExcellent =
    !isBest &&
    !isBrilliant &&
    !isGreat &&
    !isBlunder &&
    Math.abs(evalAfter - bestEval) <= 60 &&
    evalAfter >= evalBefore - 10;

  // ----------------------------------
  // GOOD MOVE
  // ----------------------------------

  const isGood =
    !isBest &&
    !isBrilliant &&
    !isGreat &&
    !isExcellent &&
    !isBlunder &&
    (
      Math.abs(evalAfter - bestEval) <= 80 ||
      evalDrop >= -80
    );

  // ----------------------------------
  // INACCURACY
  // ----------------------------------

  const evalLoss = bestEval - evalAfter;

  const isInaccuracy =
    !isBest &&
    !isBrilliant &&
    !isGreat &&
    !isExcellent &&
    !isGood &&
    !isBlunder &&
    evalLoss >= 80 &&
    evalLoss < 150;

  // ----------------------------------
  // MISTAKE
  // ----------------------------------

  const isMistake =
    !isBest &&
    !isBrilliant &&
    !isGreat &&
    !isExcellent &&
    !isGood &&
    !isBlunder &&
    evalLoss >= 150 &&
    evalLoss < 300;

  // ----------------------------------
  // MISS
  // ----------------------------------

  const isMiss =
    !isBlunder &&
    evalBefore >= 250 &&
    evalAfter < 100;

  return {
    isBest,
    isBrilliant,
    isExcellent,
    isGreat,
    isGood,
    isInaccuracy,
    isMistake,
    isMiss,
    isBlunder,
  };
}