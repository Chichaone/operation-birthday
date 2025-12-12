import React from "react";

type ScoreBoardProps = {
    stitchScore: number;
    hawaiiScore: number;
    setStitchScore: React.Dispatch<React.SetStateAction<number>>;
    setHawaiiScore: React.Dispatch<React.SetStateAction<number>>;
    team1Name?: string;
    team2Name?: string;
    style?: React.CSSProperties;
};

const ScoreBoard: React.FC<ScoreBoardProps> = ({
    stitchScore,
    hawaiiScore,
    setStitchScore,
    setHawaiiScore,
    team1Name = "Команда Стича",
    team2Name = "Команда Гавайев",
    style,
}) => {
    const handleAddPoints = (team: "stitch" | "hawaii", delta: number) => {
        if (team === "stitch") {
            setStitchScore((prev) => Math.max(0, prev + delta));
        } else {
            setHawaiiScore((prev) => Math.max(0, prev + delta));
        }
    };

    return (
        <section className="party-scoreboard" style={style}>
            <div className="party-score-card party-score-card-stitch">
                <div className="party-score-header">
                    <span className="party-team-emoji">💙</span>
                    <div>
                        <h3 className="party-score-title">{team1Name}</h3>
                        <p className="party-score-label">Очки</p>
                    </div>
                </div>
                <div className="party-score-value">{stitchScore}</div>
                <div className="party-score-buttons">
                    <button
                        className="party-button party-btn-blue"
                        onClick={() => handleAddPoints("stitch", +1)}
                    >
                        +1
                    </button>
                    <button
                        className="party-button party-btn-blue"
                        onClick={() => handleAddPoints("stitch", +2)}
                    >
                        +2
                    </button>
                    <button
                        className="party-button party-btn-gray"
                        onClick={() => handleAddPoints("stitch", -1)}
                    >
                        -1
                    </button>
                    <button
                        className="party-button party-icon-button party-btn-pink"
                        onClick={() => {
                            if (window.confirm(`Сбросить счёт команды ${team1Name}?`)) {
                                setStitchScore(0);
                            }
                        }}
                        title="Сбросить счёт"
                        aria-label="Сбросить счёт"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="party-score-card party-score-card-hawaii">
                <div className="party-score-header">
                    <span className="party-team-emoji">🌴</span>
                    <div>
                        <h3 className="party-score-title">{team2Name}</h3>
                        <p className="party-score-label">Очки</p>
                    </div>
                </div>
                <div className="party-score-value">{hawaiiScore}</div>
                <div className="party-score-buttons">
                    <button
                        className="party-button party-btn-green"
                        onClick={() => handleAddPoints("hawaii", +1)}
                    >
                        +1
                    </button>
                    <button
                        className="party-button party-btn-green"
                        onClick={() => handleAddPoints("hawaii", +2)}
                    >
                        +2
                    </button>
                    <button
                        className="party-button party-btn-gray"
                        onClick={() => handleAddPoints("hawaii", -1)}
                    >
                        -1
                    </button>
                    <button
                        className="party-button party-icon-button party-btn-pink"
                        onClick={() => {
                            if (window.confirm(`Сбросить счёт команды ${team2Name}?`)) {
                                setHawaiiScore(0);
                            }
                        }}
                        title="Сбросить счёт"
                        aria-label="Сбросить счёт"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ScoreBoard;
