// src/pages/PhotoRepeatPage.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScoreBoard from "../components/ScoreBoard";
import ChallengeHeader from "../components/ChallengeHeader";

type TabType = "yoga" | "tomjerry";

type PhotoRound = {
    id: string;
    title: string;
    previewImage: string; // картинка, которую надо повторить
    answerImage?: string; // опционально (если хочешь показывать "как должно быть")
    hint?: string;
    points?: number;
};

type PhotoRepeatPageProps = {
    stitchScore: number;
    hawaiiScore: number;
    setStitchScore: React.Dispatch<React.SetStateAction<number>>;
    setHawaiiScore: React.Dispatch<React.SetStateAction<number>>;
    team1Name?: string;
    team2Name?: string;
};

const PhotoRepeatPage: React.FC<PhotoRepeatPageProps> = ({
    stitchScore,
    hawaiiScore,
    setStitchScore,
    setHawaiiScore,
    team1Name,
    team2Name,
}) => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    // --- вкладки ---
    const [activeTab, setActiveTab] = useState<TabType>("yoga");

    // --- индексы раундов для каждой вкладки ---
    const [yogaIndex, setYogaIndex] = useState(0);
    const [tomIndex, setTomIndex] = useState(0);

    // скролл к карточке
    const mainRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const t = setTimeout(() => setIsVisible(true), 80);
        setTimeout(() => mainRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 120);
        return () => clearTimeout(t);
    }, []);

    // --- данные ---
    const YOGA_ROUNDS: PhotoRound[] = useMemo(
        () => [
            {
                id: "yoga-1",
                title: "Йога-поза 1",
                previewImage: `${import.meta.env.BASE_URL}images/photo-repeat/yoga/yoga-1.jpg`,
                hint: "Держим баланс и улыбаемся 😄",
                points: 1,
            },
            {
                id: "yoga-2",
                title: "Йога-поза 2",
                previewImage: `${import.meta.env.BASE_URL}images/photo-repeat/yoga/yoga-2.jpg`,
                hint: "Главное — старание, не идеал 😉",
                points: 1,
            },
            {
                id: "yoga-3",
                title: "Йога-поза 3",
                previewImage: `${import.meta.env.BASE_URL}images/photo-repeat/yoga/yoga-3.jpg`,
                hint: "Тянемся, но без фанатизма!",
                points: 2,
            },
            {
                id: "yoga-4",
                title: "Йога-поза 4",
                previewImage: `${import.meta.env.BASE_URL}images/photo-repeat/yoga/yoga-4.jpg`,
                hint: "Тянемся, но без фанатизма!",
                points: 2,
            },
            {
                id: "yoga-5",
                title: "Йога-поза 5",
                previewImage: `${import.meta.env.BASE_URL}images/photo-repeat/yoga/yoga-5.jpg`,
                hint: "Тянемся, но без фанатизма!",
                points: 2,
            },
            {
                id: "yoga-6",
                title: "Йога-поза 6",
                previewImage: `${import.meta.env.BASE_URL}images/photo-repeat/yoga/yoga-6.jpg`,
                hint: "Тянемся, но без фанатизма!",
                points: 2,
            },
            {
                id: "yoga-7",
                title: "Йога-поза 7",
                previewImage: `${import.meta.env.BASE_URL}images/photo-repeat/yoga/yoga-7.jpg`,
                hint: "Тянемся, но без фанатизма!",
                points: 2,
            },
            {
                id: "yoga-8",
                title: "Йога-поза 8",
                previewImage: `${import.meta.env.BASE_URL}images/photo-repeat/yoga/yoga-8.jpg`,
                hint: "Тянемся, но без фанатизма!",
                points: 2,
            },
            {
                id: "yoga-9",
                title: "Йога-поза 9",
                previewImage: `${import.meta.env.BASE_URL}images/photo-repeat/yoga/yoga-9.jpg`,
                hint: "Тянемся, но без фанатизма!",
                points: 2,
            },
            {
                id: "yoga-10",
                title: "Йога-поза 10",
                previewImage: `${import.meta.env.BASE_URL}images/photo-repeat/yoga/yoga-10.jpg`,
                hint: "Тянемся, но без фанатизма!",
                points: 2,
            },
            {
                id: "yoga-11",
                title: "Йога-поза 11",
                previewImage: `${import.meta.env.BASE_URL}images/photo-repeat/yoga/yoga-11.jpg`,
                hint: "Тянемся, но без фанатизма!",
                points: 2,
            },
            {
                id: "yoga-12",
                title: "Йога-поза 12",
                previewImage: `${import.meta.env.BASE_URL}images/photo-repeat/yoga/yoga-12.jpg`,
                hint: "Тянемся, но без фанатизма!",
                points: 2,
            },
        ],
        []
    );

    const TOM_ROUNDS: PhotoRound[] = useMemo(
        () => [
            {
                id: "tom-1",
                title: "Том и Джерри 1",
                previewImage: `${import.meta.env.BASE_URL}images/photo-repeat/tomjerry/tj-1.jpg`,
                hint: "Переиграй как актёр 😎",
                points: 1,
            },
            {
                id: "tom-2",
                title: "Том и Джерри 2",
                previewImage: `${import.meta.env.BASE_URL}images/photo-repeat/tomjerry/tj-2.jpg`,
                hint: "Добавь эмоций: удивление/страх/смех 😂",
                points: 1,
            },
            {
                id: "tom-3",
                title: "Том и Джерри 3",
                previewImage: `${import.meta.env.BASE_URL}images/photo-repeat/tomjerry/tj-3.jpg`,
                hint: "Повторяй позу, но можно чуть смешнее!",
                points: 2,
            },
            {
                id: "tom-4",
                title: "Том и Джерри 4",
                previewImage: `${import.meta.env.BASE_URL}images/photo-repeat/tomjerry/tj-4.jpg`,
                hint: "Повторяй позу, но можно чуть смешнее!",
                points: 2,
            },
            {
                id: "tom-5",
                title: "Том и Джерри 5",
                previewImage: `${import.meta.env.BASE_URL}images/photo-repeat/tomjerry/tj-5.jpg`,
                hint: "Повторяй позу, но можно чуть смешнее!",
                points: 2,
            },
            {
                id: "tom-6",
                title: "Том и Джерри 6",
                previewImage: `${import.meta.env.BASE_URL}images/photo-repeat/tomjerry/tj-6.jpg`,
                hint: "Повторяй позу, но можно чуть смешнее!",
                points: 2,
            },
            {
                id: "tom-7",
                title: "Том и Джерри 7",
                previewImage: `${import.meta.env.BASE_URL}images/photo-repeat/tomjerry/tj-7.jpg`,
                hint: "Повторяй позу, но можно чуть смешнее!",
                points: 2,
            },
            {
                id: "tom-8",
                title: "Том и Джерри 8",
                previewImage: `${import.meta.env.BASE_URL}images/photo-repeat/tomjerry/tj-8.jpg`,
                hint: "Повторяй позу, но можно чуть смешнее!",
                points: 2,
            },
            {
                id: "tom-9",
                title: "Том и Джерри 9",
                previewImage: `${import.meta.env.BASE_URL}images/photo-repeat/tomjerry/tj-9.jpg`,
                hint: "Повторяй позу, но можно чуть смешнее!",
                points: 2,
            },
            {
                id: "tom-10",
                title: "Том и Джерри 10",
                previewImage: `${import.meta.env.BASE_URL}images/photo-repeat/tomjerry/tj-10.jpg`,
                hint: "Повторяй позу, но можно чуть смешнее!",
                points: 2,
            },
        ],
        []
    );

    const rounds = activeTab === "yoga" ? YOGA_ROUNDS : TOM_ROUNDS;
    const index = activeTab === "yoga" ? yogaIndex : tomIndex;

    const isGameOver = index >= rounds.length;
    const currentRound = !isGameOver ? rounds[index] : null;

    // --- переключение вкладок ---
    const handleTab = (tab: TabType) => {
        if (tab === activeTab) return;
        setActiveTab(tab);
    };

    // --- навигация ---
    const prev = () => {
        if (activeTab === "yoga") setYogaIndex((p) => (p > 0 ? p - 1 : 0));
        else setTomIndex((p) => (p > 0 ? p - 1 : 0));
    };

    const next = () => {
        if (activeTab === "yoga") setYogaIndex((p) => (p < YOGA_ROUNDS.length ? p + 1 : p));
        else setTomIndex((p) => (p < TOM_ROUNDS.length ? p + 1 : p));
    };

    const award = (team: "Stitch" | "Hawaii") => {
        if (!currentRound?.points) return;
        if (team === "Stitch") setStitchScore((p) => p + currentRound.points!);
        else setHawaiiScore((p) => p + currentRound.points!);
    };

    return (
        <div className={`party-challenges-page party-fade-in ${isVisible ? "party-fade-in-visible" : ""}`}>
            <div className="party-challenges-inner" style={{ flexDirection: "column", alignItems: "center" }}>
                <ChallengeHeader title="📸 Повтори Фото" />

                {/* Фиксированный счет слева */}
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

                {/* Табы (2 раздела) */}
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: "1rem",
                        marginTop: "1rem",
                        marginBottom: "1.5rem",
                        width: "100%",
                        maxWidth: "800px",
                    }}
                >
                    <button
                        className={`party-button ${activeTab === "yoga" ? "party-btn-blue" : "party-btn-gray"}`}
                        onClick={() => handleTab("yoga")}
                        style={{ flex: "1 1 280px", color: activeTab === "yoga" ? "white" : "black" }}
                    >
                        🧘 Повтори йога-позу
                    </button>

                    <button
                        className={`party-button ${activeTab === "tomjerry" ? "party-btn-pink" : "party-btn-gray"}`}
                        onClick={() => handleTab("tomjerry")}
                        style={{ flex: "1 1 280px", color: activeTab === "tomjerry" ? "white" : "black" }}
                    >
                        🐭🐱 Повтори за Том и Джерри
                    </button>
                </div>

                <main
                    className="party-main"
                    ref={mainRef as unknown as React.RefObject<HTMLElement>}
                    style={{ flexDirection: "column", gap: "2rem", width: "100%", alignItems: "center" }}
                >
                    {!isGameOver && currentRound ? (
                        <div style={{ position: "relative", width: "100%", maxWidth: "800px" }}>
                            {/* Назад */}
                            <button
                                className="party-card-nav-button party-card-nav-prev"
                                onClick={prev}
                                disabled={index === 0}
                                title="Назад"
                                aria-label="Назад"
                            >
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            {/* Карточка */}
                            <section className="party-challenge-card" style={{ textAlign: "center", padding: "2rem" }}>
                                <div style={{ marginBottom: "0.75rem", color: "#666" }}>
                                    {activeTab === "yoga" ? "Йога" : "Том и Джерри"} — раунд {index + 1} из {rounds.length}
                                </div>

                                <h3 className="party-challenge-title" style={{ marginBottom: "1rem" }}>
                                    {currentRound.title}
                                </h3>

                                {/* Фото для повторения */}
                                <div
                                    style={{
                                        width: "100%",
                                        maxWidth: "520px",
                                        margin: "0 auto",
                                        borderRadius: "1rem",
                                        overflow: "hidden",
                                        boxShadow: "0 14px 40px rgba(0,0,0,0.25)",
                                        border: "4px solid rgba(255,255,255,0.8)",
                                        background: "#fff",
                                    }}
                                >
                                    <img
                                        src={currentRound.previewImage}
                                        alt={currentRound.title}
                                        style={{ width: "100%", height: "auto", display: "block" }}
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                            const p = e.currentTarget.parentElement!;
                                            p.innerText = "🖼️ Фото не найдено";
                                            p.style.display = "flex";
                                            p.style.alignItems = "center";
                                            p.style.justifyContent = "center";
                                            p.style.height = "260px";
                                            p.style.fontSize = "1.2rem";
                                            p.style.color = "#666";
                                        }}
                                    />
                                </div>

                                {/* Хинт */}
                                {currentRound.hint && (
                                    <p className="party-text" style={{ marginTop: "1rem" }}>
                                        <strong>Подсказка:</strong> {currentRound.hint}
                                    </p>
                                )}

                            </section>

                            {/* Вперед */}
                            <button
                                className="party-card-nav-button party-card-nav-next"
                                onClick={next}
                                disabled={index >= rounds.length - 1}
                                title="Вперёд"
                                aria-label="Вперёд"
                            >
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <section className="party-challenge-card" style={{ width: "100%", maxWidth: "800px", textAlign: "center", padding: "2.5rem" }}>
                            <h2 style={{ fontSize: "2rem", margin: 0 }}>🎉 Этот раздел закончился!</h2>
                            <p className="party-text" style={{ marginTop: "0.75rem" }}>
                                {activeTab === "yoga" ? "Йога-позы" : "Том и Джерри"} пройдены ✅
                            </p>

                            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "1.5rem" }}>
                                <button className="party-button party-btn-gray" style={{ color: "black" }} onClick={() => navigate("/challenges")}>
                                    К списку конкурсов
                                </button>
                                <button
                                    className={`party-button ${activeTab === "yoga" ? "party-btn-pink" : "party-btn-blue"}`}
                                    onClick={() => handleTab(activeTab === "yoga" ? "tomjerry" : "yoga")}
                                >
                                    Перейти к {activeTab === "yoga" ? "Том и Джерри" : "Йоге"} →
                                </button>
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};

export default PhotoRepeatPage;
