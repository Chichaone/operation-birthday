import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ScoreBoard from "../components/ScoreBoard";

// --- ДАННЫЕ МУЛЬТФИЛЬМОВ ---
export type EmojiCartoonItem = {
    id: string;
    type: "cartoon";
    emojis: string[];
    answer: string;
    image: string;
};

export const emojiCartoons: EmojiCartoonItem[] = [
    {
        id: "frozen",
        type: "cartoon",
        emojis: ["👸", "🥶", "❤️"],
        answer: "Холодное сердце",
        image: `${import.meta.env.BASE_URL}images/cartoons/frozen.jpg`,
    },
    {
        id: "sing",
        type: "cartoon",
        emojis: ["🐨", "🐭", "🐘", "🦔", "🦍", "🐷"],
        answer: "Зверопой",
        image: `${import.meta.env.BASE_URL}images/cartoons/sing.jpg`,
    },
    {
        id: "ratatouille",
        type: "cartoon",
        emojis: ["🐭", "👨‍🍳", "🍲"],
        answer: "Рататуй",
        image: `${import.meta.env.BASE_URL}images/cartoons/ratatouille.jpg`,
    },
    {
        id: "rapunzel",
        type: "cartoon",
        emojis: ["🏰", "👱‍♀️✂️", "🦎"],
        answer: "Рапунцель",
        image: `${import.meta.env.BASE_URL}images/cartoons/rapunzel.jpg`,
    },
    {
        id: "turning-red",
        type: "cartoon",
        emojis: ["👧", "🔴", "🐼"],
        answer: "Я краснею",
        image: `${import.meta.env.BASE_URL}images/cartoons/turning-red.jpg`,
    },
    {
        id: "madagascar",
        type: "cartoon",
        emojis: ["🦁", "🦓", "🦒", "🦛", "🏝️"],
        answer: "Мадагаскар",
        image: `${import.meta.env.BASE_URL}images/cartoons/madagascar.jpg`,
    },
    {
        id: "ralph",
        type: "cartoon",
        emojis: ["🕹️", "💪", "🍭", "🏎️"],
        answer: "Ральф",
        image: `${import.meta.env.BASE_URL}images/cartoons/ralph.jpg`,
    },
    {
        id: "coco",
        type: "cartoon",
        emojis: ["👦", "🎸", "💀"],
        answer: "Тайна Коко",
        image: `${import.meta.env.BASE_URL}images/cartoons/coco.jpg`,
    },
    {
        id: "despicable-me",
        type: "cartoon",
        emojis: ["🍌", "👀", "🟡", "🦹‍♂️"],
        answer: "Гадкий я",
        image: `${import.meta.env.BASE_URL}images/cartoons/despicable-me.jpg`,
    },
    {
        id: "inside-out",
        type: "cartoon",
        emojis: ["😄", "😔", "🤢", "😡", "😱"],
        answer: "Головоломка",
        image: `${import.meta.env.BASE_URL}images/cartoons/inside-out.jpg`,
    },
];

// --- ДАННЫЕ ПЕСЕН ---
export type MusicEmojiItem = {
    emojis: string[];
    answer: string;
    audio: string;
};

export const musicEmojiData: MusicEmojiItem[] = [
    {
        emojis: ["❓", "🤤", "💃", "👉", "💃", "💃"],
        answer: "Само собой — Артур Пирожков",
        audio: `${import.meta.env.BASE_URL}audio/songs/samo-soboi.mp3`
    },
    {
        emojis: ["🪑", "🦫", "👦", "🪵"],
        answer: "Бобр — Слава Скрипка",
        audio: `${import.meta.env.BASE_URL}audio/songs/bobr.mp3`
    },
    {
        emojis: ["👧", "👉", "🖼️"],
        answer: "Девочка с картинки — Егор Крид",
        audio: `${import.meta.env.BASE_URL}audio/songs/devocka-s-kartinki.mp3`
    },
    {
        emojis: ["1️⃣", "🌾", "🌾", "🗡️"],
        answer: "Один в поле воин — Bearwolf",
        audio: `${import.meta.env.BASE_URL}audio/songs/odin-v-pole-voin.mp3`
    },
    {
        emojis: ["🙋‍♀️", "👑"],
        answer: "Царица — Anna Asti",
        audio: `${import.meta.env.BASE_URL}audio/songs/carica.mp3`
    },
    {
        emojis: ["🤫", "🤫", "👦"],
        answer: "Сигма бой — BETSY & Мария Янковская",
        audio: `${import.meta.env.BASE_URL}audio/songs/sigma-boi.mp3`
    },
    {
        emojis: ["🐰", "🐰", "🙅‍♀️", "🐰"],
        answer: "Марьяна Локель — LABUBU",
        audio: `${import.meta.env.BASE_URL}audio/songs/labubu.mp3`
    },
    {
        emojis: ["🍍", "👟"],
        answer: "Ананас Адидaс — Mia Boyka",
        audio: `${import.meta.env.BASE_URL}audio/songs/ananas-adidas.mp3`
    },
    {
        emojis: ["👩‍👧", "💰", "🐶", "👨‍👧", "💰", "🐶"],
        answer: "Купи пёсика — Милана Хаметова",
        audio: `${import.meta.env.BASE_URL}audio/songs/kupi-pesika.mp3`
    },
    {
        emojis: ["👉", "➡️", "🕷️"],
        answer: "Человек-паук — POLI",
        audio: `${import.meta.env.BASE_URL}audio/songs/poli-spider-man.mp3`
    }
];

type EmojiGuessPageProps = {
    stitchScore: number;
    hawaiiScore: number;
    setStitchScore: React.Dispatch<React.SetStateAction<number>>;
    setHawaiiScore: React.Dispatch<React.SetStateAction<number>>;
    team1Name?: string;
    team2Name?: string;
};

type TabType = "cartoons" | "music";

const EmojiGuessPage: React.FC<EmojiGuessPageProps> = ({
    stitchScore,
    hawaiiScore,
    setStitchScore,
    setHawaiiScore,
    team1Name,
    team2Name,
}) => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    // UI State
    const [activeTab, setActiveTab] = useState<TabType>("cartoons");
    const [currentCartoonIndex, setCurrentCartoonIndex] = useState(0);
    const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
    const [isAnswerVisible, setIsAnswerVisible] = useState(false);

    // Media Ref
    const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement | null>(null);

    // Fade-in animation
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Останавливает медиа при смене раунда/таба
    const stopMedia = () => {
        if (mediaRef.current) {
            mediaRef.current.pause();
            mediaRef.current.currentTime = 0;
        }
    };

    const handleTabChange = (bgTab: TabType) => {
        if (activeTab !== bgTab) {
            stopMedia();
            setIsAnswerVisible(false);
            setActiveTab(bgTab);
        }
    };

    const handleNextRound = () => {
        stopMedia();
        setIsAnswerVisible(false);
        if (activeTab === "cartoons") {
            if (currentCartoonIndex < emojiCartoons.length) {
                setCurrentCartoonIndex(prev => prev + 1);
            }
        } else {
            if (currentMusicIndex < musicEmojiData.length) {
                setCurrentMusicIndex(prev => prev + 1);
            }
        }
    };

    const handlePrevRound = () => {
        stopMedia();
        setIsAnswerVisible(false);
        if (activeTab === "cartoons") {
            setCurrentCartoonIndex((prev) => (prev > 0 ? prev - 1 : 0));
        } else {
            setCurrentMusicIndex((prev) => (prev > 0 ? prev - 1 : 0));
        }
    };

    // Current Data
    const isCartoons = activeTab === "cartoons";
    const currentListLength = isCartoons ? emojiCartoons.length : musicEmojiData.length;
    const currentIndex = isCartoons ? currentCartoonIndex : currentMusicIndex;
    const isGameOver = currentIndex >= currentListLength;

    const currentItem = isCartoons
        ? emojiCartoons[currentCartoonIndex]
        : musicEmojiData[currentMusicIndex];

    const showAnswer = () => {
        setIsAnswerVisible(true);
        // Autoplay logic is handled by the <video autoPlay> attribute when rendered, 
        // but we can also enforce it here if needed.
    };

    return (
        <div className={`party-challenges-page party-fade-in ${isVisible ? "party-fade-in-visible" : ""}`}>
            <div className="party-challenges-inner" style={{ flexDirection: "column", alignItems: "center" }}>

                {/* --- ХЕДЕР --- */}
                <header className="party-header" style={{ width: "100%", display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: "1rem" }}>
                    <button
                        className="party-button party-btn-gray"
                        style={{ fontSize: "1rem", padding: "0.8rem 1.4rem", color: "black" }}
                        onClick={() => navigate("/challenges")}
                    >
                        ← Назад
                    </button>
                    <div style={{ textAlign: "center" }}>
                        <h2 className="party-title" style={{ margin: 0, fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>УГАДАЙ ПО ЭМОДЗИ</h2>
                    </div>
                    <div style={{ width: "100px" }}></div>
                </header>

                {/* --- ТАБЫ --- */}
                <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", marginBottom: "2rem" }}>
                    <button
                        className={`party-button ${activeTab === "cartoons" ? "party-btn-blue" : "party-btn-gray"}`}
                        onClick={() => handleTabChange("cartoons")}
                        style={{ fontSize: "1.2rem", padding: "1rem 2rem", color: activeTab === "cartoons" ? "white" : "black" }}
                    >
                        🎬 МУЛЬТФИЛЬМЫ
                    </button>
                    <button
                        className={`party-button ${activeTab === "music" ? "party-btn-pink" : "party-btn-gray"}`}
                        onClick={() => handleTabChange("music")}
                        style={{ fontSize: "1.2rem", padding: "1rem 2rem", color: activeTab === "music" ? "white" : "black" }}
                    >
                        🎵 ПЕСНИ
                    </button>
                </div>

                <main className="party-main" style={{ flexDirection: "column", gap: "2rem", width: "100%", alignItems: "center" }}>

                    {!isGameOver && currentItem ? (
                        <div className="party-challenge-card" style={{ width: "100%", maxWidth: "800px", textAlign: "center", padding: "3rem 2rem", borderRadius: "1.5rem" }}>

                            <div style={{ marginBottom: "1rem", color: "#666" }}>
                                Раунд {currentIndex + 1} из {currentListLength}
                            </div>

                            {/* ЭМОДЗИ */}
                            <div className="emoji-display" style={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "center",
                                gap: "1rem",
                                fontSize: "clamp(4rem, 8vw, 6rem)",
                                margin: "1rem 0 3rem",
                                animation: "floatEmoji 4s ease-in-out infinite"
                            }}>
                                {isCartoons
                                    ? (currentItem as EmojiCartoonItem).emojis.map((e, i) => <span key={i}>{e}</span>)
                                    : (currentItem as MusicEmojiItem).emojis.map((e, i) => <span key={i}>{e}</span>)
                                }
                            </div>

                            {/* БЛОК ОТВЕТА */}
                            <div style={{ minHeight: "350px", display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "center" }}>
                                {isAnswerVisible ? (
                                    <div className="party-fade-in party-fade-in-visible" style={{ width: "100%" }}>

                                        <h3 style={{ fontSize: "2.5rem", color: "#333", margin: "0 0 1.5rem 0", fontWeight: "bold" }}>
                                            {currentItem.answer}
                                        </h3>

                                        {isCartoons ? (
                                            /* МЕСТО ПОД ПОСТЕР (МУЛЬТФИЛЬМЫ) */
                                            /* МЕСТО ПОД ПОСТЕР (МУЛЬТФИЛЬМЫ) */
                                            <div style={{
                                                width: "100%",
                                                maxWidth: "300px",
                                                height: "auto",
                                                margin: "0 auto",
                                                borderRadius: "1rem",
                                                overflow: "hidden",
                                                boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                                                border: "4px solid white"
                                            }}>
                                                <img
                                                    src={(currentItem as EmojiCartoonItem).image}
                                                    alt={currentItem.answer}
                                                    style={{ width: "100%", height: "auto", display: "block" }}
                                                    onError={(e) => {
                                                        // Fallback if image not found
                                                        e.currentTarget.style.display = "none";
                                                        e.currentTarget.parentElement!.innerText = "🖼️ Картинка не найдена";
                                                        e.currentTarget.parentElement!.style.display = "flex";
                                                        e.currentTarget.parentElement!.style.alignItems = "center";
                                                        e.currentTarget.parentElement!.style.justifyContent = "center";
                                                        e.currentTarget.parentElement!.style.height = "200px";
                                                        e.currentTarget.parentElement!.style.fontSize = "1.2rem";
                                                        e.currentTarget.parentElement!.style.color = "#666";
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            /* АУДИО ПЛЕЕР (МУЗЫКА) */
                                            <div style={{ width: "100%", textAlign: "center" }}>
                                                {/* Визуализация аудио (анимация) */}
                                                <div style={{
                                                    fontSize: "4rem",
                                                    marginBottom: "1rem",
                                                    animation: "pulse 1.5s infinite"
                                                }}>
                                                    🎶 🕺 🔊
                                                </div>

                                                <div style={{
                                                    background: "rgba(255,255,255,0.5)",
                                                    padding: "1rem",
                                                    borderRadius: "1rem",
                                                    display: "inline-block"
                                                }}>
                                                    <audio
                                                        ref={mediaRef as React.RefObject<HTMLAudioElement>}
                                                        controls
                                                        autoPlay
                                                        src={(currentItem as MusicEmojiItem).audio}
                                                        style={{ width: "300px" }}
                                                    >
                                                        Ваш браузер не поддерживает аудио.
                                                    </audio>
                                                </div>
                                                <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#666" }}>
                                                    Играет фрагмент песни...
                                                </p>
                                            </div>
                                        )}

                                    </div>
                                ) : (
                                    <button
                                        className="party-button party-btn-blue"
                                        onClick={showAnswer}
                                        style={{ fontSize: "1.2rem", padding: "1rem 2rem", marginTop: "2rem" }}
                                    >
                                        ПОКАЗАТЬ ОТВЕТ 👀
                                    </button>
                                )}
                            </div>

                            {/* НАВИГАЦИЯ */}
                            <div className="party-challenge-nav" style={{ marginTop: "3rem" }}>
                                <button
                                    className="party-button party-btn-gray"
                                    style={{ color: "black" }}
                                    onClick={handlePrevRound}
                                    disabled={currentIndex === 0}
                                >
                                    ← Назад
                                </button>
                                <button
                                    className="party-button party-btn-pink"
                                    onClick={handleNextRound}
                                >
                                    СЛЕДУЮЩИЙ РАУНД →
                                </button>
                            </div>

                        </div >
                    ) : (
                        /* КОНЕЦ ИГРЫ */
                        <div className="party-challenge-card" style={{ width: "100%", maxWidth: "700px", textAlign: "center", padding: "3rem" }}>
                            <h2 style={{ fontSize: "3rem", margin: "0 0 1rem" }}>🎉</h2>
                            <h3 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                                {activeTab === "cartoons" ? "Мультфильмы" : "Песни"} закончились!
                            </h3>
                            <p className="party-text">Вы отличные охотники за смайликами! Не забудьте проверить счёт.</p>
                            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "2rem" }}>
                                <button
                                    className="party-button party-btn-gray"
                                    onClick={() => navigate("/challenges")}
                                    style={{ color: "black" }}
                                >
                                    К списку конкурсов
                                </button>
                                <button
                                    className="party-button party-btn-blue"
                                    onClick={() => {
                                        // Переключаем на другую вкладку если закончили одну, или просто остаемся здесь
                                        if (activeTab === "cartoons") handleTabChange("music");
                                        else handleTabChange("cartoons");
                                    }}
                                >
                                    Перейти к {activeTab === "cartoons" ? "Песням" : "Мультфильмам"} →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Счёт */}
                    <ScoreBoard
                        stitchScore={stitchScore}
                        hawaiiScore={hawaiiScore}
                        setStitchScore={setStitchScore}
                        setHawaiiScore={setHawaiiScore}
                        team1Name={team1Name}
                        team2Name={team2Name}
                        style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: "2rem", marginTop: "1rem" }}
                    />

                </main>
            </div>
            <style>{`
                @keyframes floatEmoji {
                    0% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(2deg); }
                    100% { transform: translateY(0px) rotate(0deg); }
                }
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.1); opacity: 0.8; }
                    100% { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default EmojiGuessPage;
