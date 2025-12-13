import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ScoreBoard from "../components/ScoreBoard";
import ChallengeHeader from "../components/ChallengeHeader";

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
    {
        id: "luca",
        type: "cartoon",
        emojis: ["👦", "🐟", "🛵", "🍦"],
        answer: "Лука",
        image: `${import.meta.env.BASE_URL}images/cartoons/luca.jpg`,
    },
    {
        id: "cars",
        type: "cartoon",
        emojis: ["🏁", "🚦", "🚗"],
        answer: "Тачки",
        image: `${import.meta.env.BASE_URL}images/cartoons/cars.jpg`,
    },
    {
        id: "moana",
        type: "cartoon",
        emojis: ["👧", "🌊", "🏝️", "⛵"],
        answer: "Моана",
        image: `${import.meta.env.BASE_URL}images/cartoons/moana.jpg`,
    },
    {
        id: "boss-baby",
        type: "cartoon",
        emojis: ["👶", "👔", "💼", "🍼"],
        answer: "Босс-молокосос",
        image: `${import.meta.env.BASE_URL}images/cartoons/boss-baby.jpg`,
    },
    {
        id: "zootopia",
        type: "cartoon",
        emojis: ["🦊", "🐰", "🚔"],
        answer: "Зверополис",
        image: `${import.meta.env.BASE_URL}images/cartoons/zootopia.jpg`,
    },
    {
        id: "soul",
        type: "cartoon",
        emojis: ["👨🏾‍🦱", "🎹", "🐱"],
        answer: "Душа",
        image: `${import.meta.env.BASE_URL}images/cartoons/soul.jpg`,
    },
    {
        id: "puss-in-boots",
        type: "cartoon",
        emojis: ["🐱", "👢"],
        answer: "Кот в сапогах",
        image: `${import.meta.env.BASE_URL}images/cartoons/puss-in-boots.jpg`,
    },
    {
        id: "finding-nemo",
        type: "cartoon",
        emojis: ["🔍", "🐠"],
        answer: "В поисках Немо",
        image: `${import.meta.env.BASE_URL}images/cartoons/finding-nemo.jpg`,
    },
    {
        id: "shrek",
        type: "cartoon",
        emojis: ["🟢", "😈", "😺", "🐴"],
        answer: "Шрек",
        image: `${import.meta.env.BASE_URL}images/cartoons/shrek.jpg`,
    },
    {
        id: "the-good-dinosaur",
        type: "cartoon",
        emojis: ["👍", "🦕"],
        answer: "Хороший динозавр",
        image: `${import.meta.env.BASE_URL}images/cartoons/the-good-dinosaur.jpg`,
    },
    {
        id: "brave",
        type: "cartoon",
        emojis: ["🏰", "👩‍🦰", "🏹"],
        answer: "Храбрая сердцем",
        image: `${import.meta.env.BASE_URL}images/cartoons/brave.jpg`,
    },
    {
        id: "miraculous",
        type: "cartoon",
        emojis: ["🐞", "👦", "🐱", "⏰", "💪"],
        answer: "Леди Баг и Супер-Кот",
        image: `${import.meta.env.BASE_URL}images/cartoons/miraculous.jpg`,
    },
    {
        id: "cheburashka",
        type: "cartoon",
        emojis: ["🐵", "🍊"],
        answer: "Чебурашка",
        image: `${import.meta.env.BASE_URL}images/cartoons/cheburashka.jpg`,
    },
    {
        id: "the-little-mermaid",
        type: "cartoon",
        emojis: ["🧜‍♀️", "🐠", "🦀"],
        answer: "Русалочка",
        image: `${import.meta.env.BASE_URL}images/cartoons/the-little-mermaid.jpg`,
    },
    {
        id: "hotel-transylvania",
        type: "cartoon",
        emojis: ["🏨", "🧛‍♂️", "👨", "❤️", "🧛‍♀️"],
        answer: "Монстры на каникулах",
        image: `${import.meta.env.BASE_URL}images/cartoons/hotel-transylvania.jpg`,
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
        audio: `${import.meta.env.BASE_URL}audio/songs/samo-soboi.mp3`,
    },
    {
        emojis: ["🪑", "🦫", "👦", "🪵"],
        answer: "Бобр — Слава Скрипка",
        audio: `${import.meta.env.BASE_URL}audio/songs/bobr.mp3`,
    },
    {
        emojis: ["👧", "👉", "🖼️"],
        answer: "Девочка с картинки — Егор Крид",
        audio: `${import.meta.env.BASE_URL}audio/songs/devocka-s-kartinki.mp3`,
    },
    {
        emojis: ["1️⃣", "🌾", "🧍‍♂️", "🗡️"],
        answer: "Один в поле воин — Bearwolf",
        audio: `${import.meta.env.BASE_URL}audio/songs/odin-v-pole-voin.mp3`,
    },
    {
        emojis: ["🙋‍♀️", "👑"],
        answer: "Царица — Anna Asti",
        audio: `${import.meta.env.BASE_URL}audio/songs/carica.mp3`,
    },
    {
        emojis: ["🤫", "🗿", "👦"],
        answer: "Сигма бой — BETSY & Мария Янковская",
        audio: `${import.meta.env.BASE_URL}audio/songs/sigma-boi.mp3`,
    },
    {
        emojis: ["🐰", "🐰", "🙅‍♀️", "🐰"],
        answer: "Марьяна Локель — LABUBU",
        audio: `${import.meta.env.BASE_URL}audio/songs/labubu.mp3`,
    },
    {
        emojis: ["🍍", "👟"],
        answer: "Ананас Адидaс — Mia Boyka",
        audio: `${import.meta.env.BASE_URL}audio/songs/ananas-adidas.mp3`,
    },
    {
        emojis: ["👩‍👧", "💰", "🐶", "👨‍👧", "💰", "🐶"],
        answer: "Купи пёсика — Милана Хаметова",
        audio: `${import.meta.env.BASE_URL}audio/songs/kupi-pesika.mp3`,
    },
    {
        emojis: ["👉", "➡️", "🕷️"],
        answer: "Человек-паук — POLI",
        audio: `${import.meta.env.BASE_URL}audio/songs/poli-spider-man.mp3`,
    },
    {
        emojis: ["🤷‍♀️", "🦊", "🤕", "🐝"],
        answer: "Do$hik — Лиса",
        audio: `${import.meta.env.BASE_URL}audio/songs/doshik-lisa.mp3`,
    },
    {
        emojis: ["🌸", "👩‍🦳", "👱‍♀️", "👩"],
        answer: "Vlad Darwin — Три сестры",
        audio: `${import.meta.env.BASE_URL}audio/songs/vlad-darwin-tri-sestry.mp3`,
    },
    {
        emojis: ["🅰️", "🅿️", "✝️"],
        answer: "ROSÉ & Bruno Mars — APT",
        audio: `${import.meta.env.BASE_URL}audio/songs/rose-bruno-mars-apt.mp3`,
    },
    {
        emojis: ["❤️", "💜", "💛", "💚", "💙"],
        answer: "POLI — Сердечки",
        audio: `${import.meta.env.BASE_URL}audio/songs/poli-serdechki.mp3`,
    },
    {
        emojis: ["🦖", "🔥", "🏙️"],
        answer: "Bearwolf — GODZILLA",
        audio: `${import.meta.env.BASE_URL}audio/songs/bearwolf-godzilla.mp3`,
    },
    {
        emojis: ["🤷‍♀️", "🍫", "👉", "🚗"],
        answer: "Минаева — Шоколадка",
        audio: `${import.meta.env.BASE_URL}audio/songs/minaeva-shokoladka.mp3`,
    },
    {
        emojis: ["🦙", "🤱"],
        answer: "A4 — Лама мама",
        audio: `${import.meta.env.BASE_URL}audio/songs/a4-lama-mama.mp3`,
    },
    {
        emojis: ["☁️", "4️⃣", "🇰"],
        answer: "Марьяна Локель — Облака 4K",
        audio: `${import.meta.env.BASE_URL}audio/songs/maryana-lokel-oblaka-4k.mp3`,
    },
    {
        emojis: ["🔥", "❤️", "🚪"],
        answer: "XOLIDAYBOY — Пожары",
        audio: `${import.meta.env.BASE_URL}audio/songs/xolidayboy-pozhary.mp3`,
    },
    {
        emojis: ["👦", "🚗", "9️⃣"],
        answer: "Мальчик на девятке — DEAD BLONDE",
        audio: `${import.meta.env.BASE_URL}audio/songs/dead-blonde-malchik-na-devyatke.mp3`,
    },
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
    const mediaRef = useRef<HTMLAudioElement | null>(null);

    // Fade-in animation
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Останавливает медиа
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
            setCurrentCartoonIndex((prev) => (prev < emojiCartoons.length ? prev + 1 : prev));
        } else {
            setCurrentMusicIndex((prev) => (prev < musicEmojiData.length ? prev + 1 : prev));
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

        if (activeTab === "music") {
            setTimeout(() => {
                const el = mediaRef.current;
                el?.play().catch(() => { });
            }, 0);
        }
    };

    return (
        <div className={`party-challenges-page party-fade-in ${isVisible ? "party-fade-in-visible" : ""}`}>
            <div className="party-challenges-inner" style={{ flexDirection: "column", alignItems: "center" }}>
                {/* --- ХЕДЕР --- */}
                <ChallengeHeader title="УГАДАЙ ПО ЭМОДЖИ" />

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

                {/* --- ТАБЫ --- */}
                <div
                    className="party-tabs"
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: "1rem",
                        marginTop: "1rem",
                        marginBottom: "2rem",
                        width: "100%",
                    }}
                >
                    <button
                        className={`party-button ${activeTab === "cartoons" ? "party-btn-blue" : "party-btn-gray"}`}
                        onClick={() => handleTabChange("cartoons")}
                        style={{
                            flex: "1 1 auto",
                            fontSize: "1.1rem",
                            padding: "0.8rem 1.5rem",
                            color: activeTab === "cartoons" ? "white" : "black",
                        }}
                    >
                        🎬 МУЛЬТФИЛЬМЫ
                    </button>
                    <button
                        className={`party-button ${activeTab === "music" ? "party-btn-pink" : "party-btn-gray"}`}
                        onClick={() => handleTabChange("music")}
                        style={{
                            flex: "1 1 auto",
                            fontSize: "1.1rem",
                            padding: "0.8rem 1.5rem",
                            color: activeTab === "music" ? "white" : "black",
                        }}
                    >
                        🎵 ПЕСНИ
                    </button>
                </div>

                <main className="party-main" style={{ flexDirection: "column", gap: "2rem", width: "100%", alignItems: "center" }}>
                    {!isGameOver && currentItem ? (
                        <div style={{ position: "relative", width: "100%", maxWidth: "800px" }}>
                            {/* Кнопка предыдущего */}
                            <button
                                className="party-card-nav-button party-card-nav-prev"
                                onClick={handlePrevRound}
                                disabled={currentIndex === 0}
                                title="Назад"
                                aria-label="Назад"
                            >
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            <div className="party-challenge-card" style={{ width: "100%", textAlign: "center", padding: "3rem 2rem", borderRadius: "1.5rem" }}>
                                <div style={{ marginBottom: "1rem", color: "#666" }}>
                                    Раунд {currentIndex + 1} из {currentListLength}
                                </div>

                                {/* ЭМОДЗИ */}
                                <div
                                    className="emoji-display"
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        justifyContent: "center",
                                        gap: "0.5rem",
                                        fontSize: "clamp(3rem, 15vw, 6rem)",
                                        lineHeight: "1.1",
                                        margin: "1rem 0 3rem",
                                        animation: "floatEmoji 4s ease-in-out infinite",
                                    }}
                                >
                                    {isCartoons
                                        ? (currentItem as EmojiCartoonItem).emojis.map((e, i) => <span key={i}>{e}</span>)
                                        : (currentItem as MusicEmojiItem).emojis.map((e, i) => <span key={i}>{e}</span>)}
                                </div>

                                {/* БЛОК ОТВЕТА */}
                                <div style={{ minHeight: "350px", display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "center" }}>
                                    {isAnswerVisible ? (
                                        <div className="party-fade-in party-fade-in-visible" style={{ width: "100%" }}>
                                            <h3
                                                style={{
                                                    fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
                                                    color: "#333",
                                                    margin: "0 0 1.5rem 0",
                                                    fontWeight: "bold",
                                                    wordBreak: "break-word",
                                                }}
                                            >
                                                {currentItem.answer}
                                            </h3>

                                            {isCartoons ? (
                                                <div
                                                    style={{
                                                        width: "100%",
                                                        maxWidth: "300px",
                                                        height: "auto",
                                                        margin: "0 auto",
                                                        borderRadius: "1rem",
                                                        overflow: "hidden",
                                                        boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                                                        border: "4px solid white",
                                                    }}
                                                >
                                                    <img
                                                        src={(currentItem as EmojiCartoonItem).image}
                                                        alt={currentItem.answer}
                                                        style={{ width: "100%", height: "auto", display: "block" }}
                                                        onError={(e) => {
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
                                                <div style={{ width: "100%", textAlign: "center" }}>
                                                    <div style={{ fontSize: "4rem", marginBottom: "1rem", animation: "pulse 1.5s infinite" }}>
                                                        🎶 🕺 🔊
                                                    </div>

                                                    <div
                                                        style={{
                                                            width: "100%",
                                                            maxWidth: "520px",
                                                            margin: "0 auto",
                                                            padding: "14px",
                                                            borderRadius: "18px",
                                                            background: "linear-gradient(135deg, rgba(255,95,162,0.95), rgba(93,169,255,0.95))",
                                                            boxShadow: "0 18px 40px rgba(0,0,0,0.20)",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                borderRadius: "14px",
                                                                padding: "12px",
                                                            }}
                                                        >
                                                            <audio
                                                                ref={mediaRef}
                                                                src={(currentItem as MusicEmojiItem).audio}
                                                                controls
                                                                autoPlay
                                                                preload="auto"
                                                                style={{
                                                                    width: "100%",
                                                                    height: "48px",
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                            )}
                                        </div>
                                    ) : (
                                        <button
                                            className="party-button party-btn-blue"
                                            onClick={showAnswer}
                                            style={{ fontSize: "1.2rem", padding: "1rem 2rem", marginTop: "2rem", width: "100%", maxWidth: "300px" }}
                                        >
                                            ПОКАЗАТЬ ОТВЕТ 👀
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Кнопка следующего */}
                            <button
                                className="party-card-nav-button party-card-nav-next"
                                onClick={handleNextRound}
                                title="Следующий раунд"
                                aria-label="Следующий раунд"
                            >
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    ) : (
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
                                        if (activeTab === "cartoons") handleTabChange("music");
                                        else handleTabChange("cartoons");
                                    }}
                                >
                                    Перейти к {activeTab === "cartoons" ? "Песням" : "Мультфильмам"} →
                                </button>
                            </div>
                        </div>
                    )}
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
