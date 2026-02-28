const KEY = "chess_learn_progress";

export function getProgress() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch { return {}; }
}

function saveProgress(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
}

export function getLessonProgress(lessonId) {
    const all = getProgress();
    return all[lessonId] || { completed: false, puzzlesDone: [], timedBest: null };
}

export function markPuzzleDone(lessonId, puzzleId) {
    const all = getProgress();
    if (!all[lessonId]) all[lessonId] = { completed: false, puzzlesDone: [], timedBest: null };
    if (!all[lessonId].puzzlesDone.includes(puzzleId)) all[lessonId].puzzlesDone.push(puzzleId);
    saveProgress(all);
}

export function markLessonComplete(lessonId) {
    const all = getProgress();
    if (!all[lessonId]) all[lessonId] = { completed: false, puzzlesDone: [], timedBest: null };
    all[lessonId].completed = true;
    saveProgress(all);
}

export function saveBestTime(lessonId, seconds) {
    const all = getProgress();
    if (!all[lessonId]) all[lessonId] = { completed: false, puzzlesDone: [], timedBest: null };
    if (all[lessonId].timedBest === null || seconds < all[lessonId].timedBest) {
        all[lessonId].timedBest = seconds;
    }
    saveProgress(all);
}

export function getLevelProgress(levelId, lessons) {
    const lvl = lessons.filter((l) => l.level === levelId);
    const done = lvl.filter((l) => getLessonProgress(l.id).completed).length;
    return { completed: done, total: lvl.length };
}
