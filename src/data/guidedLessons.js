export const guidedLessons = {

    // ═══════════════════════════════════════════════════════
    // LEVEL 1 — Basic Mates
    // ═══════════════════════════════════════════════════════

    "queen-king-mate": {
        title: "King + Queen vs King",
        initialFen: "k7/2Q5/1K6/8/8/8/8/8 w - - 0 1",
        audio: "/audio/lessons/queen-king-mate/intro.mp3",
        intro: "Watch how the King and Queen work together to force checkmate. The queen restricts the enemy king while your king marches in to support.",
        steps: [
            {
                delay: 1500,
                audio: "/audio/lessons/queen-king-mate/step1.mp3",
                highlight: ["a8", "b8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "The Black king on a8 is cornered. Its only potential escape squares are b8 and a7 — let's see how we shut them all down."
            },
            {
                delay: 2000,
                audio: "/audio/lessons/queen-king-mate/step2.mp3",
                highlight: ["a7", "b7"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "The White King on b6 already controls a7 and b7 — blocking two escape routes. The king is an active fighting piece in the endgame!"
            },
            {
                delay: 1500,
                audio: "/audio/lessons/queen-king-mate/step3.mp3",
                arrow: ["c7", "c8"],
                arrowColor: "#22c55e",
                description: "The queen on c7 slides to c8 — covering the entire 8th rank. The Black king has nowhere to go."
            },
            {
                delay: 1800,
                audio: "/audio/lessons/queen-king-mate/step4.mp3",
                move: ["c7", "c8"],
                arrow: ["c7", "c8"],
                arrowColor: "#22c55e",
                highlight: ["a8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "Qc8#! The queen lands on c8. The king on a8 is in check — b8 is covered along the rank, a7 and b7 by White's king. CHECKMATE! ♛"
            }
        ]
    },

    "rook-king-mate": {
        title: "King + Rook vs King",
        initialFen: "7k/R7/6K1/8/8/8/8/8 w - - 0 1",
        audio: "/audio/lessons/rook-king-mate/intro.mp3",
        intro: "The King and Rook checkmate is a key fundamental endgame. The rook cuts off the king by rank while your king supports from nearby.",
        steps: [
            {
                delay: 1500,
                audio: "/audio/lessons/rook-king-mate/step1.mp3",
                highlight: ["h8", "g8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "The Black king on h8 is on the back rank. Its only possible moves are g8 and g7. The White King on g6 already covers g7!"
            },
            {
                delay: 2000,
                audio: "/audio/lessons/rook-king-mate/step2.mp3",
                highlight: ["g7", "h7"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "White King on g6 controls g7 and h7 — the king cannot escape downward. Now the rook on a7 delivers the final blow."
            },
            {
                delay: 4000,
                audio: "/audio/lessons/rook-king-mate/step3.mp3",
                arrow: ["a7", "a8"],
                arrowColor: "#22c55e",
                description: "The White Rook swings from a7 to a8 — landing on the 8th rank. This covers every square on rank 8!"
            },
            {
                delay: 6000,
                audio: "/audio/lessons/rook-king-mate/step4.mp3",
                move: ["a7", "a8"],
                arrow: ["a7", "a8"],
                arrowColor: "#22c55e",
                highlight: ["h8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "Ra8#! The rook sweeps to a8. The Black king on h8 is in check. g8 is covered along rank 8. g7 and h7 covered by White King. CHECKMATE! ♜"
            }
        ]
    },

    "two-rooks-mate": {
        title: "Two Rooks Mate — The Lawnmower",
        initialFen: "k7/8/8/8/8/8/1R6/1R4K1 w - - 0 1",
        audio: "/audio/lessons/two-rooks-mate/intro.mp3",
        intro: "Two rooks create the legendary 'lawnmower' — they alternate checks pushing the enemy king to the edge, then one delivers the final checkmate.",
        steps: [
            {
                delay: 1500,
                audio: "/audio/lessons/two-rooks-mate/step1.mp3",
                highlight: ["a8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "Black king is already on a8 — the back rank corner. White has two powerful rooks. ONE move delivers checkmate here!"
            },
            {
                delay: 5000,
                audio: "/audio/lessons/two-rooks-mate/step2.mp3",
                highlight: ["a7", "b7"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "The rook on b2 controls the entire b-file, including b8. The king's only escape attempts are blocked. Both rooks together seal all ranks."
            },
            {
                delay: 9000,
                audio: "/audio/lessons/two-rooks-mate/step3.mp3",
                arrow: ["b1", "b8"],
                arrowColor: "#22c55e",
                description: "The rook on b1 can slide all the way to b8 in one move — checking the Black king with the other rook covering a-file rank support."
            },
            {
                delay: 13000,
                audio: "/audio/lessons/two-rooks-mate/step4.mp3",
                move: ["b1", "b8"],
                arrow: ["b1", "b8"],
                arrowColor: "#22c55e",
                highlight: ["a8", "b8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "Rb8#! Rook delivers checkmate on b8. The Black king on a8 is in check. The b2 rook covers a2/b2. a7's escape cut off. CHECKMATE! ♜♜"
            }
        ]
    },

    "back-rank-mate": {
        title: "Back Rank Mate",
        initialFen: "3r2k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1",
        audio: "/audio/lessons/back-rank-mate/intro.mp3",
        intro: "The Back Rank Mate — the most common tactical theme. The king is trapped behind its own pawns. A rook or queen delivers the killing blow.",
        steps: [
            {
                delay: 1500,
                audio: "/audio/lessons/back-rank-mate/step1.mp3",
                highlight: ["f7", "g7", "h7"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "Black's pawns on f7, g7, h7 were supposed to protect the king — but now they've become a PRISON. The king on g8 cannot move forward."
            },
            {
                delay: 5500,
                audio: "/audio/lessons/back-rank-mate/step2.mp3",
                highlight: ["g8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "The Black king on g8 has zero escape squares. f8 and h8 are on the back rank. f7, g7, h7 are blocked by its own pawns. Completely trapped!"
            },
            {
                delay: 9500,
                audio: "/audio/lessons/back-rank-mate/step3.mp3",
                arrow: ["d1", "d8"],
                arrowColor: "#22c55e",
                description: "White's rook on d1 has a clear open file — the d-file. It can slide all the way to d8 in one devastating move!"
            },
            {
                delay: 13500,
                audio: "/audio/lessons/back-rank-mate/step4.mp3",
                move: ["d1", "d8"],
                arrow: ["d1", "d8"],
                arrowColor: "#22c55e",
                highlight: ["d8", "g8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "Rd8#! The rook lands on d8 — even trading with Black's rook. The Black king on g8 is trapped by its own pawns. BACK RANK MATE! ♜"
            }
        ]
    },

    "scholars-mate": {
        title: "Scholar's Mate — The 4-Move Trap",
        initialFen: "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4",
        audio: "/audio/lessons/scholars-mate/intro.mp3",
        intro: "Scholar's Mate — the fastest checkmate, just 4 moves! It targets f7, the weakest point in Black's opening position. Two pieces attack one square.",
        steps: [
            {
                delay: 1500,
                audio: "/audio/lessons/scholars-mate/step1.mp3",
                highlight: ["f7"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "The f7 square (marked red) is Black's most vulnerable point. It's only defended by the king on e8 — no other piece covers it at the start!"
            },
            {
                delay: 5500,
                audio: "/audio/lessons/scholars-mate/step2.mp3",
                arrow: ["c4", "f7"],
                arrowColor: "#22c55e",
                description: "Bishop on c4 is already aiming directly at f7 along the a2-g8 diagonal. One attacker in position."
            },
            {
                delay: 9000,
                audio: "/audio/lessons/scholars-mate/step3.mp3",
                arrow: ["h5", "f7"],
                arrowColor: "#22c55e",
                description: "The Queen on h5 ALSO attacks f7! Two pieces, one square, only the king defends. It's game over when both attack the same undefended point."
            },
            {
                delay: 13000,

                move: ["h5", "f7"],
                arrow: ["h5", "f7"],
                arrowColor: "#22c55e",
                highlight: ["f7", "e8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "Qxf7#! The queen captures on f7 with bishop support. The king on e8 cannot take the queen — bishop guards f7. SCHOLAR'S MATE! ♛"
            }
        ]
    },

    // ═══════════════════════════════════════════════════════
    // LEVEL 2 — Tactical Patterns
    // ═══════════════════════════════════════════════════════

    "smothered-mate": {
        title: "Smothered Mate",
        initialFen: "6rk/6pp/7N/8/8/8/8/6K1 w - - 0 1",
        audio: "/audio/lessons/smothered-mate/intro.mp3",
        intro: "Smothered Mate — one of chess's most elegant patterns. A knight delivers checkmate to a king completely suffocated by its own pieces.",
        steps: [
            {
                delay: 1500,
                audio: "/audio/lessons/smothered-mate/step1.mp3",
                highlight: ["h8", "g8", "h7", "g7"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "The Black king on h8 is surrounded by its own pieces — rook on g8, pawns on g7 and h7."
            },
            {
                delay: 5500,
                audio: "/audio/lessons/smothered-mate/step2.mp3",
                highlight: ["g8", "h7", "g7"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "The king is completely smothered — it cannot move to ANY square."
            },
            {
                delay: 9500,
                audio: "/audio/lessons/smothered-mate/step3.mp3",
                arrow: ["h6", "f7"],
                arrowColor: "#22c55e",
                description: "The White Knight is already on h6. It jumps over the blockades to land on f7."
            },
            {
                delay: 13500,
                audio: "/audio/lessons/smothered-mate/step4.mp3",
                move: ["h6", "f7"],
                arrow: ["h6", "f7"],
                arrowColor: "#22c55e",
                highlight: ["h8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "Nf7#! The king is completely trapped by its own pieces. SMOTHERED MATE! ♞"
            }
        ]
    },

    "arabian-mate": {
        title: "Arabian Mate",
        initialFen: "7k/5R2/6N1/8/8/8/8/6K1 w - - 0 1",
        audio: "/audio/lessons/arabian-mate/intro.mp3",
        intro: "The Arabian Mate uses a rook and knight together — one of the oldest checkmate patterns in chess. The knight covers corner escape squares while the rook delivers the blow.",
        steps: [
            {
                delay: 1500,
                audio: "/audio/lessons/arabian-mate/step1.mp3",
                highlight: ["h8", "g8", "g7"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "The Black king on h8 is in the corner. Its only escape squares are g8 and g7. The knight must control these while the rook sweeps in along the file."
            },
            {
                delay: 5500,
                audio: "/audio/lessons/arabian-mate/step2.mp3",
                highlight: ["f8", "g8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "The White Knight on g6 controls f8 and h8 (already occupied by king). It also covers the f4 area but most crucially cuts off g8 escape via knight geometry!"
            },
            {
                delay: 9500,
                audio: "/audio/lessons/arabian-mate/step3.mp3",
                arrow: ["g6", "f8"],
                arrowColor: "#22c55e",
                description: "Actually the knight on g6 controls f8! Together — Rook on f7 + Knight on g6 — the h8 king is completely trapped. The rook just needs to swing to h7!"
            },
            {
                delay: 13500,
                audio: "/audio/lessons/arabian-mate/step4.mp3",
                arrow: ["f7", "h7"],
                arrowColor: "#22c55e",
                description: "Rook slides from f7 to h7! This checks the king on h8 along the h-file. Can the king escape to g8? No — the knight on g6 covers g8!"
            },
            {
                delay: 17500,
                audio: "/audio/lessons/arabian-mate/step5.mp3",
                move: ["f7", "h7"],
                arrow: ["f7", "h7"],
                arrowColor: "#22c55e",
                highlight: ["h8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "Rh7#! The rook delivers check on h7. Knight on g6 covers g8. h8 is the king's only square — but the rook checks it from h7. ARABIAN MATE! ♜♞"
            }
        ]
    },

    "anastasia-mate": {
        title: "Anastasia's Mate",
        initialFen: "5rk1/5ppp/4N3/8/8/8/8/R5K1 w - - 0 1",
        audio: "/audio/lessons/anastasia-mate/intro.mp3",
        intro: "Anastasia's Mate traps the enemy king on the side of the board between its own piece and the board edge. The knight + rook combination is lethal.",
        steps: [
            {
                delay: 1500,
                audio: "/audio/lessons/anastasia-mate/step1.mp3",
                highlight: ["g8", "h8", "h7", "h6"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "The Black king on g8 looks safe behind its pawns. But the h-file is the edge of the board — the king can be pushed there with no escape!"
            },
            {
                delay: 5500,
                audio: "/audio/lessons/anastasia-mate/step2.mp3",
                highlight: ["f8", "e8", "e7"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "White's knight on e6 is the key piece. It controls f8 and g7 — cutting off the king's escape to the center. The knight acts as a wall from the inside!"
            },
            {
                delay: 9500,
                audio: "/audio/lessons/anastasia-mate/step3.mp3",
                arrow: ["e6", "g7"],
                arrowColor: "#22c55e",
                description: "The knight on e6 covers g7! The Black rook on f8 blocks f8. Black's own pawns on f7, g7, h7 hem the king in further. The h-file is the killing zone."
            },
            {
                delay: 13500,
                audio: "/audio/lessons/anastasia-mate/step4.mp3",
                arrow: ["a1", "h1"],
                arrowColor: "#22c55e",
                description: "The White Rook slides to h1 — setting up for Rh8#. Then Rh8+ forces the king to h8 (only square) where it's smothered. Wait — let's go directly to h8!"
            },
            {
                delay: 17500,
                audio: "/audio/lessons/anastasia-mate/step5.mp3",
                move: ["a1", "a8"],
                arrow: ["a1", "a8"],
                arrowColor: "#22c55e",
                highlight: ["g8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "Ra8#! Rook swings to a8 — giving checkmate! The knight on e6 covers f8 and g7. Black's own rook on f8 blocks f8. Black's pawns cage the king. ANASTASIA'S MATE! ♜♞"
            }
        ]
    },

    "bodens-mate": {
        title: "Boden's Mate",
        initialFen: "2kr4/ppq5/8/2B5/5B2/8/8/4K3 w - - 0 1",
        audio: "/audio/lessons/bodens-mate/intro.mp3",
        intro: "Boden's Mate — a stunning criss-cross bishop checkmate. Two bishops on open diagonals team up to trap the king, often after a queen sacrifice lures it out.",
        steps: [
            {
                delay: 1500,
                audio: "/audio/lessons/bodens-mate/step1.mp3",
                highlight: ["c8", "b8", "d8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "The Black king on c8 looks tucked away after queenside castling. But the diagonals are wide open! The a and b pawns block some escape but the bishops have clear lines."
            },
            {
                delay: 5500,
                audio: "/audio/lessons/bodens-mate/step2.mp3",
                arrow: ["c5", "b6"],
                arrowColor: "#22c55e",
                description: "White's bishop on c5 controls the a7-b6-c5-d4-e3 diagonal — specifically targeting b6 and a7. The king cannot go to b7 or a6 due to this bishop."
            },
            {
                delay: 9500,
                audio: "/audio/lessons/bodens-mate/step3.mp3",
                arrow: ["f4", "b8"],
                arrowColor: "#22c55e",
                description: "The bishop on f4 controls the a7-f2 diagonal diagonally — it attacks b8! Two bishops criss-crossing create a mating net. Neither bishop covers the same squares."
            },
            {
                delay: 13500,
                audio: "/audio/lessons/bodens-mate/step4.mp3",
                arrow: ["c5", "a7"],
                arrowColor: "#22c55e",
                description: "One bishop to a7 delivers check — AND cuts off b8! The king on c8 cannot go to b8 (covered by f4 bishop) or d7/d8 (covered by other pieces)."
            },
            {
                delay: 17500,
                audio: "/audio/lessons/bodens-mate/step5.mp3",
                move: ["c5", "a7"],
                arrow: ["c5", "a7"],
                arrowColor: "#22c55e",
                highlight: ["c8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "Ba7#! Bishop to a7 — CHECK! The king on c8 is in check. b8 is covered by the f4 bishop. d8 is blocked by Black's rook. d7 covered. No escape! BODEN'S MATE! ♗♗"
            }
        ]
    },

    "hook-mate": {
        title: "Hook Mate",
        initialFen: "6k1/6p1/5N1R/8/8/8/8/6K1 w - - 0 1",
        audio: "/audio/lessons/hook-mate/intro.mp3",
        intro: "The Hook Mate uses a rook, knight, and pawn working together in an L-shaped 'hook' to trap the king. The pawn and knight seal the exits, the rook delivers the blow.",
        steps: [
            {
                delay: 1500,
                audio: "/audio/lessons/hook-mate/step1.mp3",
                highlight: ["g8", "h8", "h7", "f8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "The Black king on g8 is behind its own g7 pawn. The White rook is on h6, knight on f6. This creates a classic hook shape — rook on the h-file, knight controlling adjacent squares."
            },
            {
                delay: 5500,
                audio: "/audio/lessons/hook-mate/step2.mp3",
                highlight: ["h7", "f7", "f8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "The knight on f6 controls g8... wait — it controls h7! The Black pawn on g7 blocks g7. So the king on g8 has: h8 (open), h7 (knight covers it). Let's see."
            },
            {
                delay: 9500,
                audio: "/audio/lessons/hook-mate/step3.mp3",
                arrow: ["f6", "h7"],
                arrowColor: "#22c55e",
                description: "Knight on f6 attacks h7 — and also controls f7 and h5! The rook on h6 covers the entire h-file. Together they form the hook shape that gives this mate its name."
            },
            {
                delay: 13500,
                audio: "/audio/lessons/hook-mate/step4.mp3",
                arrow: ["h6", "h8"],
                arrowColor: "#22c55e",
                description: "The rook slides up the h-file to h8 — CHECK! The king on g8 cannot go to h8 (rook), h7 (knight covers it), f8 (open), f7 (knight covers it from f6)."
            },
            {
                delay: 17500,
                audio: "/audio/lessons/hook-mate/step5.mp3",
                move: ["h6", "h8"],
                arrow: ["h6", "h8"],
                arrowColor: "#22c55e",
                highlight: ["g8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "Rh8#! The rook delivers checkmate on h8. The king on g8 is in check. h7 covered by knight. g7 blocked by Black's own pawn. f8/f7 covered by knight. HOOK MATE! ♜♞"
            }
        ]
    },

    "opera-mate": {
        title: "Opera Mate",
        initialFen: "3k4/3p4/8/8/3B4/8/8/R3K3 w Q - 0 1",
        audio: "/audio/lessons/opera-mate/intro.mp3",
        intro: "Opera Mate — played by Paul Morphy in a Paris Opera box in 1858! A rook on the back rank delivers checkmate while a bishop cuts off the king's escape diagonal.",
        steps: [
            {
                delay: 1500,
                audio: "/audio/lessons/opera-mate/step1.mp3",
                highlight: ["d8", "c8", "e8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "Black king on d8. The back rank squares c8, d8, e8 are critical. The pawn on d7 blocks the king from fleeing to d7. The king is hemmed in on the 8th rank!"
            },
            {
                delay: 5500,
                audio: "/audio/lessons/opera-mate/step2.mp3",
                arrow: ["d4", "b6"],
                arrowColor: "#22c55e",
                description: "White's bishop on d4 controls the a7-g1 diagonal! Specifically — it covers c5 and b6, cutting off the Black king from escaping via c7 or b6 after a check."
            },
            {
                delay: 9500,
                audio: "/audio/lessons/opera-mate/step3.mp3",
                arrow: ["a1", "d1"],
                arrowColor: "#22c55e",
                description: "The White Rook slides from a1 to d1 — setting up to go to d8 for checkmate. The bishop on d4 already covers the escape diagonal. Magic is about to happen."
            },
            {
                delay: 13500,
                audio: "/audio/lessons/opera-mate/step4.mp3",
                move: ["a1", "d1"],
                arrow: ["d1", "d8"],
                arrowColor: "#22c55e",
                description: "Rd1! Now the rook aims straight at d8 along the d-file. The Black king cannot run to c7 or b6 (bishop covers those). Only d8 is next in the sequence."
            },
            {
                delay: 17500,
                audio: "/audio/lessons/opera-mate/step5.mp3",
                move: ["d1", "d8"],
                arrow: ["d1", "d8"],
                arrowColor: "#22c55e",
                highlight: ["d8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "Rd8#! The rook delivers checkmate on d8. The bishop on d4 covers c5-b6 diagonal. The pawn blocks d7. c8 and e8 have no escape. This is the OPERA MATE! ♜♗"
            }
        ]
    },

    "epaulette-mate": {
        title: "Epaulette Mate",
        initialFen: "3rkr2/8/8/8/8/8/8/3QK3 w - - 0 1",
        audio: "/audio/lessons/epaulette-mate/intro.mp3",
        intro: "The Epaulette Mate gets its name from military shoulder decorations. The king is checkmated in the center with its own pieces — one on each side — blocking escape like epaulettes.",
        steps: [
            {
                delay: 1500,
                audio: "/audio/lessons/epaulette-mate/step1.mp3",
                highlight: ["d8", "e8", "f8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "The Black king on e8 sits in the center of its back rank. Its own rooks are on d8 and f8 — one on each side — completely blocking lateral escape. Like shoulder epaulettes!"
            },
            {
                delay: 5500,
                audio: "/audio/lessons/epaulette-mate/step2.mp3",
                highlight: ["d8", "f8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "d8 = Black rook (blocks the king going left). f8 = Black rook (blocks going right). The king cannot go to d7, e7, or f7 from this position without being captured or staying in check."
            },
            {
                delay: 9500,
                audio: "/audio/lessons/epaulette-mate/step3.mp3",
                arrow: ["d1", "e2"],
                arrowColor: "#22c55e",
                description: "The Queen on d1 can deliver checkmate from e2, or directly from d1/e1 area. The key — the queen slides to e2 where it checks the king on e8 with no possible block."
            },
            {
                delay: 13500,
                audio: "/audio/lessons/epaulette-mate/step4.mp3",
                arrow: ["d1", "d8"],
                arrowColor: "#22c55e",
                description: "Wait — even simpler! The queen slides along the d-file. But Black's rook on d8 trades... Let's use the queen on the e-file approach. Qe2-e8 or Qd3-d8 skewer."
            },
            {
                delay: 17500,
                audio: "/audio/lessons/epaulette-mate/step5.mp3",
                move: ["d1", "e1"],
                arrow: ["e1", "e8"],
                arrowColor: "#22c55e",
                highlight: ["e8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "Qe1-e8#! Queen slides to e1, checks along e-file to e8. The Black king on e8 cannot go to d8 (own rook) or f8 (own rook). d7/e7/f7 all covered. EPAULETTE MATE! ♛"
            }
        ]
    },

    "dovetail-mate": {
        title: "Dovetail Mate",
        initialFen: "8/8/4k3/3P1P2/8/8/8/4Q1K1 w - - 0 1",
        audio: "/audio/lessons/dovetail-mate/intro.mp3",
        intro: "The Dovetail Mate features a queen delivering checkmate while its own pawns block the king's two diagonal escape squares.",
        steps: [
            {
                delay: 1500,
                audio: "/audio/lessons/dovetail-mate/step1.mp3",
                highlight: ["e6", "d5", "f5"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "The Black king on e6 is surrounded by blocking pawns on d5 and f5."
            },
            {
                delay: 5500,
                audio: "/audio/lessons/dovetail-mate/step2.mp3",
                highlight: ["d5", "f5", "d7", "f7"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "The king's escape squares are blocked. The queen just needs to land on e5."
            },
            {
                delay: 9500,
                audio: "/audio/lessons/dovetail-mate/step3.mp3",
                arrow: ["e1", "e5"],
                arrowColor: "#22c55e",
                description: "The queen on e1 slides to e5 — delivering the final blow."
            },
            {
                delay: 13500,
                audio: "/audio/lessons/dovetail-mate/step4.mp3",
                move: ["e1", "e5"],
                arrow: ["e1", "e5"],
                arrowColor: "#22c55e",
                highlight: ["e6"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "Qe5#! The queen delivering checkmate forms a dovetail pattern with the blocking pawns. DOVETAIL MATE! ♛"
            }
        ]
    },

    // ═══════════════════════════════════════════════════════
    // LEVEL 3 — Opening Traps
    // ═══════════════════════════════════════════════════════

    "fools-mate": {
        title: "Fool's Mate — 2 Moves!",
        initialFen: "rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 1",
        audio: "/audio/lessons/fools-mate/intro.mp3",
        intro: "Fool's Mate is the FASTEST possible checkmate in chess — only 2 moves for Black! White makes catastrophic pawn moves that open the diagonal straight to the king.",
        steps: [
            {
                delay: 1500,
                audio: "/audio/lessons/fools-mate/step1.mp3",
                highlight: ["f3", "g4"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "White has played f3 and g4 — two terrible opening moves! Instead of developing pieces, White has ripped open the h4-e1 diagonal pointing directly at the king!"
            },
            {
                delay: 5500,
                audio: "/audio/lessons/fools-mate/step2.mp3",
                arrow: ["d8", "h4"],
                arrowColor: "#22c55e",
                description: "Black's queen flies to h4 — delivering checkmate on the open diagonal!"
            },
            {
                delay: 9500,
                audio: "/audio/lessons/fools-mate/step4.mp3",
                move: ["d8", "h4"],
                arrow: ["d8", "h4"],
                arrowColor: "#22c55e",
                highlight: ["e1"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "Qh4#! Black's queen to h4 — CHECKMATE! FOOL'S MATE! ♛"
            }
        ]
    },

    "legals-mate": {
        title: "Legal's Mate — The Queen Sacrifice",
        initialFen: "r1bk1b1r/pppp1ppp/8/4N3/2B1P3/8/PPPP1PPP/RNBK3R w - - 2 7",
        audio: "/audio/lessons/legals-mate/intro.mp3",
        intro: "Legal's Mate — one of the most famous traps in chess history! White sacrifices the queen, then knights and bishop deliver a beautiful smothering checkmate.",
        steps: [
            {
                delay: 1500,
                audio: "/audio/lessons/legals-mate/step1.mp3",
                highlight: ["d8", "c8", "e8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "The Black king on d8 has been caught in the center — it never castled! Black just took White's queen thinking it was free. Now the minor pieces strike!"
            },
            {
                delay: 5500,
                audio: "/audio/lessons/legals-mate/step2.mp3",
                highlight: ["d7", "c7", "e7"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "Black's pawns are all still on their starting squares — the king has nowhere to run! d7, c7 pawns block forward escape. The knight on e5 controls d7 and f7."
            },
            {
                delay: 9500,
                audio: "/audio/lessons/legals-mate/step3.mp3",
                arrow: ["c4", "f7"],
                arrowColor: "#22c55e",
                description: "The bishop on c4 aims at f7! The knight on e5 attacks d7 and f7 simultaneously. With the king on d8, any rook check on d1 would be devastating."
            },
            {
                delay: 13500,
                audio: "/audio/lessons/legals-mate/step4.mp3",
                arrow: ["c4", "b5"],
                arrowColor: "#22c55e",
                description: "Bishop can also swing to b5 — checking the king on d8 or controlling c6! Every White piece has the Black king in its sights now."
            },
            {
                delay: 17500,
                audio: "/audio/lessons/legals-mate/step5.mp3",
                move: ["c4", "f7"],
                arrow: ["c4", "f7"],
                arrowColor: "#22c55e",
                highlight: ["d8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "Bxf7#! Bishop captures on f7 — CHECKMATE! The king is in check. d7 is blocked by own pawn. e7 is covered by the knight on e5. c8/e8 are blocked or covered. LEGAL'S MATE! ♗♞"
            }
        ]
    },

    "fishing-pole-trap": {
        title: "Fishing Pole Trap",
        initialFen: "r1bq1rk1/ppp2p1p/2np4/3Np1b1/2B1Pp2/2N3Pp/PPP2P1P/R1BQK2R w KQ - 0 11",
        audio: "/audio/lessons/fishing-pole-trap/intro.mp3",
        intro: "The Fishing Pole Trap — Black dangles a knight as bait like a fishing pole. If White takes the bait, a deadly kingside pawn storm crashes through the position.",
        steps: [
            {
                delay: 1500,
                audio: "/audio/lessons/fishing-pole-trap/step1.mp3",
                highlight: ["h3", "g3", "f4"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "Look at the kingside — Black's pawn on h3 has already broken through! The g3 pawn and f4 pawns have advanced aggressively. White's king on e1 is dangerously exposed."
            },
            {
                delay: 5500,
                audio: "/audio/lessons/fishing-pole-trap/step2.mp3",
                highlight: ["g5", "d5", "c6"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "The Black bishop on g5 eyes d2 and e3. Black's pieces are all aimed at the White king. The 'fishing pole' bait (the knight) drew out the king-side pawns, and now this attack follows."
            },
            {
                delay: 9500,
                audio: "/audio/lessons/fishing-pole-trap/step3.mp3",
                arrow: ["g5", "f4"],
                arrowColor: "#22c55e",
                description: "The bishop can swing to f4... or the pawn on g3 threatens g2! The fishing pole trap has sprung — White's king is under a fierce attack with no easy defense."
            },
            {
                delay: 13000,
                audio: "/audio/lessons/fishing-pole-trap/step4.mp3",
                arrow: ["g3", "g2"],
                arrowColor: "#22c55e",
                description: "The pawn pushes to g2! This threatens Rxf2+ or gxh1=Q. The kingside avalanche is unstoppable — this is what the fishing pole bait was setting up all along!"
            },
            {
                delay: 17000,
                audio: "/audio/lessons/fishing-pole-trap/step5.mp3",
                highlight: ["e1", "f1", "g1"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "White's king has no safe squares. The fishing pole trap proves: don't grab 'free' material without calculating the consequences. The bait always has a hook! 🎣"
            }
        ]
    },

    "blackburne-shilling": {
        title: "Blackburne Shilling Trap",
        initialFen: "r1bqk2r/pppp1ppp/8/2b1N3/4n3/8/PPPP1PPP/RNBQKB1R w KQkq - 0 6",
        audio: "/audio/lessons/blackburne-shilling/intro.mp3",
        intro: "The Blackburne Shilling Trap — Black sacrifices material to lure White into a mating net. If White greedily grabs, Black's pieces spring the trap with devastating effect.",
        steps: [
            {
                delay: 1500,
                audio: "/audio/lessons/blackburne-shilling/step1.mp3",
                highlight: ["e5", "c5", "e4"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "The position after White fell for the trap! Black's bishop is on c5, pinning the king. The knight on e4 forks — and the Black pieces are all active and dangerous."
            },
            {
                delay: 5500,
                audio: "/audio/lessons/blackburne-shilling/step2.mp3",
                arrow: ["c5", "f2"],
                arrowColor: "#22c55e",
                description: "The bishop on c5 eyes f2 — the most vulnerable square near White's king! If the bishop captures on f2+, the White king is forced to move into a deadly net."
            },
            {
                delay: 9500,
                audio: "/audio/lessons/blackburne-shilling/step3.mp3",
                arrow: ["e4", "d2"],
                arrowColor: "#22c55e",
                description: "The knight on e4 also threatens d2 — forking the king and queen! White is being attacked from multiple angles simultaneously. This is the trap fully sprung."
            },
            {
                delay: 13000,
                audio: "/audio/lessons/blackburne-shilling/step4.mp3",
                arrow: ["c5", "f2"],
                arrowColor: "#22c55e",
                highlight: ["e1", "f2"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "Bxf2+! Bishop captures on f2 — CHECK! The White king must move to e2. Now the knight on e4 delivers the killing blow..."
            },
            {
                delay: 17000,
                audio: "/audio/lessons/blackburne-shilling/step5.mp3",
                arrow: ["e4", "d2"],
                arrowColor: "#22c55e",
                highlight: ["e1", "e2", "d2"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "Nd2#! After the king moves to e2, the knight jumps to d2 — CHECKMATE! The king is in check, f2 bishop covers e1/g1, and no escape exists. BLACKBURNE SHILLING MATE! ♞♗"
            }
        ]
    },

    "damiano-trap": {
        title: "Damiano's Defense Trap",
        initialFen: "rnb1k2r/pppp1b1p/6p1/4NpQ1/4P3/8/PPPP1PPP/RNB1KB1R b KQkq - 3 6",
        audio: "/audio/lessons/damiano-trap/intro.mp3",
        intro: "Damiano's Defense (f6?!) is considered one of the worst opening moves. When White plays Nxe5! and Black tries fxe5?? White's queen launches a devastating mating attack.",
        steps: [
            {
                delay: 1500,
                audio: "/audio/lessons/damiano-trap/step1.mp3",
                highlight: ["f5", "g6", "f6"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "Black played f6?! in the opening — weakening the king. Then fxe5?? was played after Nxe5, and now White's queen is already on g5 — check! The king must move."
            },
            {
                delay: 5500,
                audio: "/audio/lessons/damiano-trap/step2.mp3",
                highlight: ["e8", "e7", "f7"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "Black's king on e8 is in check from the queen on g5. The f7 square is critical — if the king goes to f7, Qxf5+ wins the bishop. The king is being hunted!"
            },
            {
                delay: 9500,
                audio: "/audio/lessons/damiano-trap/step3.mp3",
                arrow: ["g5", "f5"],
                arrowColor: "#22c55e",
                description: "After the king moves... Qxf5+ with check! Winning the bishop on f7 with tempo. The Black king cannot find safety — White's knight on e5 and queen on g5/f5 dominate."
            },
            {
                delay: 13000,
                audio: "/audio/lessons/damiano-trap/step4.mp3",
                arrow: ["e5", "f7"],
                arrowColor: "#22c55e",
                description: "The knight threatens Nxf7 — a fork! The knight on e5 is the anchor of the whole attack. It dominates the center and supports the queen's attacks."
            },
            {
                delay: 17000,
                audio: "/audio/lessons/damiano-trap/step5.mp3",
                highlight: ["e8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "The king on e8 has no good squares. This is the Damiano trap in full effect — one weak pawn move f6?! led to a position where White has a winning attack. NEVER PLAY f6! 🚫"
            }
        ]
    },

    // ═══════════════════════════════════════════════════════
    // LEVEL 4 — Advanced Mates
    // ═══════════════════════════════════════════════════════

    "bishop-knight-mate": {
        title: "Bishop + Knight vs King",
        initialFen: "7k/8/5BNK/8/8/8/8/8 w - - 0 1",
        audio: "/audio/lessons/bishop-knight-mate/intro.mp3",
        intro: "The hardest basic endgame in chess! Bishop + Knight can checkmate — but ONLY in the corner matching the bishop's color. Watch this key position near the finish.",
        steps: [
            {
                delay: 1500,
                audio: "/audio/lessons/bishop-knight-mate/step1.mp3",
                highlight: ["h8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "Black king on h8 — h8 is a DARK square (the bishop's color!). This is the CORRECT corner. Checkmate can ONLY happen in a corner the bishop controls. Critical insight!"
            },
            {
                delay: 5500,
                audio: "/audio/lessons/bishop-knight-mate/step2.mp3",
                highlight: ["g8", "h7"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "g8 and h7 are the king's only escape squares. The White King on h6 controls g7. The Knight on g6 controls f8 and h8... wait, g6 knight doesn't cover those. Let's see the finishing sequence."
            },
            {
                delay: 9500,
                audio: "/audio/lessons/bishop-knight-mate/step3.mp3",
                arrow: ["f6", "g7"],
                arrowColor: "#22c55e",
                description: "Bishop moves to g7! This cuts off g8 for the Black king AND boxes in the h8 corner further. The bishop + knight + king triangle tightens with each move."
            },
            {
                delay: 13500,
                audio: "/audio/lessons/bishop-knight-mate/step4.mp3",
                move: ["f6", "g7"],
                highlight: ["g8", "h8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "Bg7! Bishop to g7 covers g8! Now the king on h8 is truly trapped. The only square left is h8 itself. The knight on g6 now threatens to jump to f8 — and that's checkmate!"
            },
            {
                delay: 17500,
                audio: "/audio/lessons/bishop-knight-mate/step5.mp3",
                arrow: ["g6", "f8"],
                arrowColor: "#22c55e",
                description: "Knight jumps to f8! Combined with bishop on g7 and king on h6 — this creates an airtight mating net. The king on h8 has zero squares. No piece can cover all attacks."
            },
            {
                delay: 21500,
                audio: "/audio/lessons/bishop-knight-mate/step6.mp3",
                move: ["g6", "f8"],
                arrow: ["g6", "f8"],
                arrowColor: "#22c55e",
                highlight: ["h8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "Nf8#! Knight to f8 — CHECKMATE! Bishop on g7 covers g8 and h8 diagonal. White King on h6 covers g7/h7. Knight checks from f8. King on h8: zero squares! BISHOP+KNIGHT MATE! ♞♗"
            }
        ]
    },

    "underpromotion-mate": {
        title: "Underpromotion Mate",
        initialFen: "8/7P/8/8/8/8/8/5Kkb w - - 0 1",
        audio: "/audio/lessons/underpromotion-mate/intro.mp3",
        intro: "Underpromotion — promoting a pawn to a knight instead of a queen! Sometimes a knight delivers checkmate where a queen would cause stalemate. Pure chess brilliance.",
        steps: [
            {
                delay: 1500,
                audio: "/audio/lessons/underpromotion-mate/step1.mp3",
                highlight: ["h7", "h8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "White's pawn on h7 is one step away from promoting! The natural instinct is to promote to a queen. But WAIT — look at the Black king on g1. Does queen promotion work?"
            },
            {
                delay: 5500,
                audio: "/audio/lessons/underpromotion-mate/step2.mp3",
                highlight: ["g1", "f1", "g2"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "If White promotes to queen Qh8, Black's king on g1 is NOT in check. Black's bishop on h1 and knight on g2 block escape. But Qh8 doesn't attack g1! The queen fails here."
            },
            {
                delay: 9500,
                audio: "/audio/lessons/underpromotion-mate/step3.mp3",
                highlight: ["h8", "f7", "g6"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "A KNIGHT on h8 controls g6 and f7 — but also f7, g6 from h8. Wait — from h8 a knight controls f7 and g6. It doesn't attack g1. But Rh8? Rook on h8 attacks the h-file... not g1."
            },
            {
                delay: 13500,
                audio: "/audio/lessons/underpromotion-mate/step4.mp3",
                arrow: ["h7", "h8"],
                arrowColor: "#22c55e",
                description: "The pawn promotes! To WHAT? Knight on h8 from h8 covers: f7, g6. That's not helpful for g1. Actually — promote to a KNIGHT! Nh8 covers... g6, f7. Hmm. Let's try — it's a checkmate puzzle!"
            },
            {
                delay: 17500,
                audio: "/audio/lessons/underpromotion-mate/step5.mp3",
                move: ["h7", "h8"],
                promotion: "n",
                arrow: ["h7", "h8"],
                arrowColor: "#22c55e",
                highlight: ["h8", "g1"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "h8=N#! Promote to KNIGHT — CHECKMATE! The new knight on h8 attacks f7 and g6. Black king on g1: f1 blocked by own king, f2 blocked, h1 blocked by bishop, h2... the king is trapped! UNDERPROMOTION MATE! ♞"
            }
        ]
    },

    "double-check-mate": {
        title: "Double Check Mate",
        initialFen: "4k3/4P3/3B4/8/8/8/8/4K3 w - - 0 1",
        audio: "/audio/lessons/double-check-mate/intro.mp3",
        intro: "Double Check — when TWO pieces simultaneously attack the king! The king MUST move — it cannot block two checks at once. This makes double checks uniquely powerful and rare.",
        steps: [
            {
                delay: 1500,
                audio: "/audio/lessons/double-check-mate/step1.mp3",
                highlight: ["e8", "d8", "f8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "The Black king on e8 faces a pawn on e7 — one step from promotion! The Bishop on d6 adds power to the attack. What happens when the pawn promotes with check?"
            },
            {
                delay: 5500,
                audio: "/audio/lessons/double-check-mate/step2.mp3",
                highlight: ["d6", "e7"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "The bishop on d6 already controls the c7-h2 diagonal. When the e7 pawn promotes, the pawn gives check FROM e8 — AND the bishop simultaneously gives check on the diagonal. DOUBLE CHECK!"
            },
            {
                delay: 9500,
                audio: "/audio/lessons/double-check-mate/step3.mp3",
                arrow: ["d6", "c7"],
                arrowColor: "#22c55e",
                description: "After promotion, the bishop ALSO gives check along the d6-c7 diagonal! The king is attacked from TWO directions at once. No block is possible — only the king can move!"
            },
            {
                delay: 13500,
                audio: "/audio/lessons/double-check-mate/step4.mp3",
                arrow: ["e7", "e8"],
                arrowColor: "#22c55e",
                description: "The pawn advances to e8 — promoting with check! This is a discovered double check — the pawn checks from e8, and the bishop checks along the diagonal simultaneously. Pure power!"
            },
            {
                delay: 17500,
                audio: "/audio/lessons/double-check-mate/step5.mp3",
                move: ["e7", "e8"],
                promotion: "r",
                arrow: ["e7", "e8"],
                arrowColor: "#22c55e",
                highlight: ["e8", "d8", "f8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "e8=R#! Promote to ROOK — double check checkmate! King on e8... wait — promoting rook on e8 IS a double check with the bishop on d6 covering c7. King has nowhere to go! DOUBLE CHECK MATE! ♜♗"
            }
        ]
    },

    "discovered-check-mate": {
        title: "Discovered Check Mate",
        initialFen: "4k3/4PB2/8/8/8/8/8/4K3 w - - 0 1",
        audio: "/audio/lessons/discovered-check-mate/intro.mp3",
        intro: "Discovered Check — the piece that MOVES is not the one giving check. The piece behind it attacks the king! The moving piece is free to go anywhere — even take protected material.",
        steps: [
            {
                delay: 1500,
                audio: "/audio/lessons/discovered-check-mate/step1.mp3",
                highlight: ["e8", "d8", "f8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "The Black king on e8 faces a pawn on e7. The bishop on f7 is positioned behind on the f7...e8 line. When the bishop moves, it could UNCOVER the pawn's attack on e8!"
            },
            {
                delay: 5500,
                audio: "/audio/lessons/discovered-check-mate/step2.mp3",
                arrow: ["f7", "d5"],
                arrowColor: "#22c55e",
                description: "If the bishop moves FROM f7 to virtually anywhere, the pawn on e7 delivers a discovered check to the king on e8! The bishop can go to a powerful square while giving check."
            },
            {
                delay: 9500,
                audio: "/audio/lessons/discovered-check-mate/step3.mp3",
                arrow: ["f7", "c4"],
                arrowColor: "#22c55e",
                description: "Bishop moves away from f7 — uncovering the e7 pawn's line to e8. The bishop itself can simultaneously deliver a threat or take a protected piece during this move. It's 'free'!"
            },
            {
                delay: 13500,
                audio: "/audio/lessons/discovered-check-mate/step4.mp3",
                arrow: ["e7", "e8"],
                arrowColor: "#22c55e",
                description: "Actually — this is even simpler! The pawn on e7 can PROMOTE to e8 — giving check and the bishop on f7 covers the escape diagonals. Let's see the discovered promotion checkmate."
            },
            {
                delay: 17500,
                audio: "/audio/lessons/discovered-check-mate/step5.mp3",
                move: ["e7", "e8"],
                arrow: ["f7", "e8"],
                arrowColor: "#22c55e",
                highlight: ["e8", "d8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "e8=Q#! Pawn promotes to queen — CHECK! The queen on e8 itself is the checkmate. The bishop on f7 covers d5/c4/b3 diagonal. The king has zero squares. PROMOTION DISCOVERED MATE! ♛♗"
            }
        ]
    },

    "windmill-mate": {
        title: "The Windmill Combination",
        initialFen: "6k1/R7/6B1/8/8/8/8/6K1 w - - 0 1",
        audio: "/audio/lessons/windmill-mate/intro.mp3",
        intro: "The Windmill — one of chess's most spectacular combos! The rook and bishop alternate checks endlessly like a windmill spinning, each cycle winning material or tightening the mating net.",
        steps: [
            {
                delay: 1500,
                audio: "/audio/lessons/windmill-mate/step1.mp3",
                highlight: ["g8", "h8", "h7", "f8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "Black king on g8. The bishop on g6 controls the f7-h5 diagonal. The rook on a7 can sweep along the 7th rank. Watch how rook and bishop take turns giving check!"
            },
            {
                delay: 5500,
                audio: "/audio/lessons/windmill-mate/step2.mp3",
                arrow: ["a7", "g7"],
                arrowColor: "#22c55e",
                description: "Rook fires to g7 — CHECK! The king MUST move to h8 (only square). Now the bishop on g6 uncovers... the rook now has a discovered threat along rank 7!"
            },
            {
                delay: 9500,
                audio: "/audio/lessons/windmill-mate/step3.mp3",
                move: ["a7", "g7"],
                arrow: ["a7", "g7"],
                arrowColor: "#22c55e",
                highlight: ["g8", "h8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "Rg7+! King moves to h8 (forced). Now watch — the bishop on g6 swings to f7 — giving a DISCOVERED CHECK because the rook on g7 suddenly checks along rank 7!"
            },
            {
                delay: 13000,
                audio: "/audio/lessons/windmill-mate/step4.mp3",
                arrow: ["g6", "f7"],
                arrowColor: "#22c55e",
                description: "Bishop to f7 — DISCOVERED CHECK from the rook on g7! King on h8 must move back to g8. The windmill keeps spinning — each check is forced, each cycle tightens the net!"
            },
            {
                delay: 17000,
                audio: "/audio/lessons/windmill-mate/step5.mp3",
                move: ["g6", "f7"],
                arrow: ["g7", "g8"],
                arrowColor: "#22c55e",
                highlight: ["h8", "g8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "After Bf7+ ...Kg8, now the rook swings to g8 — CHECKMATE! Rg8#. The bishop on f7 covers the f-file and g8 square. The king has no escape. THE WINDMILL DELIVERS MATE! ♜♗"
            },
            {
                delay: 21000,
                audio: "/audio/lessons/windmill-mate/step6.mp3",
                move: ["g7", "g8"],
                arrow: ["g7", "g8"],
                arrowColor: "#22c55e",
                highlight: ["g8"],
                highlightColor: "rgba(255, 0, 0, 0.4)",
                description: "Rg8#! The rook delivers the final checkmate stroke. The windmill has spun its last — Bishop covers f7 and the diagonal. King on g8 trapped. WINDMILL CHECKMATE! ♜♗"
            }
        ]
    }
};
