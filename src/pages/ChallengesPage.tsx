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

  const currentChallenge = CHALLENGES[challengeIndex];
  const isDanceChallenge = currentChallenge.id === 1;

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 80);
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



  const handleResetScores = () => {
    if (window.confirm("Сбросить счёт обеих команд?")) {
      setStitchScore(0);
      setHawaiiScore(0);
    }
  };

  const handleBackToTeams = () => {
    navigate("/teams");
  };

  return (
    <div
      className={`party-challenges-page party-fade-in ${isVisible ? "party-fade-in-visible" : ""
        }`}
    >
      <div className="party-challenges-inner">
        {/* Заголовок */}
        <header className="party-challenges-header">
          <h2 className="party-title">КОНКУРСЫ И ОЧКИ 🔥</h2>
          <p className="party-subtitle">
            Выбирайте конкурс, играйте раунды и начисляйте очки командам.
            <br />
            Главное правило — всем должно быть весело!
          </p>
        </header>

        <main className="party-challenges-main">
          {/* Счёт команд */}
          {/* Счёт команд (вынесен в отдельный компонент) */}
          <ScoreBoard
            stitchScore={stitchScore}
            hawaiiScore={hawaiiScore}
            setStitchScore={setStitchScore}
            setHawaiiScore={setHawaiiScore}
            team1Name={team1Name}
            team2Name={team2Name}
          />

          {/* Текущий конкурс */}
          <section className="party-challenge-card">
            <div className="party-challenge-indicator">
              Конкурс {challengeIndex + 1} из {CHALLENGES.length}
            </div>

            <h3 className="party-challenge-title">{currentChallenge.title}</h3>

            <div className="party-challenge-description party-text">
              {currentChallenge.description}
            </div>

            <p className="party-challenge-points-hint">
              {currentChallenge.pointsHint}
            </p>

            {/* 🔥 ВОТ ЗДЕСЬ — КНОПКА ДЛЯ ТАНЦЕВАЛЬНОГО БАТТЛА 🔥 */}
            {isDanceChallenge && (
              <div className="party-challenge-extra">
                <button
                  className="party-button party-btn-pink"
                  style={{ fontSize: "0.9rem", padding: "0.8rem 1.6rem" }}
                  onClick={() => navigate("/dance-battle")}
                >
                  ПРИСТУПИТЬ К ТАНЦЕВАЛЬНОМУ БАТТЛУ 💃🔥
                </button>
              </div>
            )}

            {/* Кнопка для стаканчиков (ID 2) */}
            {currentChallenge.id === 2 && (
              <div className="party-challenge-extra">
                <button
                  className="party-button party-btn-pink"
                  style={{ fontSize: "0.9rem", padding: "0.8rem 1.6rem" }}
                  onClick={() => navigate("/cups-challenge")}
                >
                  ПЕРЕЙТИ К СТАКАНЧИКАМ 🥤
                </button>
              </div>
            )}

            {/* Кнопка для Эмодзи (ID 3) */}
            {currentChallenge.id === 3 && (
              <div className="party-challenge-extra">
                <button
                  className="party-button party-btn-pink"
                  style={{ fontSize: "0.9rem", padding: "0.8rem 1.6rem" }}
                  onClick={() => navigate("/emoji")}
                >
                  НАЧАТЬ ЭМОДЗИ-БАТТЛ 🕵️‍♀️
                </button>
              </div>
            )}

            {/* Кнопка для Викторины (ID 4) */}
            {currentChallenge.id === 4 && (
              <div className="party-challenge-extra">
                <button
                  className="party-button party-btn-blue"
                  style={{ fontSize: "1rem", padding: "1rem 2rem" }}
                  onClick={() => navigate("/birthday-quiz")}
                >
                  НАЧАТЬ ВИКТОРИНУ 🎤
                </button>
              </div>
            )}

            {/* Навигация по конкурсам */}
            <div className="party-challenge-nav">
              <button
                className="party-button party-btn-gray"
                style={{ color: "black" }}
                onClick={handlePrev}
              >
                ← Предыдущий
              </button>
              <button
                className="party-button party-btn-pink"
                onClick={handleNext}
              >
                Следующий →
              </button>
            </div>
          </section>
        </main>

        {/* Кнопки внизу */}
        <div className="party-challenges-footer">
          <button
            className="party-button party-btn-gray"
            onClick={handleResetScores}
          >
            Сбросить счёт
          </button>
          <button
            className="party-button party-btn-blue"
            onClick={handleBackToTeams}
          >
            Назад к командам
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengesPage;
