import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Утилита для перемешивания массива
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

type TeamsPageProps = {
  players: string[];
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>;
  teamStitch: string[];
  setTeamStitch: React.Dispatch<React.SetStateAction<string[]>>;
  teamHawaii: string[];
  setTeamHawaii: React.Dispatch<React.SetStateAction<string[]>>;
  team1Name: string;
  setTeam1Name: React.Dispatch<React.SetStateAction<string>>;
  team1Emoji: string;
  setTeam1Emoji: React.Dispatch<React.SetStateAction<string>>;
  team2Name: string;
  setTeam2Name: React.Dispatch<React.SetStateAction<string>>;
  team2Emoji: string;
  setTeam2Emoji: React.Dispatch<React.SetStateAction<string>>;
  stitchScore: number;
  setStitchScore: React.Dispatch<React.SetStateAction<number>>;
  hawaiiScore: number;
  setHawaiiScore: React.Dispatch<React.SetStateAction<number>>;
};

const TeamsPage: React.FC<TeamsPageProps> = ({
  players,
  setPlayers,
  teamStitch,
  setTeamStitch,
  teamHawaii,
  setTeamHawaii,
  team1Name,
  setTeam1Name,
  team1Emoji,
  setTeam1Emoji,
  team2Name,
  setTeam2Name,
  team2Emoji,
  setTeam2Emoji,
  stitchScore,
  hawaiiScore,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing1, setIsEditing1] = useState(false);
  const [isEditing2, setIsEditing2] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  const handlePlayerChange = (index: number, value: string) => {
    setPlayers((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleAddPlayer = () => {
    setPlayers((prev) => [...prev, ""]);
  };

  const handleRemoveLastPlayer = () => {
    setPlayers((prev) => {
      if (prev.length <= 1) return prev;
      return prev.slice(0, -1);
    });
  };

  const handleClearList = () => {
    setPlayers([""]);
    setTeamStitch([]);
    setTeamHawaii([]);
  };

  const handleDivideTeams = () => {
    const filledPlayers = players.filter((name) => name.trim() !== "");
    if (filledPlayers.length === 0) {
      alert("Введите хотя бы одно имя для разделения на команды.");
      return;
    }

    const shuffled = shuffleArray(filledPlayers);
    const middle = Math.ceil(shuffled.length / 2);
    setTeamStitch(shuffled.slice(0, middle));
    setTeamHawaii(shuffled.slice(middle));
  };

  const handleShuffleAgain = () => {
    const allPlayers = [...teamStitch, ...teamHawaii];
    if (allPlayers.length === 0) return;

    const shuffled = shuffleArray(allPlayers);
    const middle = Math.ceil(shuffled.length / 2);
    setTeamStitch(shuffled.slice(0, middle));
    setTeamHawaii(shuffled.slice(middle));
  };

  const handleNavigateToChallenges = () => {
    navigate("/challenges");
  };

  const showTeams = teamStitch.length > 0 || teamHawaii.length > 0;

  return (
    <div
      className={`party-teams-page party-fade-in ${isVisible ? "party-fade-in-visible" : ""
        }`}
    >
      {/* Фиксированная кнопка "Назад на главную" */}
      <button
        className="party-back-to-teams-button"
        onClick={() => navigate("/")}
        title="Назад на главную"
        aria-label="Назад на главную"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="party-teams-inner">
        <header className="party-teams-header">
          <h2 className="party-title">СОСТАВЛЯЕМ КОМАНДЫ 💙</h2>
          <p className="party-subtitle">
            {showTeams
              ? "Команды готовы! Можете перемешать или начать игру"
              : "Введите имена участников и нажмите «Разделить на команды»"}
          </p>
        </header>

        {/* Динамический список полей ввода */}
        {!showTeams && (
          <section className="party-teams-input-section">
            <div className="party-input-grid">
              {players.map((player, index) => (
                <input
                  key={index}
                  value={player}
                  onChange={(e) => handlePlayerChange(index, e.target.value)}
                  placeholder={`Участник ${index + 1}`}
                  className="party-input"
                />
              ))}
            </div>

            {/* Кнопки для управления списком (иконки) */}
            <div className="party-teams-list-buttons">
              <button
                onClick={handleAddPlayer}
                className="party-button party-icon-button party-btn-gray"
                title="Добавить участника"
                aria-label="Добавить участника"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={handleRemoveLastPlayer}
                disabled={players.length <= 1}
                className="party-button party-icon-button party-btn-gray"
                title="Удалить последнего"
                aria-label="Удалить последнего"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Основные кнопки действий */}
            <div className="party-teams-main-buttons">
              <button
                onClick={handleDivideTeams}
                className="party-button party-btn-blue"
              >
                РАЗДЕЛИТЬ НА КОМАНДЫ
              </button>
              <button
                onClick={handleClearList}
                className="party-button party-btn-gray"
              >
                ОЧИСТИТЬ СПИСОК
              </button>
            </div>

            {/* Редактирование названий команд */}

          </section>
        )}

        {/* Отображение команд */}
        {showTeams && (
          <>
            {/* Секция редактирования удалена, теперь это делается внутри карточек */}
            <section className="party-team-grid">
              {/* Команда Стича */}
              <div className="party-team-card party-team-card-stitch">
                <div className="party-team-card-header" style={{ alignItems: "flex-start" }}>
                  {isEditing1 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", width: "100%" }}>
                      <div style={{ display: "flex", gap: "0.5rem", width: "100%" }}>
                        <input
                          value={team1Name}
                          onChange={(e) => setTeam1Name(e.target.value)}
                          className="party-input"
                          style={{ flex: 1, padding: "0.6rem", fontSize: "1.1rem" }}
                          autoFocus
                          placeholder="Название команды"
                        />
                        <button
                          onClick={() => setIsEditing1(false)}
                          className="party-button party-btn-green"
                          style={{ padding: "0.6rem 1rem", borderRadius: "0.8rem", minWidth: "auto", boxShadow: "none" }}
                        >
                          ✔
                        </button>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {["💙", "🌴", "🌺", "🍍", "🥥", "🌊", "☀️", "🏄", "👽", "🎸", "🎈", "🎁"].map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => setTeam1Emoji(emoji)}
                            style={{
                              fontSize: "1.5rem",
                              padding: "0.4rem",
                              background: team1Emoji === emoji ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.4)",
                              border: team1Emoji === emoji ? "2px solid #ff3e81" : "1px solid transparent",
                              borderRadius: "0.5rem",
                              cursor: "pointer",
                              transition: "all 0.2s"
                            }}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      <span className="party-team-emoji">{team1Emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <h3 className="party-team-title" style={{ margin: 0 }}>{team1Name}</h3>
                          <button
                            onClick={() => setIsEditing1(true)}
                            title="Редактировать название"
                            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem", opacity: 0.7, padding: "0.2rem" }}
                          >
                            ✏️
                          </button>
                        </div>
                        <p className="party-team-score-label">Очки: {stitchScore}</p>
                      </div>
                    </>
                  )}
                </div>
                <ul className="party-team-list">
                  {teamStitch.map((name, idx) => (
                    <li
                      key={idx}
                      className="party-team-list-item party-team-list-item-stitch"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Команда Гавайев */}
              <div className="party-team-card party-team-card-hawaii">
                <div className="party-team-card-header" style={{ alignItems: "flex-start" }}>
                  {isEditing2 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", width: "100%" }}>
                      <div style={{ display: "flex", gap: "0.5rem", width: "100%" }}>
                        <input
                          value={team2Name}
                          onChange={(e) => setTeam2Name(e.target.value)}
                          className="party-input"
                          style={{ flex: 1, padding: "0.6rem", fontSize: "1.1rem" }}
                          autoFocus
                          placeholder="Название команды"
                        />
                        <button
                          onClick={() => setIsEditing2(false)}
                          className="party-button party-btn-green"
                          style={{ padding: "0.6rem 1rem", borderRadius: "0.8rem", minWidth: "auto", boxShadow: "none" }}
                        >
                          ✔
                        </button>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {["💙", "🌴", "🌺", "🍍", "🥥", "🌊", "☀️", "🏄", "👽", "🎸", "🎈", "🎁"].map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => setTeam2Emoji(emoji)}
                            style={{
                              fontSize: "1.5rem",
                              padding: "0.4rem",
                              background: team2Emoji === emoji ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.4)",
                              border: team2Emoji === emoji ? "2px solid #ff3e81" : "1px solid transparent",
                              borderRadius: "0.5rem",
                              cursor: "pointer",
                              transition: "all 0.2s"
                            }}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      <span className="party-team-emoji">{team2Emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <h3 className="party-team-title" style={{ margin: 0 }}>{team2Name}</h3>
                          <button
                            onClick={() => setIsEditing2(true)}
                            title="Редактировать название"
                            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem", opacity: 0.7, padding: "0.2rem" }}
                          >
                            ✏️
                          </button>
                        </div>
                        <p className="party-team-score-label">Очки: {hawaiiScore}</p>
                      </div>
                    </>
                  )}
                </div>
                <ul className="party-team-list">
                  {teamHawaii.map((name, idx) => (
                    <li
                      key={idx}
                      className="party-team-list-item party-team-list-item-hawaii"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Кнопки под командами */}
            <div className="party-team-actions" style={{ display: "flex", flexDirection: "row", gap: "0.8rem", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
              {/* Иконка: Перемешать */}
              <button
                onClick={handleShuffleAgain}
                className="party-button party-icon-button party-btn-blue"
                title="Перемешать ещё раз"
                aria-label="Перемешать ещё раз"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 4V10H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M23 20V14H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20.49 9C19.9828 7.56678 19.1209 6.28536 17.9845 5.27542C16.8482 4.26548 15.4745 3.55976 13.9917 3.22426C12.5089 2.88875 10.9652 2.93434 9.50481 3.35677C8.04437 3.77921 6.71475 4.56471 5.64 5.64L1 10M23 14L18.36 18.36C17.2853 19.4353 15.9556 20.2208 14.4952 20.6432C13.0348 21.0657 11.4911 21.1112 10.0083 20.7757C8.52547 20.4402 7.1518 19.7345 6.01547 18.7246C4.87913 17.7146 4.01717 16.4332 3.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Иконка: Изменить участников */}
              <button
                onClick={() => {
                  setTeamStitch([]);
                  setTeamHawaii([]);
                }}
                className="party-button party-icon-button party-btn-gray"
                title="Изменить участников"
                aria-label="Изменить участников"
                style={{ color: "white" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 3C17.2626 2.73735 17.5744 2.52901 17.9176 2.38687C18.2608 2.24473 18.6286 2.17157 19 2.17157C19.3714 2.17157 19.7392 2.24473 20.0824 2.38687C20.4256 2.52901 20.7374 2.73735 21 3C21.2626 3.26264 21.471 3.57444 21.6131 3.9176C21.7553 4.26077 21.8284 4.62856 21.8284 5C21.8284 5.37143 21.7553 5.73923 21.6131 6.08239C21.471 6.42555 21.2626 6.73735 21 7L7.5 20.5L2 22L3.5 16.5L17 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Основная кнопка: Перейти к конкурсам */}
              <button
                onClick={handleNavigateToChallenges}
                className="party-button party-btn-green"
                style={{ flex: "1 1 auto", minWidth: "100px" }}
              >
                ПЕРЕЙТИ К КОНКУРСАМ
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TeamsPage;
