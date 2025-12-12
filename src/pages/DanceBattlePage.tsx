import React, { useState, useEffect } from "react";
import ScoreBoard from "../components/ScoreBoard";
import ChallengeHeader from "../components/ChallengeHeader";

type DanceRound = {
    id: number;
    title: string;
    videoSrc: string;
    description: string;
    pointsHint: string;
};

const DANCE_ROUNDS: DanceRound[] = [
    {
        id: 1,
        title: "Раунд 1 — Разминка",
        videoSrc: `${import.meta.env.BASE_URL}videos/dance/round1.mp4`,
        description:
            "Повторяем простой и понятный танцевальный тренд. Главное — не стесняться и войти в настроение вечеринки.",
        pointsHint: "Победившей команде дается 1 балл за самый дружный и уверенный танец.",
    },
    {
        id: 2,
        title: "Раунд 2 — Ускоряемся",
        videoSrc: `${import.meta.env.BASE_URL}videos/dance/round2.mp4`,
        description:
            "Танец уже быстрее и с более сложными движениями. Смотрите видео, тренируйтесь пару раз, а потом показывайте перед всеми.",
        pointsHint: "Победившей команде дается 1 балл за синхронность и энергию.",
    },
    {
        id: 3,
        title: "Раунд 3 — Супер-челлендж",
        videoSrc: `${import.meta.env.BASE_URL}videos/dance/round3.mp4`,
        description:
            "Самый дружный танец вечера)",
        pointsHint:
            "Этому раунду дается 2 балла победителю",
    },
    {
        id: 4,
        title: "Раунд 4 — Импровизация",
        videoSrc: `${import.meta.env.BASE_URL}videos/dance/round4.mp4`,
        description:
            "Никаких правил! Вся команда выходит в центр и показывает свои лучшие движения. В данном тренде можно добавить креативности и импровизации)",
        pointsHint: "За креативность и смелость — 2 балла.",
    },
    {
        id: 5,
        title: "Раунд 5 — Финальный отрыв",
        videoSrc: `${import.meta.env.BASE_URL}videos/dance/round5.mp4`,
        description:
            "Включаем самый зажигательный трек. Все выходят на танцпол и танцуют вместе. Побеждает дружба (но баллы всё равно можно дать!).",
        pointsHint: "3 балла самой активной команде.",
    },
];

type DanceBattlePageProps = {
    stitchScore: number;
    hawaiiScore: number;
    setStitchScore: React.Dispatch<React.SetStateAction<number>>;
    setHawaiiScore: React.Dispatch<React.SetStateAction<number>>;
    team1Name?: string;
    team2Name?: string;
};

const DanceBattlePage: React.FC<DanceBattlePageProps> = ({
    stitchScore,
    hawaiiScore,
    setStitchScore,
    setHawaiiScore,
    team1Name,
    team2Name,
}) => {
    const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const currentRound = DANCE_ROUNDS[currentRoundIndex];

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleNextRound = () => {
        setCurrentRoundIndex((prev) =>
            prev === DANCE_ROUNDS.length - 1 ? prev : prev + 1
        );
    };

    const handlePrevRound = () => {
        setCurrentRoundIndex((prev) => (prev === 0 ? prev : prev - 1));
    };



    return (
        <div className={`party-challenges-page party-fade-in ${isVisible ? "party-fade-in-visible" : ""}`}>
            <div className="party-challenges-inner" style={{ flexDirection: "column", alignItems: "center" }}>

                <ChallengeHeader title="Танцевальный Баттл" />

                {/* Фиксированный счёт слева */}
                <div className="party-scoreboard-fixed">
                    <ScoreBoard
                        stitchScore={stitchScore}
                        hawaiiScore={hawaiiScore}
                        setStitchScore={setStitchScore}
                        setHawaiiScore={setHawaiiScore}
                        team1Name={team1Name}
                        team2Name={team2Name}
                    />
                </div>

                <main className="party-main" style={{ flexDirection: "column", gap: "2rem", width: "100%" }}>


                    {/* Контейнер с карточкой и кнопками навигации */}
                    <div style={{ position: "relative", width: "100%", maxWidth: "800px", margin: "0 auto" }}>
                        {/* Кнопка предыдущего раунда */}
                        <button
                            className="party-card-nav-button party-card-nav-prev"
                            onClick={handlePrevRound}
                            disabled={currentRoundIndex === 0}
                            title="Предыдущий раунд"
                            aria-label="Предыдущий раунд"
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {/* Карточка текущего раунда */}
                        <section className="party-challenge-card">
                            <div className="party-dance-round-header">
                                <div className="party-challenge-indicator">
                                    Раунд {currentRoundIndex + 1} из {DANCE_ROUNDS.length}
                                </div>
                                <h3 className="party-challenge-title">{currentRound.title}</h3>
                            </div>

                            <div className="party-dance-video-wrapper" style={{ marginTop: "1rem", borderRadius: "1rem", overflow: "hidden", background: "#000" }}>
                                <video
                                    key={currentRound.videoSrc}
                                    className="party-dance-video"
                                    style={{ width: "100%", maxHeight: "50vh", display: "block" }}
                                    controls
                                    src={currentRound.videoSrc}
                                >
                                    Ваш браузер не поддерживает видео.
                                </video>
                            </div>

                            <p className="party-challenge-description party-text" style={{ marginTop: "1.5rem" }}>
                                {currentRound.description}
                            </p>
                            <p className="party-challenge-points-hint">
                                {currentRound.pointsHint}
                            </p>
                        </section>

                        {/* Кнопка следующего раунда */}
                        <button
                            className="party-card-nav-button party-card-nav-next"
                            onClick={handleNextRound}
                            disabled={currentRoundIndex === DANCE_ROUNDS.length - 1}
                            title="Следующий раунд"
                            aria-label="Следующий раунд"
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                </main>
            </div>
        </div>
    );
};

export default DanceBattlePage;
