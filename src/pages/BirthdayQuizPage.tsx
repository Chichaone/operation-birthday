import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

// --- ДАННЫЕ ВИКТОРИНЫ ---
const birthdayQuiz = [
    {
        id: "easy-1",
        difficulty: "easy",
        points: 1,
        question: "Какой любимый цвет у Саши?",
        answer: "Голубой 💙"
    },
    {
        id: "easy-2",
        difficulty: "easy",
        points: 1,
        question: "Какая у неё любимая еда?",
        answer: "Бургер 🍔"
    },
    {
        id: "easy-3",
        difficulty: "easy",
        points: 1,
        question: "Какой её любимый мультфильм?",
        answer: "Ранчо"
    },
    {
        id: "easy-4",
        difficulty: "easy",
        points: 1,
        question: "С кем Саша любит проводить перемены?",
        answer: "Со своими друзьями  😊"
    },
    {
        id: "easy-5",
        difficulty: "easy",
        points: 1,
        question: "Какая её любимая игрушка или персонаж?",
        answer: "Стич"
    },

    // Средние
    {
        id: "medium-1",
        difficulty: "medium",
        points: 1,
        question: "Какой у Саши любимый праздник?",
        answer: "Новый год 🎄 🎅 🎁 ✨"
    },
    {
        id: "medium-2",
        difficulty: "medium",
        points: 1,
        question: "Какой танец или движ она любит больше всего?",
        answer: "Популярити танец из Like 💃"
    },
    {
        id: "medium-3",
        difficulty: "medium",
        points: 1,
        question: "Какая её любимая песня на данный момент?",
        answer: "Абрикоса - Имя 🎵"
    },
    {
        id: "medium-4",
        difficulty: "medium",
        points: 1,
        question: "Какой у неё любимый напиток или десерт?",
        answer: "Напиток - милкис или Десерт - чизкейк"
    },
    {
        id: "medium-5",
        difficulty: "medium",
        points: 1,
        question: "Что она любит делать в свободное время?",
        answer: "Танцевать 💃"
    },

    // Сложные
    {
        id: "hard-1",
        difficulty: "hard",
        points: 2,
        question: "Если бы Саша могла поехать куда угодно — куда бы она выбрала?",
        answer: "В деревню"
    },
    {
        id: "hard-2",
        difficulty: "hard",
        points: 2,
        question: "Чего она больше всего ждала сегодня?",
        answer: "Друзей! 👭 👯‍♀️ 💖"
    },
    {
        id: "hard-3",
        difficulty: "hard",
        points: 2,
        question: "Какой самый смешной момент с Сашей все вспоминают?",
        answer: "Масленица 🥞 ☀️ 🎉"
    },
    {
        id: "hard-4",
        difficulty: "hard",
        points: 2,
        question: "Какой её талант или умение знает не каждый?",
        answer: "Саша у нас волонтер 🤝 ❤️"
    },
    {
        id: "hard-5",
        difficulty: "hard",
        points: 2,
        question: "Какое её секретное желание или мечта?",
        answer: "Иметь свою лошадь 🐴 🐎"
    }
];

interface BirthdayQuizPageProps {
    stitchScore: number;
    hawaiiScore: number;
    setStitchScore: React.Dispatch<React.SetStateAction<number>>;
    setHawaiiScore: React.Dispatch<React.SetStateAction<number>>;
    team1Name: string;
    team2Name: string;
}

const BirthdayQuizPage: React.FC<BirthdayQuizPageProps> = ({
    stitchScore,
    hawaiiScore,
    setStitchScore,
    setHawaiiScore,
    team1Name,
    team2Name,
}) => {
    const navigate = useNavigate();

    // Состояние игры
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isAnswerVisible, setIsAnswerVisible] = useState(false);
    const [pointsAwarded, setPointsAwarded] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    // Данные команд и счёт
    // Ипользуем пропсы для глобального счёта

    // Проверка наличия команд (просто как заглушка, если данных нет, считаем что они есть или показываем предупреждение)
    const hasTeamsData = true;



    // Музыка для финала
    useEffect(() => {
        let audio: HTMLAudioElement | null = null;

        if (isFinished) {
            audio = new Audio("/audio/reveal.mp3");
            audio.volume = 0.5;
            audio.play().catch(() => { });
        }

        return () => {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        };
    }, [isFinished]);

    const currentQuestion = birthdayQuiz[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex >= birthdayQuiz.length - 1;

    const showAnswer = () => {
        setIsAnswerVisible(true);
    };

    const addPoints = (team: "Stitch" | "Hawaii") => {
        if (pointsAwarded) return;

        if (team === "Stitch") {
            setStitchScore((prev) => prev + currentQuestion.points);
        } else {
            setHawaiiScore((prev) => prev + currentQuestion.points);
        }
        setPointsAwarded(true);
    };

    const nextQuestion = () => {
        if (isLastQuestion) {
            setIsFinished(true);
            triggerConfetti();
        } else {
            setCurrentQuestionIndex((prev) => prev + 1);
            setIsAnswerVisible(false);
            setPointsAwarded(false);
        }
    };

    const triggerConfetti = () => {
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ["#ff00ff", "#00ffff", "#ffff00"]
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ["#ff00ff", "#00ffff", "#ffff00"]
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    };

    if (!hasTeamsData) {
        return (
            <div className="party-challenges-page party-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="party-card" style={{ textAlign: "center", padding: "2rem" }}>
                    <h2>Команды ещё не созданы!</h2>
                    <button className="party-button party-btn-gray" onClick={() => navigate("/challenges")}>
                        Вернуться
                    </button>
                </div>
            </div>
        );
    }

    if (isFinished) {
        const winner = stitchScore > hawaiiScore ? team1Name : (hawaiiScore > stitchScore ? team2Name : "Победила ДРУЖБА!");

        return (
            <div className="party-challenges-page party-fade-in party-fade-in-visible">
                <div className="party-challenges-inner" style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <h1 className="party-title" style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎉 ПОБЕДИТЕЛЬ! 🎉</h1>

                    <div className="party-card" style={{ padding: "3rem", textAlign: "center", maxWidth: "600px" }}>
                        <h2 style={{ fontSize: "3rem", color: "#ffffffff", marginBottom: "2rem" }}>{winner}</h2>

                        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "2rem", gap: "2rem" }}>
                            <div>
                                <div style={{ fontSize: "1.2rem" }}>{team1Name}</div>
                                <div style={{ fontSize: "3rem", fontWeight: "bold" }}>{stitchScore}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: "1.2rem" }}>{team2Name}</div>
                                <div style={{ fontSize: "3rem", fontWeight: "bold" }}>{hawaiiScore}</div>
                            </div>
                        </div>

                        <button
                            className="party-button party-btn-blue"
                            onClick={() => navigate("/challenges")}
                        >
                            Вернуться к конкурсам
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Определение цвета сложности
    let difficultyColor = "#2196f3"; // easy - blue
    if (currentQuestion.difficulty === "medium") difficultyColor = "#9c27b0"; // medium - purple
    if (currentQuestion.difficulty === "hard") difficultyColor = "#e91e63"; // hard - pink

    const difficultyLabel = {
        easy: "Лёгкий",
        medium: "Средний",
        hard: "Сложный"
    }[currentQuestion.difficulty];

    return (
        <div className="party-challenges-page party-fade-in party-fade-in-visible">
            <div className="party-challenges-inner" style={{ flexDirection: "column", alignItems: "center" }}>

                {/* Хедер */}
                <header className="party-header" style={{ width: "100%", marginBottom: "2rem" }}>
                    <h2 className="party-title" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>🎀 Кто лучше знает Сашу? 🎀</h2>
                    <p className="party-subtitle">Финальный конкурс</p>
                </header>

                {/* Карточка вопроса */}
                <div className="party-challenge-card" style={{ width: "100%", maxWidth: "800px", padding: "3rem 2rem", position: "relative" }}>

                    {/* Инфо-плашки */}
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem", width: "100%" }}>
                        <span style={{ background: "#eee", padding: "0.5rem 1rem", borderRadius: "20px", fontWeight: "bold" }}>
                            Вопрос {currentQuestionIndex + 1} из {birthdayQuiz.length}
                        </span>
                        <span style={{ background: difficultyColor, color: "white", padding: "0.5rem 1rem", borderRadius: "20px", fontWeight: "bold" }}>
                            {difficultyLabel}
                        </span>
                    </div>

                    {/* Текст вопроса */}
                    <h3 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", textAlign: "center", marginBottom: "3rem", lineHeight: 1.2 }}>
                        {currentQuestion.question}
                    </h3>

                    {/* Ответ и кнопки */}
                    <div style={{ minHeight: "200px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        {!isAnswerVisible ? (
                            <button
                                className="party-button party-btn-blue"
                                onClick={showAnswer}
                                style={{ fontSize: "1.5rem", padding: "1rem 3rem" }}
                            >
                                ПОКАЗАТЬ ОТВЕТ ✨
                            </button>
                        ) : (
                            <div className="party-fade-in party-fade-in-visible" style={{ width: "100%", textAlign: "center" }}>
                                <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#333", marginBottom: "2rem", padding: "1rem", border: "3px dashed #FFD700", borderRadius: "1rem", background: "rgba(255,255,200, 0.3)" }}>
                                    {currentQuestion.answer}
                                </div>

                                {!pointsAwarded ? (
                                    <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                                        <button
                                            className="party-button party-btn-blue"
                                            onClick={() => addPoints("Stitch")}
                                        >
                                            {team1Name} +{currentQuestion.points}
                                        </button>
                                        <button
                                            className="party-button party-btn-pink"
                                            onClick={() => addPoints("Hawaii")}
                                        >
                                            {team2Name} +{currentQuestion.points}
                                        </button>
                                    </div>
                                ) : (
                                    <div style={{ color: "green", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "2rem" }}>
                                        Баллы начислены! ✅
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Кнопка Далее */}
                    <div style={{ marginTop: "3rem", display: "flex", justifyContent: "flex-end" }}>
                        <button
                            className="party-button party-btn-green"
                            onClick={nextQuestion}
                            disabled={!isAnswerVisible} // Блокируем пока не открыли ответ (опционально)
                            style={{ opacity: isAnswerVisible ? 1 : 0.5 }}
                        >
                            {isLastQuestion ? "К РЕЗУЛЬТАТАМ 🏆" : "СЛЕДУЮЩИЙ ВОПРОС →"}
                        </button>
                    </div>

                </div>

                {/* Текущий счёт (мелкий) */}
                <div style={{ marginTop: "2rem", display: "flex", gap: "2rem", fontSize: "1.2rem", fontWeight: "bold", color: "white", textShadow: "1px 1px 2px black" }}>
                    <span>{team1Name}: {stitchScore}</span>
                    <span>{team2Name}: {hawaiiScore}</span>
                </div>

            </div>
        </div>
    );
};

export default BirthdayQuizPage;
