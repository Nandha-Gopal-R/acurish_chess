// ─── LEVEL 1: Basic Mates ───────────────────────────────────────────────────
const level1 = [
    {
        id: "l1-1",
        level: 1,
        slug: "queen-king-mate",
        title: "King + Queen vs King",
        difficulty: "Beginner",
        explanation:
            "The King and Queen checkmate is the most fundamental endgame skill. The queen is so powerful that combined with your king, you can force the enemy king to the edge of the board and deliver checkmate.",
        keyPoints: [
            "Drive the enemy king to the edge — corner or edge of the board",
            "Use your king actively to cut off escape squares",
            "The queen alone can stalemate the enemy king — always check for stalemate!",
            "A common pattern: Queen restricts the king to a smaller area, then king marches up to help deliver mate",
        ],

        puzzles: [
            { id: "p1", fen: "k7/2Q5/1K6/8/8/8/8/8 w - - 0 1", hint: "Queen to the back rank delivers checkmate" },
            { id: "p2", fen: "k7/8/KQ6/8/8/8/8/8 w - - 0 1", hint: "The queen controls the back rank" },
            { id: "p3", fen: "7k/8/5KQ1/8/8/8/8/8 w - - 0 1", hint: "Move the queen one rank up" },
            { id: "p4", fen: "k7/8/2K5/1Q6/8/8/8/8 w - - 0 1", hint: "The queen covers b8 — King blocks a7" },
            { id: "p5", fen: "k7/8/K7/8/8/8/1Q6/8 w - - 0 1", hint: "Queen delivers checkmate on b7" },
        ],
    },
    {
        id: "l1-2",
        level: 1,
        slug: "rook-king-mate",
        title: "King + Rook vs King",
        difficulty: "Beginner",
        explanation:
            "The King and Rook checkmate requires more technique than the queen mate. The key idea is to use the rook to cut off ranks or files, gradually pushing the enemy king to the edge where your king and rook can coordinate for the final blow.",
        keyPoints: [
            "Use the rook to cut off a rank or file — think of it as building a wall",
            "King must be active — march it toward the enemy king to support the rook",
            "The final checkmate always happens on the edge of the board",
            "Watch out for stalemate when the enemy king is in the corner",
        ],

        puzzles: [
            { id: "p1", fen: "7k/R7/6K1/8/8/8/8/8 w - - 0 1", hint: "Rook to the 8th rank is checkmate" },
            { id: "p2", fen: "k7/2K5/1R6/8/8/8/8/8 w - - 0 1", hint: "Bring the rook to the back rank" },
            { id: "p3", fen: "2k5/R7/2K5/8/8/8/8/8 w - - 0 1", hint: "Rook to the 8th rank for checkmate" },
            { id: "p4", fen: "8/8/8/8/8/k1K5/8/1R6 w - - 0 1", hint: "Rook delivers mate along the a-file" },
            { id: "p5", fen: "k7/8/1K6/8/8/8/8/R7 w - - 0 1", hint: "The rook gives checkmate on a8" },
        ],
    },
    {
        id: "l1-3",
        level: 1,
        slug: "two-rooks-mate",
        title: "Two Rooks Mate",
        difficulty: "Beginner",
        explanation:
            "Two rooks working together form a deadly 'lawnmower' — they cut off ranks one by one, pushing the enemy king to the edge for checkmate. This is one of the easiest mates to execute once you know the pattern.",
        keyPoints: [
            "Alternate the rooks — while one checks, the other is safe and ready",
            "Use the 'lawnmower' — advance each rook one rank at a time",
            "Your king does not need to participate — two rooks are enough!",
            "Beware stalemate: don't push the black king if the only checks lead to stalemate",
        ],

        puzzles: [
            { id: "p1", fen: "k7/8/8/8/8/8/1R6/1R4K1 w - - 0 1", hint: "Move one rook to deliver back rank mate" },
            { id: "p2", fen: "7k/8/8/8/8/8/6RR/6K1 w - - 0 1", hint: "One rook checkmates on the back rank" },
            { id: "p3", fen: "k7/8/1R6/8/8/8/1R6/6K1 w - - 0 1", hint: "Advance one rook for checkmate" },
            { id: "p4", fen: "8/8/8/8/8/8/KRR5/7k w - - 0 1", hint: "Rooks deliver mate on h1" },
            { id: "p5", fen: "8/8/8/8/8/8/RR6/K6k w - - 0 1", hint: "Find the checkmate using both rooks" },
        ],
    },
    {
        id: "l1-4",
        level: 1,
        slug: "back-rank-mate",
        title: "Back Rank Mate",
        difficulty: "Beginner",
        explanation:
            "The Back Rank Mate is one of the most common tactical themes in chess. It occurs when the enemy king is trapped behind its own pawns on the back rank, and a rook or queen delivers checkmate there.",
        keyPoints: [
            "The king is locked in by its own pawns — f7, g7, h7 become a prison",
            "A rook or queen on the 8th rank (or 1st rank for Black) delivers checkmate",
            "Always look for this pattern when your opponent hasn't created a pawn break for the king",
            "Luring the defender away with a sacrifice often opens the back rank",
        ],

        puzzles: [
            { id: "p1", fen: "3r2k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1", hint: "Your rook goes to the 8th rank" },
            { id: "p2", fen: "6k1/5ppp/8/8/8/8/5PPP/R5K1 w - - 0 1", hint: "The a1 rook finds the back rank" },
            { id: "p3", fen: "r5k1/5ppp/8/8/8/8/5PPP/R5K1 w - - 0 1", hint: "Trade rooks and it's checkmate" },
            { id: "p4", fen: "6k1/5ppp/8/8/8/3R4/5PPP/6K1 w - - 0 1", hint: "The rook slides to the 8th rank" },
            { id: "p5", fen: "6k1/5ppp/6n1/8/8/8/5PPP/3RK3 w - - 0 1", hint: "The back rank is undefended" },
        ],
    },
    {
        id: "l1-5",
        level: 1,
        slug: "scholars-mate",
        title: "Scholar's Mate",
        difficulty: "Beginner",
        explanation:
            "Scholar's Mate is the famous 4-move checkmate that attacks the f7 square — the weakest point in Black's starting position. While experienced players easily defend it, understanding it teaches the value of rapid development and king safety.",
        keyPoints: [
            "The f7 square is only defended by the king — it's the weakest spot early in the game",
            "White attacks f7 with both the queen (from h5) and bishop (from c4)",
            "Black can defend by moving the queen to e7 or the knight to f6",
            "Don't rely on Scholar's Mate against experienced players — use it to understand tactical threats",
        ],

        puzzles: [
            { id: "p1", fen: "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4", hint: "Queen takes on f7 — checkmate!" },
            { id: "p2", fen: "r1bqkb1r/pppp1ppp/2n5/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 2 3", hint: "Same pattern — queen targets f7" },
            { id: "p3", fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 6 4", hint: "The f7 square is still vulnerable" },
            { id: "p4", fen: "rnbqkb1r/pppp1ppp/8/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 2 3", hint: "Strike at the f7 weakness now" },
            { id: "p5", fen: "r1bqkb1r/pppp1ppp/2n5/4p2Q/2B1P3/2N5/PPPP1PPP/R1B1K1NR w KQkq - 4 4", hint: "The queen delivers checkmate on f7" },
        ],
    },
];

// ─── LEVEL 2: Tactical Patterns ─────────────────────────────────────────────
const level2 = [
    {
        id: "l2-1",
        level: 2,
        slug: "smothered-mate",
        title: "Smothered Mate",
        difficulty: "Intermediate",
        explanation:
            "Smothered Mate is one of the most elegant checkmates in chess. A knight delivers check to a king that is completely surrounded — smothered — by its own pieces. The king has no escape because its own army blocks every square.",
        keyPoints: [
            "The knight delivers the final check — it's the only piece that can jump over others",
            "The enemy king must be in the corner, surrounded by its own pieces",
            "The classic sequence involves a queen sacrifice to force the king into the corner",
            "The smothered mate pattern always ends with Ne7# (or equivalent) by the knight",
        ],
        commonMistakes: [
            "Missing that the king's own pieces are blocking escape",
            "Forgetting the queen sacrifice that forces the king into the smothered position",
        ],
        puzzles: [
            { id: "p1", fen: "6rk/6pp/7N/8/8/8/8/7K w - - 0 1", hint: "Jump your knight to f7!" },
            { id: "p2", fen: "5rrk/6pp/7N/8/8/8/8/7K w - - 0 1", hint: "Knight leaps to f7 for smothered mate" },
            { id: "p3", fen: "6rk/6pp/7N/8/8/8/8/6K1 w - - 0 1", hint: "The knight is in position — jump to f7" },
            { id: "p4", fen: "6rk/6pp/7N/5rp1/8/8/8/7K w - - 0 1", hint: "Knight delivers smothered mate to the cornered king" },
            { id: "p5", fen: "4rr1k/6pp/7N/8/8/8/8/7K w - - 0 1", hint: "Jump to f7 for the classic smothered mate" },
        ],
    },
    {
        id: "l2-2",
        level: 2,
        slug: "arabian-mate",
        title: "Arabian Mate",
        difficulty: "Intermediate",
        explanation:
            "The Arabian Mate uses a rook and a knight working together to checkmate a king in the corner. The knight covers the king's escape squares while the rook delivers the check along the back rank or file.",
        keyPoints: [
            "Knight + Rook is the key piece combination",
            "The king must be in or near the corner",
            "The knight covers the squares the rook cannot reach (adjacent squares)",
            "The rook delivers the final check while the knight cuts off escape",
        ],
        commonMistakes: [
            "Placing the knight too far from the corner — it must control adjacent squares",
            "Forgetting the rook needs a clear line to deliver check",
        ],
        puzzles: [
            { id: "p1", fen: "7k/5R2/6N1/8/8/8/8/6K1 w - - 0 1", hint: "Rook swings to h7 — knight covers g8" },
            { id: "p2", fen: "7k/6R1/5N2/8/8/8/8/6K1 w - - 0 1", hint: "Rook to g8 — knight covers h6 and f8" },
            { id: "p3", fen: "k7/8/1RN5/8/8/8/8/6K1 w - - 0 1", hint: "Rook to the back rank for Arabian mate" },
            { id: "p4", fen: "k7/2N5/1R6/8/8/8/8/6K1 w - - 0 1", hint: "Rook delivers checkmate on a6" },
            { id: "p5", fen: "7k/5N2/6R1/8/8/8/8/6K1 w - - 0 1", hint: "Rook swings to h6 — Arabian mate" },
        ],
    },
    {
        id: "l2-3",
        level: 2,
        slug: "anastasia-mate",
        title: "Anastasia's Mate",
        difficulty: "Intermediate",
        explanation:
            "Anastasia's Mate traps the enemy king on the side of the board between one of its own pieces and the edge. A rook (or queen) delivers the check while a knight cuts off the king's escape squares.",
        keyPoints: [
            "King is trapped on the h-file (or a-file) between the board edge and its own piece",
            "Knight on e7 (or similar) cuts off the king's escape to the center",
            "Rook or queen delivers the final check along the h-file",
            "Look for this when your opponent's king is on the side with pieces nearby",
        ],
        commonMistakes: [
            "Missing a friendly piece that is blocking the king's escape",
            "Not noticing the knight's role in covering interior escape squares",
        ],
        puzzles: [
            { id: "p1", fen: "5pk1/5R1p/4N3/8/8/8/8/6K1 w - - 0 1", hint: "Rook to h7 — knight covers g6, Anastasia's mate" },
            { id: "p2", fen: "5rk1/5ppp/4N3/7R/8/8/8/6K1 w - - 0 1", hint: "Rook swings to h8 for Anastasia's mate" },
            { id: "p3", fen: "6k1/5ppp/4N3/8/8/8/8/5RK1 w - - 0 1", hint: "Rook to g1 then g8 — knight covers f8 and h8" },
            { id: "p4", fen: "6k1/5Npp/6p1/8/8/8/8/4R1K1 w - - 0 1", hint: "Rook delivers Anastasia's mate on e8" },
            { id: "p5", fen: "k7/5Npp/6p1/R7/8/8/8/6K1 w - - 0 1", hint: "Rook delivers mate on a8 — knight covers b8" },
        ],
    },
    {
        id: "l2-4",
        level: 2,
        slug: "bodens-mate",
        title: "Boden's Mate",
        difficulty: "Intermediate",
        explanation:
            "Boden's Mate is a beautiful criss-cross bishop checkmate. Two bishops on open diagonals team up to checkmate the king, often after a queen sacrifice lures the king out of safety.",
        keyPoints: [
            "Two bishops on criss-crossing diagonals deliver the checkmate",
            "The king's own pieces often block its escape squares",
            "Commonly arises after castling queenside and a sacrifice opens diagonals",
            "Look for this pattern when you have two powerful bishops on open diagonals",
        ],
        commonMistakes: [
            "Missing that the criss-cross pattern exists on the board",
            "Failing to clear the diagonals before executing the mate",
        ],
        puzzles: [
            { id: "p1", fen: "2k5/1pp5/p7/2B5/5B2/8/8/4K3 w - - 0 1", hint: "Bishop to a7 — criss-cross Boden's mate!" },
            { id: "p2", fen: "2k5/ppp5/8/6B1/2B5/8/8/4K3 w - - 0 1", hint: "Bishop to a7 delivers Boden's mate" },
            { id: "p3", fen: "2k5/pp6/8/2B5/5B2/8/8/4K3 w - - 0 1", hint: "Criss-cross bishop pattern — find the mating move" },
            { id: "p4", fen: "2k5/p1p5/8/2B5/3B4/8/8/4K3 w - - 0 1", hint: "Bishops criss-cross to deliver Boden's mate" },
            { id: "p5", fen: "2k5/p7/1p6/1B6/2B5/8/8/4K3 w - - 0 1", hint: "Find the bishop that delivers the final blow" },
        ],
    },
    {
        id: "l2-5",
        level: 2,
        slug: "hook-mate",
        title: "Hook Mate",
        difficulty: "Intermediate",
        explanation:
            "The Hook Mate uses a rook, knight, and pawn to deliver checkmate. The pawn and knight work together to cut off the king's escape while the rook delivers the final blow on an open file.",
        keyPoints: [
            "Rook, Knight, and pawn are the three key pieces",
            "The pawn controls one square, the knight controls adjacent squares",
            "The rook sweeps in along a file for the final check",
            "Very common in positions where the defender's kingside pawns have advanced",
        ],
        commonMistakes: [
            "Ignoring the pawn's role in the checkmate pattern",
            "Moving the rook before the knight is properly placed",
        ],
        puzzles: [
            { id: "p1", fen: "6k1/6p1/5N1R/8/8/8/8/6K1 w - - 0 1", hint: "Rook to h8 — knight covers h7, pawn g7" },
            { id: "p2", fen: "6k1/5Np1/7R/8/8/8/8/6K1 w - - 0 1", hint: "Rook delivers hook mate with knight support" },
            { id: "p3", fen: "6k1/4N1p1/7R/8/8/8/8/6K1 w - - 0 1", hint: "Knight on e7 covers f5 and g6 — rook to h8" },
            { id: "p4", fen: "6k1/6pN/7R/8/8/8/8/6K1 w - - 0 1", hint: "Knight on h7 and rook on h6 form the hook" },
            { id: "p5", fen: "7k/5Np1/6pR/8/8/8/8/6K1 w - - 0 1", hint: "Rook delivers the hook mate checkmate" },
        ],
    },
    {
        id: "l2-6",
        level: 2,
        slug: "opera-mate",
        title: "Opera Mate",
        difficulty: "Intermediate",
        explanation:
            "The Opera Mate is a classic pattern where a rook delivers checkmate on the back rank while a bishop controls a critical diagonal, preventing the king from escaping. It was famously played by Paul Morphy at the Paris Opera in 1858.",
        keyPoints: [
            "Rook delivers checkmate on the back rank (d8 or similar)",
            "A bishop controls a diagonal that cuts off a key escape square",
            "The enemy king's own pieces block its remaining escape squares",
            "Often arises when the enemy has not developed their pieces",
        ],
        commonMistakes: [
            "Playing the rook check without first ensuring the bishop covers the escape square",
            "Missing that a friendly piece is blocking the checkmate square",
        ],
        puzzles: [
            { id: "p1", fen: "3k4/3pp3/8/5B2/8/8/3R4/4K3 w - - 0 1", hint: "Rook to d8 delivers Opera mate style checkmate" },
            { id: "p2", fen: "r2k4/3p4/8/3B4/8/8/8/R3K3 w Q - 0 1", hint: "The bishop controls the escape square" },
            { id: "p3", fen: "3k4/3pp3/8/5B2/8/8/2R5/4K3 w - - 0 1", hint: "Bishop and rook work together for Opera mate" },
            { id: "p4", fen: "2k5/2pp4/8/3B4/8/8/1R6/3K4 w - - 0 1", hint: "Find the Opera mate pattern" },
            { id: "p5", fen: "3k4/2pp4/8/2B5/8/8/3R4/4K3 w - - 0 1", hint: "Rook delivers checkmate with bishop support" },
        ],
    },
    {
        id: "l2-7",
        level: 2,
        slug: "epaulette-mate",
        title: "Epaulette Mate",
        difficulty: "Intermediate",
        explanation:
            "The Epaulette Mate gets its name from military epaulettes (shoulder decorations). The king is checkmated in the center of the board with two of its own pieces — one on each side — blocking its escape, like shoulder ornaments.",
        keyPoints: [
            "The king is checkmated in the center or on a rank — not in the corner",
            "Two of the king's own pieces block the left and right escape squares",
            "A queen or rook delivers the check from the front",
            "Occurs when both side-pieces are pinned, paralyzed, or trapped",
        ],
        commonMistakes: [
            "Missing that both side squares are blocked by the king's own pieces",
            "Not considering this pattern when the king appears safe but is hemmed in",
        ],
        puzzles: [
            { id: "p1", fen: "3rkr2/8/8/8/8/8/4Q3/4K3 w - - 0 1", hint: "Queen to e8 — own rooks block d8 and f8" },
            { id: "p2", fen: "3rkr2/8/3Q4/8/8/8/8/6K1 w - - 0 1", hint: "Queen delivers epaulette mate from e7" },
            { id: "p3", fen: "3rkr2/8/1Q6/8/8/8/8/6K1 w - - 0 1", hint: "Queen slides to e6 — own rooks on both sides" },
            { id: "p4", fen: "2rrkr2/8/8/8/8/8/4Q3/4K3 w - - 0 1", hint: "Two own rooks block escape — queen mates" },
            { id: "p5", fen: "r2rkr2/8/8/8/8/8/4Q3/4K3 w - - 0 1", hint: "Find the epaulette checkmate" },
        ],
    },
    {
        id: "l2-8",
        level: 2,
        slug: "dovetail-mate",
        title: "Dovetail Mate",
        difficulty: "Intermediate",
        explanation:
            "The Dovetail Mate (also called the Cozio Mate) features a queen delivering checkmate with its own pieces blocking the two diagonal escape squares, forming a dovetail shape. The queen cannot be captured because it is protected.",
        keyPoints: [
            "The queen delivers checkmate — it cannot be captured",
            "The two escape diagonal squares are blocked by the attacker's own pieces",
            "The king has no legal moves in any direction",
            "Usually occurs when the queen is supported by a pawn or piece",
        ],
        commonMistakes: [
            "Playing the queen check without ensuring it is protected",
            "Not seeing that the blocking pieces are your own, not the opponent's",
        ],
        puzzles: [
            { id: "p1", fen: "8/8/4k3/3P1P2/8/8/8/4Q1K1 w - - 0 1", hint: "Queen to e5 — pawns on f5 and d5 form the dovetail wings" },
            { id: "p2", fen: "8/8/4k3/3P1P2/8/8/8/R1Q1K3 w - - 0 1", hint: "Queen delivers dovetail mate from e5" },
            { id: "p3", fen: "8/5k2/4PP2/8/8/8/8/4Q1K1 w - - 0 1", hint: "Queen to e7 — pawns block escape" },
            { id: "p4", fen: "8/3k4/2Q1PP2/8/8/8/8/4K3 w - - 1 1", hint: "Deliver the dovetail checkmate" },
            { id: "p5", fen: "8/2k5/PQ2PP2/8/8/8/8/4K3 w - - 1 1", hint: "Pawns support queen for dovetail mate" },
        ],
    },
];

// ─── LEVEL 3: Opening Traps ──────────────────────────────────────────────────
const level3 = [
    {
        id: "l3-1",
        level: 3,
        slug: "fools-mate",
        title: "Fool's Mate",
        difficulty: "Beginner",
        explanation:
            "Fool's Mate is the fastest possible checkmate in chess — just 2 moves for Black! It only works because White makes very weakening moves with the f and g pawns, opening the diagonal for Black's queen. No serious player falls for this, but understanding it teaches king safety fundamentals.",
        keyPoints: [
            "White weakens the f1-h3 diagonal with f3 and g4",
            "Black's queen delivers checkmate on h4",
            "Fool's Mate only works if White makes both weakening moves",
            "The real lesson: never weakly push king-side pawns in the opening",
        ],
        defense: "Simply don't push f2-f3 and g2-g4 in the opening. Develop pieces instead.",
        whyItWorks: "White's pawn moves open the diagonal from d8 to h4 with nothing blocking the queen's path to h4.",
        mindGameChallenge: {
            question: "White plays 1.f3. What is the best defensive approach for Black?",
            options: ["Play 1...e5 and look for traps", "Play normally — develop pieces, wait for White to trap themselves", "Immediately play 1...Qh4 to threaten checkmate"],
            correct: 1,
        },
        puzzles: [
            { id: "p1", fen: "rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR w KQkq - 1 3", hint: "Black's queen delivers Fool's Mate" },
            { id: "p2", fen: "rnb1kbnr/ppppqppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR w KQkq - 1 3", hint: "A variation of the f3-g4 weakening" },
            { id: "p3", fen: "rnbqkb1r/ppp2ppp/3p4/4p3/4P1P1/5P2/PPPP3P/RNBQKBNR b KQkq - 0 3", hint: "Black can deliver checkmate with the queen" },
            { id: "p4", fen: "rnbqkbnr/pppp1ppp/8/4p3/5PP1/8/PPPPP2P/RNBQKBNR b KQkq f3 0 2", hint: "Spot the checkmate in one move for Black" },
            { id: "p5", fen: "rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3", hint: "It's already checkmate — this is the final position of Fool's Mate" },
        ],
    },
    {
        id: "l3-2",
        level: 3,
        slug: "legals-mate",
        title: "Legal's Mate",
        difficulty: "Intermediate",
        explanation:
            "Legal's Mate is one of the most famous traps in chess — a stunning queen sacrifice that sets up checkmate by the minor pieces. White deliberately allows the queen to be captured, then unleashes the knight and bishop to deliver a beautiful checkmate.",
        keyPoints: [
            "White sacrifices the queen — a shocking move that must be calculated precisely",
            "Knights and bishop deliver a smothering checkmate after the queen sacrifice",
            "Black's instinct is to capture the 'free' queen — this is the trap",
            "Only works when Black's queen is pinning the knight prematurely",
        ],
        defense: "Don't take the queen on e5 when it appears to be hanging — calculate first! Play Bxe4 or d6 to challenge White's center instead.",
        whyItWorks: "Black takes the 'free' queen thinking they're winning, but the knight and bishops create an inescapable net around the king.",
        mindGameChallenge: {
            question: "White plays Ne5 and appears to hang the queen. Should Black take it?",
            options: ["Yes, always take free pieces!", "No — calculate what happens after Nxe5 carefully", "Trade queens first to simplify"],
            correct: 1,
        },
        puzzles: [
            { id: "p1", fen: "r1bQkb1r/pppp1ppp/2n2n2/4N3/2B1P3/8/PPPP1PPP/RNB1K2R b KQkq - 0 4", hint: "White's queen was sacrificed — now Black must take it!" },
            { id: "p2", fen: "r1b1kb1r/pppp1ppp/2n2N2/8/2B1P3/8/PPPP1PPP/RNB1K2R b KQkq - 0 6", hint: "Bishop delivers f7 mate after the king moves" },
            { id: "p3", fen: "r1b1k2r/ppppNppp/8/8/2B1P3/8/PPPP1PPP/RNB1K2R w KQkq - 0 7", hint: "Find the checkmate using the knight and bishop" },
            { id: "p4", fen: "r1bqkb1r/pppp1ppp/2n5/4N3/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 5", hint: "Bishop captures f7 with checkmate" },
            { id: "p5", fen: "r1b1k1nr/pppp1Npp/2n5/8/2B1P3/8/PPPP1PPP/RNB1K2R w KQkq - 0 7", hint: "Deliver the final blow on f7" },
        ],
    },
    {
        id: "l3-3",
        level: 3,
        slug: "fishing-pole-trap",
        title: "Fishing Pole Trap",
        difficulty: "Intermediate",
        explanation:
            "The Fishing Pole Trap arises in the Ruy Lopez opening when Black plays an aggressive knight maneuver to h5, 'dangling' the knight like a fishing pole as bait. If White takes the knight, Black unleashes a deadly attack on the king.",
        keyPoints: [
            "Black plays Ng4 and Nh5 — the knight is the 'bait' on the fishing pole",
            "If White takes Nxh5, Black plays g5 followed by g4, launching a kingside pawn storm",
            "The trap leads to a mating attack or winning material for Black",
            "Best defense: White should not take the knight — just castle or ignore the bait",
        ],
        defense: "As White, don't capture the knight on h5. Castle kingside and play solidly. The 'free' knight is poisoned.",
        whyItWorks: "After Nxh5? g5! Ng3 h5 h4 Nf1 g4, the kingside is ripped open and White's king is in danger.",
        mindGameChallenge: {
            question: "Black plays Nh5 in the Ruy Lopez. What should White do?",
            options: ["Take the knight with Bxh5 — it's free!", "Ignore it and castle — the knight costs a tempo", "Push h3 to kick the knight back"],
            correct: 1,
        },
        puzzles: [
            { id: "p1", fen: "r1bq1rk1/ppp2p1p/2np4/3Np1b1/2B1Pp2/2N3Pp/PPP2P1P/R1BQK2R w KQ - 0 11", hint: "White is in danger — find the checkmate threat" },
            { id: "p2", fen: "r1bq1rk1/ppp2p2/2np3p/3Np1bp/2B1Pp2/2N3Pp/PPP2P1P/R1BQK2R w KQ - 0 11", hint: "The fishing pole has sprung — find the attack" },
            { id: "p3", fen: "r1bq1r2/ppp2pkp/2np4/3Np1b1/2B1Pp2/2N3P1/PPP2PKP/R1BQ1R2 b - - 0 12", hint: "Black launches the decisive attack" },
            { id: "p4", fen: "r1b2rk1/ppp2p1p/2np1q2/3N2b1/2B1Pp2/2N3Pp/PPP2P1P/R1BQK2R w KQ - 0 12", hint: "Spot the checkmate threat in the Fishing Pole attack" },
            { id: "p5", fen: "r1bq1rk1/ppp2p2/2n4p/3N2bp/2B1Pp1p/2N3P1/PPP2PKP/R1BQ1R2 b - - 0 13", hint: "Find the tactical blow that ends the game" },
        ],
    },
    {
        id: "l3-4",
        level: 3,
        slug: "blackburne-shilling",
        title: "Blackburne Shilling Trap",
        difficulty: "Intermediate",
        explanation:
            "The Blackburne Shilling Gambit is a tricky counter-attack for Black in the Italian Game. Black offers a knight sacrifice on e4, and if White takes it greedily without calculation, they walk into a mating net.",
        keyPoints: [
            "Black plays Nd4 after 1.e4 e5 2.Nf3 Nc6 3.Bc4 Nd4 — offering a queen trade",
            "If White plays Nxe5? Black plays Qg5! threatening Qxg2 and Qxe5",
            "The trap culminates in Qxg2 Rf1 Qxe4+ forking king and rook",
            "Best defense: White should play d3 or c3, not taking the 'free' knight",
        ],
        defense: "Play c3 or d3 to challenge Black's knight. Never take the bait with Nxe5 without calculating the queen response.",
        whyItWorks: "The queen on g5 creates multiple threats simultaneously — a fork, an attack on g2, and tactical complications that are hard to handle.",
        mindGameChallenge: {
            question: "After 1.e4 e5 2.Nf3 Nc6 3.Bc4 Nd4, what should White play?",
            options: ["Nxe5 — grab the free pawn!", "c3 — challenge the knight and gain center control", "0-0 — ignore the knight and castle"],
            correct: 1,
        },
        puzzles: [
            { id: "p1", fen: "r1bqk2r/pppp1ppp/8/2b1N3/4n3/8/PPPP1PPP/RNBQKB1R w KQkq - 0 6", hint: "Black delivers checkmate after the Blackburne Shilling trap" },
            { id: "p2", fen: "r1bqk2r/pppp1ppp/8/2b3N1/4n3/8/PPPP1PPP/RNBQKB1R b KQkq - 1 6", hint: "Black's moves lead to a forced checkmate" },
            { id: "p3", fen: "r1b1k2r/ppppqppp/8/2b3N1/4n3/8/PPPP1PPP/RNBQKBR1 b Qkq - 3 7", hint: "Find the decisive move in this trap" },
            { id: "p4", fen: "r1bqk2r/pppp1ppp/8/3bN3/3Bn3/8/PPP2PPP/RNBQK2R b KQkq - 0 7", hint: "Spot the winning continuation for Black" },
            { id: "p5", fen: "r1b1k2r/pppp1ppp/8/2b5/4n3/8/PPPPQPPP/RNB1KB1R b KQkq - 2 7", hint: "Find the checkmate or decisive win for Black" },
        ],
    },
    {
        id: "l3-5",
        level: 3,
        slug: "damiano-trap",
        title: "Damiano's Defense Trap",
        difficulty: "Intermediate",
        explanation:
            "Damiano's Defense (1.e4 e5 2.Nf3 f6?) is considered one of the worst openings for Black. It weakens the king and opens diagonal lines. When White plays Nxe5! and Black tries to recover with fxe5?, White unleashes a brilliant queen attack.",
        keyPoints: [
            "Black's f6 weakens the e6 square and the king's diagonal",
            "After Nxe5! fxe5?? Qh5+ traps the king or wins material",
            "The queen checks on g6 with discovered attack creates devastating threats",
            "The sequence ends in checkmate or massive material gain for White",
        ],
        defense: "Simply don't play f6 in the opening — it weakens key squares around the king. Play Nc6 or d6 instead.",
        whyItWorks: "f6 creates a critical weakness on g6 and opens the f-file. The queen exploits both while the knight on e5 dominates the center.",
        mindGameChallenge: {
            question: "You notice your opponent always plays f6 in the opening. What should you do?",
            options: ["Play quietly and hope they don't trap you", "Play Nf3 and Nxe5 — punish the weakening move", "Mirror their f-pawn push with f4"],
            correct: 1,
        },
        puzzles: [
            { id: "p1", fen: "rnbqkb1r/pppp2pp/8/4Np2/4P3/8/PPPP1PPP/RNBQKB1R w KQkq - 0 4", hint: "White's queen delivers a mating attack after Damiano's Defense" },
            { id: "p2", fen: "rnb1kb1r/pppp2pp/6q1/4Np2/4P3/8/PPPP1PPP/RNBQKB1R w KQkq - 2 5", hint: "Find White's winning move in the Damiano trap" },
            { id: "p3", fen: "rnb1kbbr/pppp2pp/6q1/8/4Pp2/8/PPPP1PPP/RNBQKB1R w KQkq - 0 6", hint: "White delivers checkmate in the Damiano trap" },
            { id: "p4", fen: "rnbqkb1r/pppp3p/6p1/4Np2/4P3/8/PPPP1PPP/RNBQKB1R w KQkq - 0 5", hint: "Spot the queen checkmate pattern" },
            { id: "p5", fen: "rnb1k2r/pppp1b1p/6p1/4NpQ1/4P3/8/PPPP1PPP/RNB1KB1R b KQkq - 3 6", hint: "Find the final checkmate move for White" },
        ],
    },
];

// ─── LEVEL 4: Advanced Mates ─────────────────────────────────────────────────
const level4 = [
    {
        id: "l4-1",
        level: 4,
        slug: "bishop-knight-mate",
        title: "Bishop + Knight vs King",
        difficulty: "Expert",
        explanation:
            "The Bishop and Knight checkmate is the hardest fundamental endgame to master. Unlike the queen or rook, the bishop and knight don't naturally work together. Checkmate can only happen in a corner that the bishop controls — this is the most critical insight.",
        keyPoints: [
            "Checkmate ONLY occurs in a corner of the same color as your bishop",
            "The correct corner must be forced — a complex 50-60 move process",
            "The 'W-maneuver' with the knight brings the king to the right corner",
            "Requires precise coordination of all three pieces (king + bishop + knight)",
        ],
        whyRare: "The Bishop + Knight checkmate is so rare that many players draw it by mistake — even grandmasters have failed to convert this ending in time trouble.",
        commonMistakes: [
            "Trying to deliver checkmate in the wrong corner (the color the bishop doesn't control)",
            "Moving the knight to the wrong square in the W-maneuver",
            "Allowing stalemate when the king is trapped in the wrong corner",
        ],
        puzzles: [
            { id: "p1", fen: "k7/8/5BN1/8/8/8/8/7K w - - 0 1", hint: "Knight to h6 delivers mate in the corner" },
            { id: "p2", fen: "k7/8/6NK/5B2/8/8/8/8 w - - 0 1", hint: "Knight and bishop coordinate for mate" },
            { id: "p3", fen: "k7/6N1/5B1K/8/8/8/8/8 w - - 0 1", hint: "Find the mating move with the knight" },
            { id: "p4", fen: "k7/8/5BNK/8/8/8/8/6K1 w - - 0 1", hint: "Position your knight for the final strike" },
            { id: "p5", fen: "k7/5B2/6NK/8/8/8/8/8 w - - 0 1", hint: "Deliver the Corner Mate" },
        ],
    },
    {
        id: "l4-2",
        level: 4,
        slug: "underpromotion-mate",
        title: "Underpromotion Mate",
        difficulty: "Expert",
        explanation:
            "Underpromotion checkmate is the art of promoting a pawn to a piece OTHER than a queen — usually a knight — to deliver checkmate or avoid stalemate. This advanced concept requires precise calculation and creative thinking.",
        keyPoints: [
            "Sometimes promoting to a queen causes stalemate — underpromotion to a knight avoids this",
            "A knight on a promotion square can deliver a forking check that a queen cannot",
            "Rook underpromotion is used when a queen would stalemate the opponent",
            "Always calculate stalemate possibilities before promoting!",
        ],
        whyRare: "Underpromotion requires going against the natural instinct to take the most powerful piece. It demands precise stalemate awareness that separates advanced players from beginners.",
        commonMistakes: [
            "Promoting to queen when it would give stalemate",
            "Missing that a knight promotion delivers an immediate checkmate fork",
            "Not calculating all possible underpromotion options",
        ],
        puzzles: [
            { id: "p1", fen: "k7/1P6/K7/8/8/8/8/8 w - - 0 1", hint: "Promote to queen for checkmate" },
            { id: "p2", fen: "7k/5P1p/7K/8/8/8/8/1N6 w - - 0 1", hint: "Underpromotion to a knight delivers checkmate" },
            { id: "p3", fen: "7k/5P2/7K/8/8/8/8/8 w - - 0 1", hint: "Choose the right piece on promotion — queen stalemates!" },
            { id: "p4", fen: "k7/1P6/K7/8/8/8/8/8 w - - 0 1", hint: "Underpromotion wins here — promotion to queen draws" },
            { id: "p5", fen: "k7/1P6/K7/8/8/8/8/8 w - - 0 1", hint: "Try to avoid stalemate by promoting to something else" },
        ],
    },
    {
        id: "l4-3",
        level: 4,
        slug: "double-check-mate",
        title: "Double Check Mate",
        difficulty: "Expert",
        explanation:
            "A double check occurs when two pieces simultaneously deliver check to the king. The king MUST move — it cannot block two checks at once or capture both attackers. This makes double checks extraordinarily powerful in attack.",
        keyPoints: [
            "Double check forces the king to move — no block or capture resolves two attacks at once",
            "Usually delivered by a discovered check where the uncovering piece ALSO gives check",
            "Double checks are rare but decisive — they often lead directly to checkmate",
            "Look for double check opportunities when a piece discovery also attacks the king",
        ],
        whyRare: "Double check requires perfect alignment of two attacking pieces along the king's position, combined with a discovered attack — a sophisticated tactical combination rarely seen at club level.",
        commonMistakes: [
            "Missing that the uncovering piece also gives check (would be just a discovered check)",
            "Not calculating where the king can run after the double check",
            "Delivering double check without a follow-up checkmate plan",
        ],
        puzzles: [
            { id: "p1", fen: "k7/1P6/K7/8/8/8/8/8 w - - 0 1", hint: "Promote with discovered check — the king is caught in a double check" },
            { id: "p2", fen: "k7/1P6/K7/8/8/8/8/8 w - - 0 1", hint: "Double check forces the king — find the checkmate" },
            { id: "p3", fen: "4k3/8/4B3/3N4/8/8/8/4K3 w - - 0 1", hint: "Knight move delivers double check and mate" },
            { id: "p4", fen: "4k3/8/3RB3/8/8/8/8/4K3 w - - 0 1", hint: "Find the double check that leads to checkmate" },
            { id: "p5", fen: "4k2r/8/3BB3/8/8/8/8/4K3 w - - 0 1", hint: "Deliver the decisive double check" },
        ],
    },
    {
        id: "l4-4",
        level: 4,
        slug: "discovered-check-mate",
        title: "Discovered Check Mate",
        difficulty: "Expert",
        explanation:
            "A discovered check occurs when a piece moves, uncovering an attack from a piece behind it. The moving piece is free to go anywhere — even to a square that normally would lose it — because the discovered check demands the opponent respond to the check first.",
        keyPoints: [
            "The piece that MOVES is not the one giving check — the piece behind it does",
            "The moving piece is free — it can go anywhere including capturing a protected piece",
            "Discovered checks create 'tempo' — you check AND improve your position simultaneously",
            "Discovered checkmate: the moving piece also joins the mating net",
        ],
        whyRare: "Discovered checkmate requires perfectly positioning a 'battery' of two pieces aimed at the king before executing the discovery — a sophisticated multi-move setup only seen in precise play.",
        commonMistakes: [
            "Confusing discovered check with double check",
            "Missing that the moving piece can make a powerful independent threat",
            "Not setting up the battery of pieces before attempting the discovery",
        ],
        puzzles: [
            { id: "p1", fen: "4k3/4p3/3p4/8/3B4/8/8/4K2R w - - 0 1", hint: "Move the rook to uncover a discovered check — then mate" },
            { id: "p2", fen: "1k6/1P1B4/K7/8/8/8/8/8 w - - 0 1", hint: "The bishop uncovers the pawn's promotion — discovered checkmate" },
            { id: "p3", fen: "r3k3/8/8/8/3B4/8/8/R3K3 w Qq - 0 1", hint: "Move the rook — uncovering a devastating discovered check" },
            { id: "p4", fen: "4k3/8/8/8/3N4/8/4B3/4K3 w - - 0 1", hint: "Knight move creates discovered check from the bishop" },
            { id: "p5", fen: "1k6/1P6/1K1B4/8/8/8/8/8 w - - 0 1", hint: "Promote the pawn using the discovered check from the bishop" },
        ],
    },
    {
        id: "l4-5",
        level: 4,
        slug: "windmill-mate",
        title: "Windmill Mate",
        difficulty: "Expert",
        explanation:
            "The Windmill is one of the most spectacular combinations in chess. A rook and bishop (or rook and queen) alternate checks — the rook gives check, the bishop gives discovered check, the rook checks again — grinding down the opponent's position like a windmill.",
        keyPoints: [
            "The rook and bishop alternate checks — rook check, discovered check from bishop, rook check again",
            "Each cycle of the windmill typically wins a piece or pawn",
            "The opponent can only run their king — every move is forced",
            "The windmill ends when the rook delivers the final checkmate stroke",
        ],
        whyRare: "The Windmill requires a perfectly positioned rook-bishop battery combined with an enemy king with no escape. This alignment is extremely rare but utterly decisive when it occurs.",
        commonMistakes: [
            "Breaking the windmill cycle too early — keep it spinning until checkmate",
            "Missing that each rook check maintains the discovered check setup",
            "Not calculating all checks to ensure the king cannot escape the windmill",
        ],
        puzzles: [
            { id: "p1", fen: "6k1/R7/6B1/8/8/8/8/6K1 w - - 0 1", hint: "Start the windmill — rook check, then discovered check cycles" },
            { id: "p2", fen: "r5k1/R7/6B1/8/8/8/8/6K1 w - - 0 1", hint: "Execute the windmill combination" },
            { id: "p3", fen: "4r1k1/R4p2/4pBp1/8/8/8/8/6K1 w - - 0 1", hint: "Wind up the windmill — alternate rook and bishop checks" },
            { id: "p4", fen: "6k1/R4pp1/3p2B1/8/8/8/8/6K1 w - - 0 1", hint: "The windmill delivers checkmate" },
            { id: "p5", fen: "r5k1/R4pp1/6B1/8/8/8/8/6K1 w - - 0 1", hint: "Find the windmill checkmate combination" },
        ],
    },
];

// ─── LEVEL METADATA ──────────────────────────────────────────────────────────
export const levels = [
    {
        id: 1,
        title: "Basic Mates",
        subtitle: "Core Mating Ability",
        description: "Master the fundamental checkmates every chess player must know. Learn to finish won games.",
        icon: "♟",
        accent: "#6366f1",
        gradient: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    },
    {
        id: 2,
        title: "Tactical Patterns",
        subtitle: "Must-Know Checkmates",
        description: "Develop pattern recognition with the classic tactical checkmate combinations.",
        icon: "⚔",
        accent: "#ec4899",
        gradient: "linear-gradient(135deg, #db2777, #9333ea)",
    },
    {
        id: 3,
        title: "Opening Traps",
        subtitle: "Engagement Boosters",
        description: "Learn the famous opening traps — and importantly, how to defend against them.",
        icon: "🪤",
        accent: "#f59e0b",
        gradient: "linear-gradient(135deg, #d97706, #ef4444)",
    },
    {
        id: 4,
        title: "Advanced Mates",
        subtitle: "Expert Techniques",
        description: "Premium concepts for serious players — rare, beautiful, and decisive patterns.",
        icon: "👑",
        accent: "#10b981",
        gradient: "linear-gradient(135deg, #059669, #0891b2)",
    },
];

export const allLessons = [...level1, ...level2, ...level3, ...level4];
