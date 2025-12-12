import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScoreBoard from "../components/ScoreBoard";

type Challenge = {
  id: number;
  title: string;
  description: string | React.ReactNode;
  pointsHint: string;
};

const CHALLENGES: Challenge[] = [
  {
    id: 1,
    title: "Танцевальный баттл",
    description: (
      <>
        <p>Добро пожаловать на самый яркий и смешной челлендж вечеринки — <strong>Танцевальный Баттл!</strong> 💃🕺</p>
        <p style={{ marginTop: "0.5rem" }}>
          Впереди вас ждут трендовые движения и модные TikTok-пляски. Смотрите видео, повторяйте танец и выкладывайтесь на максимум!
        </p>
        <p style={{ marginTop: "0.5rem", fontStyle: "italic" }}>
          🔥 Здесь важнее не идеальная техника, а энергия, креатив и смелость.
        </p>
      </>
    ),
    pointsHint: "Рекомендуется: настроиться на зажигательные танцы!",
  },
  {
    id: 2,
    title: "СТАКАН-ЧЕЛЛЕНДЖ",
    description: (
      <>
        <p>Добро пожаловать в <strong>СТАКАН-ЧЕЛЛЕНДЖ</strong> — мир весёлых и быстрых мини-игр! 🥤</p>
        <p style={{ marginTop: "0.5rem" }}>
          Каждый раунд — новое испытание, новая стратегия и новые эмоции. Ваши команды будут ловить, строить, переворачивать и соревноваться до последнего стакана!
        </p>
        <p style={{ marginTop: "0.5rem", fontWeight: "bold", color: "#000000ff" }}>
          Кто станет чемпионом сегодняшней вечеринки? 🏆
        </p>
      </>
    ),
    pointsHint: "Рекомендуется: настроиться на борьбу)",
  },
  {
    id: 3,
    title: "✨ Угадай по Эмодзи!",
    description: (
      <>
        <p>Добро пожаловать в игру, где маленькие картинки говорят больше, чем слова! 🕵️‍♀️🔍</p>
        <ul style={{ textAlign: "left", marginTop: "0.5rem", marginBottom: "0.5rem" }}>
          <li>🧩 <strong>Задача:</strong> угадайте мультфильм или песню, спрятанные в этих символах.</li>
          <li>🚀 <strong>Совет:</strong> будьте внимательны, смекалисты и быстры!</li>
        </ul>
        <p>Делитесь догадками с командой и узнайте, кто станет настоящим мастером эмодзи-шифров!</p>
      </>
    ),
    pointsHint: "Рекомендуется: закрутить свои извилины и приготовиться))",
  },
  {
    id: 4,
    title: "КТО ЛУЧШЕ ЗНАЕТ САШУ?",
    description: (
      <>
        <p>Сегодня мы выясним самое главное: <strong>какая команда лучше всех знает именинницу!</strong> 🎉</p>
        <p style={{ marginTop: "0.5rem" }}>
          Вас ждут вопросы про Сашу: про её любимые вещи, забавные моменты, мечты и секреты.
          Иногда будет легко, иногда — очень хитро 😉
        </p>
        <p style={{ marginTop: "0.5rem" }}>
          <strong>Правила простые:</strong>
        </p>
        <ul style={{ textAlign: "left", marginTop: "0.5rem", marginBottom: "0.5rem" }}>
          <li>🗣️ Команды по очереди отвечают на вопросы.</li>
          <li>💎 За каждый правильный ответ команда получает <strong>1 или 2 балла</strong> (в зависимости от сложности).</li>
        </ul>
        <p>
          В конце мы посчитаем очки и узнаем, кто станет чемпионом Сашиного Дня Рождения! 🏆
        </p>
        <p style={{ marginTop: "0.5rem", fontWeight: "bold", color: "#2196f3" }}>
          Готовы проверить, насколько вы внимательные друзья? Тогда начинаем финальный раунд! 💙
        </p>
      </>
    ),
    pointsHint:
      "Рекомендуется: вспомнить все про Сашу",
  },
];

type ChallengesPageProps = {
  stitchScore: number;
  hawaiiScore: number;
  setStitchScore: React.Dispatch<React.SetStateAction<number>>;
  setHawaiiScore: React.Dispatch<React.SetStateAction<number>>;
  challengeIndex: number;
  setChallengeIndex: React.Dispatch<React.SetStateAction<number>>;
  team1Name: string;
  team2Name: string;
};

const ChallengesPage: React.FC<ChallengesPageProps> = ({
  stitchScore,
  hawaiiScore,
  setStitchScore,
  setHawaiiScore,
  challengeIndex,
  setChallengeIndex,
  team1Name,
  team2Name,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const mainRef = React.useRef<HTMLElement>(null);

  const currentChallenge = CHALLENGES[challengeIndex];
  const isDanceChallenge = currentChallenge.id === 1;

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 80);

    // Auto-scroll to the main challenge block
    setTimeout(() => {
      if (mainRef.current) {
        mainRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const handleNext = () => {
    setChallengeIndex((prev) => (prev + 1) % CHALLENGES.length);
  };

  const handlePrev = () => {
    setChallengeIndex((prev) =>
      prev === 0 ? CHALLENGES.length - 1 : prev - 1
    );
  };

  const handleBackToTeams = () => {
    navigate("/teams");
  };

  return (
    <div
      className={`party-challenges-page party-fade-in ${isVisible ? "party-fade-in-visible" : ""
        }`}
    >
      {/* Фиксированная кнопка "Назад к командам" */}
      <button
        className="party-back-to-teams-button"
        onClick={handleBackToTeams}
        title="Назад к командам"
        aria-label="Назад к командам"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="party-challenges-inner">
        <main className="party-challenges-main" ref={mainRef}>
          {/* Счёт команд (теперь под карточкой) */}
          <section style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
            <div className="party-scoreboard-horizontal">
              <ScoreBoard
                stitchScore={stitchScore}
                hawaiiScore={hawaiiScore}
                setStitchScore={setStitchScore}
                setHawaiiScore={setHawaiiScore}
                team1Name={team1Name}
                team2Name={team2Name}
              />
            </div>
          </section>
          {/* Текущий конкурс */}
          <section className="party-challenge-card">
            <div className="party-challenge-indicator">
              Конкурс {challengeIndex + 1} из {CHALLENGES.length}
            </div>

            <h1 className="party-challenge-title">{currentChallenge.title}</h1>

            <div className="party-challenge-description party-text">
              {currentChallenge.description}
            </div>

            <p className="party-challenge-points-hint">
              {currentChallenge.pointsHint}
            </p>

            <div className="party-challenge-actions-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginTop: "1rem" }}>

              {/* Стрелка назад */}
              <button
                className="party-button party-icon-button party-btn-gray"
                style={{ color: "black", width: "3.5rem", height: "3.5rem", padding: "0", flexShrink: 0 }}
                onClick={handlePrev}
                title="Предыдущий конкурс"
                aria-label="Предыдущий конкурс"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Центральная кнопка (действие) */}
              <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                {isDanceChallenge && (
                  <button
                    className="party-button party-btn-pink"
                    style={{ fontSize: "0.9rem", padding: "0.8rem 1.6rem", width: "100%" }}
                    onClick={() => navigate("/dance-battle")}
                  >
                    ТАНЦЕВАЛЬНЫЙ БАТТЛ 💃
                  </button>
                )}
                {currentChallenge.id === 2 && (
                  <button
                    className="party-button party-btn-pink"
                    style={{ fontSize: "0.9rem", padding: "0.8rem 1.6rem", width: "100%" }}
                    onClick={() => navigate("/cups-challenge")}
                  >
                    СТАКАНЧИКИ 🥤
                  </button>
                )}
                {currentChallenge.id === 3 && (
                  <button
                    className="party-button party-btn-pink"
                    style={{ fontSize: "0.9rem", padding: "0.8rem 1.6rem", width: "100%" }}
                    onClick={() => navigate("/emoji")}
                  >
                    ЭМОДЗИ-БАТТЛ 🕵️‍♀️
                  </button>
                )}
                {currentChallenge.id === 4 && (
                  <button
                    className="party-button party-btn-blue"
                    style={{ fontSize: "1rem", padding: "1rem 2rem", width: "100%" }}
                    onClick={() => navigate("/birthday-quiz")}
                  >
                    ВИКТОРИНА 🎤
                  </button>
                )}
              </div>

              {/* Стрелка вперед */}
              <button
                className="party-button party-icon-button party-btn-pink"
                style={{ width: "3.5rem", height: "3.5rem", padding: "0", flexShrink: 0 }}
                onClick={handleNext}
                title="Следующий конкурс"
                aria-label="Следующий конкурс"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </section>
        </main>




      </div>
    </div >
  );
};

export default ChallengesPage;
