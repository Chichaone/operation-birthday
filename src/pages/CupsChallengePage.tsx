import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScoreBoard from "../components/ScoreBoard";

type CupRound = {
    id: number;
    title: string;
    videoSrc: string;
    description: string | React.ReactNode;
    pointsHint: string;
};

const CUP_ROUNDS: CupRound[] = [
    {
        id: 1,
        title: "Раунд 1 — Собери все стаканчики шариком",
        videoSrc: `${import.meta.env.BASE_URL}videos/cups/round1.mp4`,
        description: (
            <>
                Игроки с помощью воздушного шарика должны собрать стаканчики друг в друга.
                <br />
                <strong>Кто быстрее соберет?</strong>
            </>
        ),
        pointsHint: "1 балл самому быстрому.",
    },
    {
        id: 2,
        title: "Раунд 2 — Башенный Ниндзя",
        videoSrc: `${import.meta.env.BASE_URL}videos/cups/round2.mp4`,
        description: (
            <>
                У каждой команды есть башня из пластиковых стаканчиков, сверху — лёгкий шарик.
                <br />
                <br />
                <strong>Задание:</strong>
                <ul style={{ listStyle: "none", paddingLeft: 0, marginTop: "0.5rem" }}>
                    <li>👉 разобрать башню по одному стаканчику,</li>
                    <li>👉 перекладывая их вниз,</li>
                    <li>👉 <strong>НЕ уронив шарик ни на секунду</strong>.</li>
                </ul>
                Кто разберёт пирамиду быстрее и без ошибок — тот выигрывает раунд.
            </>
        ),
        pointsHint: "1 балл за победу.",
    },
    {
        id: 3,
        title: "Раунд 3 — КРЕСТОФЛИП",
        videoSrc: `${import.meta.env.BASE_URL}videos/cups/round3.mp4`,
        description: (
            <>
                ⚡ <strong>Цель</strong> — выиграть в крестики нолики.
                <br />
                <br />
                <strong>🥤 КАК ПРОХОДИТ РАУНД</strong>
                <div style={{ marginTop: "0.5rem" }}>
                    1️⃣ Каждый игрок подходит к столу. Перед ним стопка своих стаканов.
                </div>
                <div style={{ marginTop: "0.3rem" }}>
                    2️⃣ Игрок берёт верхний стакан и выполняет задачу: <strong>🔄 Перевернуть стакан!</strong>
                    <br />
                    Но не просто перевернуть — нужно сделать «флип»: бросить стакан так, чтобы он встал дном вниз на стол.
                </div>
                <div style={{ marginTop: "0.3rem" }}>
                    3️⃣ Как только игрок успешно перевернул стакан, то быстро ставит стакан в любую свободную клетку.
                </div>
            </>
        ),
        pointsHint: "2 балла команде победителей.",
    },
    {
        id: 4,
        title: "Раунд 4 — Охота за стаканами",
        videoSrc: `${import.meta.env.BASE_URL}videos/cups/round4.mp4`,
        description: (
            <>
                ⚡ <strong>Цель</strong> — собрать все стаканчики быстрее соперника.
                <br />
                <br />
                <strong>🔹 1. Подготовка</strong>
                <br />
                Перед каждым игроком лежит одинаковое количество стаканчиков. В центре лежит игральный кубик.
                <br />
                <br />
                <strong>🔹 2. Ход игрока</strong>
                <br />
                Игрок бросает кубик. 👉 Кубик показывает число 1…6 — столько стаканов он может «собрать» в башню. Но только по правилам:
                <br />
                <strong>Как собирать:</strong>
                <ul style={{ listStyle: "none", paddingLeft: 0, marginTop: "0.3rem" }}>
                    <li>✔ Игрок берет столько стаканчиков, сколько показал кубик</li>
                    <li>✔ Складывает их в башню</li>
                    <li>✔ Ходы происходят по очереди</li>
                    <li>✔ Верхний стаканчик должен быть обязательно твоего цвета</li>
                </ul>
                <br />
                <strong>🔹 3. Кто выигрывает?</strong>
                <br />
                🎉 Первым полностью собравший стопку игрок!
            </>
        ),
        pointsHint: "1 балл за победу.",
    },
    {
        id: 5,
        title: "Раунд 5 — Четыре шага до победы",
        videoSrc: `${import.meta.env.BASE_URL}videos/cups/round5.mp4`,
        description: (
            <>
                Перед игроками поле из линий, похожее на квадратную сетку. На пересечениях стоят стаканчики разных цветов.
                <br />
                <br />
                Каждый игрок по очереди выбирает любой свой стакан и:
                <ul style={{ listStyle: "none", paddingLeft: 0, marginTop: "0.5rem" }}>
                    <li>👉 делает им <strong>4 шага подряд</strong>,</li>
                    <li>👉 каждый шаг — это перемещение на соседнее пересечение квадратика.</li>
                </ul>
                <br />
                <strong>Побеждает тот, чей стаканчик останется последним на поле!</strong>
            </>
        ),
        pointsHint: "2 балла стратегу за победу.",
    },
    {
        id: 6,
        title: "Раунд 6 — СТАКАНОХВАТ",
        videoSrc: `${import.meta.env.BASE_URL}videos/cups/round6.mp4`,
        description: (
            <>
                Финальная битва на реакцию!
                <br />
                <br />
                🎯 <strong>Цель игры:</strong> Поймать подброшенный стакан другим стаканом быстрее и аккуратнее, чем соперник.
            </>
        ),
        pointsHint: "3 балла победителю финала!",
    },
];

type CupsChallengePageProps = {
    stitchScore: number;
    hawaiiScore: number;
    setStitchScore: React.Dispatch<React.SetStateAction<number>>;
    setHawaiiScore: React.Dispatch<React.SetStateAction<number>>;
    team1Name?: string;
    team2Name?: string;
};

const CupsChallengePage: React.FC<CupsChallengePageProps> = ({
    stitchScore,
    hawaiiScore,
    setStitchScore,
    setHawaiiScore,
    team1Name,
    team2Name,
}) => {
    const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    const currentRound = CUP_ROUNDS[currentRoundIndex];

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleNextRound = () => {
        setCurrentRoundIndex((prev) =>
            prev === CUP_ROUNDS.length - 1 ? prev : prev + 1
        );
    };

    const handlePrevRound = () => {
        setCurrentRoundIndex((prev) => (prev === 0 ? prev : prev - 1));
    };

    return (
        <div className={`party-challenges-page party-fade-in ${isVisible ? "party-fade-in-visible" : ""}`}>
            <div className="party-challenges-inner" style={{ flexDirection: "column", alignItems: "center" }}>

                {/* Хедер с навигацией и заголовком */}
                <header className="party-header" style={{ width: "100%", display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: "1rem" }}>
                    <button
                        className="party-button party-btn-gray"
                        style={{ fontSize: "1rem", padding: "0.8rem 1.4rem", color: "black" }}
                        onClick={() => navigate("/challenges")}
                    >
                        ← Назад
                    </button>
                    <h2 className="party-title" style={{ margin: 0, fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>Челлендж Стаканчики</h2>
                    <div style={{ width: "100px" }}></div>
                </header>

                <main className="party-main" style={{ flexDirection: "column", gap: "2rem", width: "100%" }}>

                    {/* Карточка текущего раунда */}
                    <section className="party-challenge-card" style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
                        <div className="party-dance-round-header">
                            <div className="party-challenge-indicator">
                                Раунд {currentRoundIndex + 1} из {CUP_ROUNDS.length}
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

                        <div className="party-challenge-description party-text" style={{ marginTop: "1.5rem" }}>
                            {currentRound.description}
                        </div>
                        <p className="party-challenge-points-hint">
                            {currentRound.pointsHint}
                        </p>

                        <div className="party-challenge-nav">
                            <button
                                className="party-button party-btn-gray"
                                style={{ color: "black" }}
                                onClick={handlePrevRound}
                                disabled={currentRoundIndex === 0}
                            >
                                ← Предыдущий раунд
                            </button>
                            <button
                                className="party-button party-btn-pink"
                                onClick={handleNextRound}
                                disabled={currentRoundIndex === CUP_ROUNDS.length - 1}
                            >
                                Следующий раунд →
                            </button>
                        </div>
                    </section>

                    {/* Счёт */}
                    <ScoreBoard
                        stitchScore={stitchScore}
                        hawaiiScore={hawaiiScore}
                        setStitchScore={setStitchScore}
                        setHawaiiScore={setHawaiiScore}
                        team1Name={team1Name}
                        team2Name={team2Name}
                        style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: "2rem" }}
                    />

                </main>
            </div>
        </div>
    );
};

export default CupsChallengePage;
