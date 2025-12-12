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
}

const MusicToggle = ({
    isPlaying,
    onToggle,
}: {
    isPlaying: boolean;
    onToggle: () => void;
}) => (
    <button
        onClick={onToggle}
        className="party-music-toggle-fixed"
        title={isPlaying ? "Выключить музыку" : "Включить музыку"}
        aria-label={isPlaying ? "Выключить музыку" : "Включить музыку"}
    >
        {isPlaying ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 11.995C17.0039 13.3208 16.4774 14.5924 15.54 15.53M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        )}
    </button>
)

const App: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isMusicOn, setIsMusicOn] = useState(false);

    // 🔹 глобальное состояние игроков, команд и счёта
    const [players, setPlayers] = useState<string[]>(() => {
        const saved = localStorage.getItem("players");
        return saved ? JSON.parse(saved) : [""];
    });
    const [teamStitch, setTeamStitch] = useState<string[]>(() => {
        const saved = localStorage.getItem("teamStitch");
        return saved ? JSON.parse(saved) : [];
    });
    const [teamHawaii, setTeamHawaii] = useState<string[]>(() => {
        const saved = localStorage.getItem("teamHawaii");
        return saved ? JSON.parse(saved) : [];
    });
    // 🔹 Названия команд и эмодзи
    const [team1Name, setTeam1Name] = useState(() => {
        const saved = localStorage.getItem("team1Name");
        return saved || "Команда Стича";
    });
    const [team1Emoji, setTeam1Emoji] = useState(() => {
        const saved = localStorage.getItem("team1Emoji");
        return saved || "💙";
    });
    const [team2Name, setTeam2Name] = useState(() => {
        const saved = localStorage.getItem("team2Name");
        return saved || "Команда Гавайев";
    });
    const [team2Emoji, setTeam2Emoji] = useState(() => {
        const saved = localStorage.getItem("team2Emoji");
        return saved || "🌴";
    });

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

    // Сохранение настроек команд
    useEffect(() => {
        localStorage.setItem("players", JSON.stringify(players));
    }, [players]);

    useEffect(() => {
        localStorage.setItem("teamStitch", JSON.stringify(teamStitch));
    }, [teamStitch]);

    useEffect(() => {
        localStorage.setItem("teamHawaii", JSON.stringify(teamHawaii));
    }, [teamHawaii]);

    useEffect(() => {
        localStorage.setItem("team1Name", team1Name);
    }, [team1Name]);

    useEffect(() => {
        localStorage.setItem("team1Emoji", team1Emoji);
    }, [team1Emoji]);

    useEffect(() => {
        localStorage.setItem("team2Name", team2Name);
    }, [team2Name]);

    useEffect(() => {
        localStorage.setItem("team2Emoji", team2Emoji);
    }, [team2Emoji]);

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
            <audio ref={audioRef} src={`${import.meta.env.BASE_URL}audio/intro.mp3`} className="hidden" loop />

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
                            team1Emoji={team1Emoji}
                            setTeam1Emoji={setTeam1Emoji}
                            team2Name={team2Name}
                            setTeam2Name={setTeam2Name}
                            team2Emoji={team2Emoji}
                            setTeam2Emoji={setTeam2Emoji}
                            stitchScore={stitchScore}
                            setStitchScore={setStitchScore}
                            hawaiiScore={hawaiiScore}
                            setHawaiiScore={setHawaiiScore}
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
            </Routes >
        </div >
    );
};

export default App;
