import React, { useMemo, useRef, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import WelcomePage from "./pages/WelcomePage";
import TeamsPage from "./pages/TeamsPage";
import ChallengesPage from "./pages/ChallengesPage";
import DanceBattlePage from "./pages/DanceBattlePage";
import CupsChallengePage from "./pages/CupsChallengePage";
import EmojiGuessPage from "./pages/EmojiGuessPage";
import BirthdayQuizPage from "./pages/BirthdayQuizPage";

type FloatingShape = {
    type: "circle" | "star" | "diamond" | "heart";
    left: string;
    top: string;
    size: number;
    duration: number;
    delay: number;
    opacity?: number;
};

const MusicToggle = ({
    isPlaying,
    onToggle,
}: {
    isPlaying: boolean;
    onToggle: () => void;
}) => (
    <div className="party-music-wrapper">
        <button onClick={onToggle} className="party-music-toggle">
            Музыка: {isPlaying ? "вкл" : "выкл"}
        </button>
    </div>
);

const App: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isMusicOn, setIsMusicOn] = useState(false);

    // 🔹 глобальное состояние игроков, команд и счёта
    const [players, setPlayers] = useState<string[]>([""]);
    const [teamStitch, setTeamStitch] = useState<string[]>([]);
    const [teamHawaii, setTeamHawaii] = useState<string[]>([]);
    // 🔹 Названия команд
    const [team1Name, setTeam1Name] = useState("Команда Стича");
    const [team2Name, setTeam2Name] = useState("Команда Гавайев");

    const [stitchScore, setStitchScore] = useState(() => {
        const saved = localStorage.getItem("stitchScore");
        return saved ? parseInt(saved, 10) : 0;
    });
    const [hawaiiScore, setHawaiiScore] = useState(() => {
        const saved = localStorage.getItem("hawaiiScore");
        return saved ? parseInt(saved, 10) : 0;
    });

    const [challengeIndex, setChallengeIndex] = useState(() => {
        const saved = localStorage.getItem("challengeIndex");
        return saved ? parseInt(saved, 10) : 0;
    });

    // Сохранение индекса челленджа
    useEffect(() => {
        localStorage.setItem("challengeIndex", challengeIndex.toString());
    }, [challengeIndex]);

    const floatingShapes = useMemo<FloatingShape[]>(
        () => [
            { type: "circle", left: "8%", top: "10%", size: 10, duration: 16, delay: 0 },
            { type: "star", left: "20%", top: "35%", size: 14, duration: 18, delay: 2 },
            { type: "diamond", left: "70%", top: "15%", size: 12, duration: 15, delay: 1 },
            { type: "circle", left: "85%", top: "30%", size: 18, duration: 20, delay: 3 },
            { type: "heart", left: "50%", top: "20%", size: 16, duration: 17, delay: 1.5 },
            { type: "star", left: "15%", top: "70%", size: 18, duration: 19, delay: 0.5 },
            { type: "diamond", left: "60%", top: "75%", size: 14, duration: 16, delay: 2.5 },
            { type: "circle", left: "75%", top: "55%", size: 12, duration: 18, delay: 0.8 },
            { type: "heart", left: "35%", top: "60%", size: 14, duration: 21, delay: 1.2 },
        ],
        []
    );

    // Сохранение счёта
    useEffect(() => {
        localStorage.setItem("stitchScore", stitchScore.toString());
        localStorage.setItem("hawaiiScore", hawaiiScore.toString());
    }, [stitchScore, hawaiiScore]);

    const handleToggleMusic = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isMusicOn) {
            audio.pause();
            setIsMusicOn(false);
        } else {
            audio
                .play()
                .then(() => setIsMusicOn(true))
                .catch(() => setIsMusicOn(false));
        }
    };

    return (
        <div className="party-background">
            {/* музыка */}
            <audio ref={audioRef} src="/audio/intro.mp3" className="hidden" loop />

            {/* декорации */}
            <div className="party-decorations" aria-hidden={true}>
                {floatingShapes.map((shape, index) => (
                    <span
                        key={`${shape.type}-${index}`}
                        className={`party-floating-element party-${shape.type}`}
                        style={{
                            left: shape.left,
                            top: shape.top,
                            width: shape.size,
                            height: shape.size,
                            animationDuration: `${shape.duration}s`,
                            animationDelay: `${shape.delay}s`,
                            opacity: shape.opacity ?? 0.6,
                        }}
                    />
                ))}
            </div>

            <MusicToggle isPlaying={isMusicOn} onToggle={handleToggleMusic} />

            <Routes>
                <Route path="/" element={<WelcomePage />} />

                <Route
                    path="/teams"
                    element={
                        <TeamsPage
                            players={players}
                            setPlayers={setPlayers}
                            teamStitch={teamStitch}
                            setTeamStitch={setTeamStitch}
                            teamHawaii={teamHawaii}
                            setTeamHawaii={setTeamHawaii}
                            team1Name={team1Name}
                            setTeam1Name={setTeam1Name}
                            team2Name={team2Name}
                            setTeam2Name={setTeam2Name}
                        />
                    }
                />

                <Route
                    path="/challenges"
                    element={
                        <ChallengesPage
                            stitchScore={stitchScore}
                            hawaiiScore={hawaiiScore}
                            setStitchScore={setStitchScore}
                            setHawaiiScore={setHawaiiScore}
                            challengeIndex={challengeIndex}
                            setChallengeIndex={setChallengeIndex}
                            team1Name={team1Name}
                            team2Name={team2Name}
                        />
                    }
                />
                <Route
                    path="/dance-battle"
                    element={
                        <DanceBattlePage
                            stitchScore={stitchScore}
                            hawaiiScore={hawaiiScore}
                            setStitchScore={setStitchScore}
                            setHawaiiScore={setHawaiiScore}
                            team1Name={team1Name}
                            team2Name={team2Name}
                        />
                    }
                />
                <Route
                    path="/cups-challenge"
                    element={
                        <CupsChallengePage
                            stitchScore={stitchScore}
                            hawaiiScore={hawaiiScore}
                            setStitchScore={setStitchScore}
                            setHawaiiScore={setHawaiiScore}
                            team1Name={team1Name}
                            team2Name={team2Name}
                        />
                    }
                />
                <Route
                    path="/emoji"
                    element={
                        <EmojiGuessPage
                            stitchScore={stitchScore}
                            hawaiiScore={hawaiiScore}
                            setStitchScore={setStitchScore}
                            setHawaiiScore={setHawaiiScore}
                            team1Name={team1Name}
                            team2Name={team2Name}
                        />
                    }
                />
                <Route
                    path="/birthday-quiz"
                    element={
                        <BirthdayQuizPage
                            stitchScore={stitchScore}
                            hawaiiScore={hawaiiScore}
                            setStitchScore={setStitchScore}
                            setHawaiiScore={setHawaiiScore}
                            team1Name={team1Name}
                            team2Name={team2Name}
                        />
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
