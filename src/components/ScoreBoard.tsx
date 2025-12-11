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
                </div>
            </div>
        </section>
    );
};

export default ScoreBoard;
