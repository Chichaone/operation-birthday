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
  team2Name: string;
  setTeam2Name: React.Dispatch<React.SetStateAction<string>>;
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
  team2Name,
  setTeam2Name,
}) => {
  const [isVisible, setIsVisible] = useState(false);
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
      <div className="party-teams-inner">
        <header className="party-teams-header">
          <h2 className="party-title">СОСТАВЛЯЕМ КОМАНДЫ 💙</h2>
          <p className="party-subtitle">
            Введите имена участников и нажмите «Разделить на команды»
          </p>
        </header>

        {/* Динамический список полей ввода */}
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

          {/* Кнопки для управления списком */}
          <div className="party-teams-list-buttons">
            <button
              onClick={handleAddPlayer}
              className="party-button party-btn-gray"
            >
              Добавить участника
            </button>
            <button
              onClick={handleRemoveLastPlayer}
              disabled={players.length <= 1}
              className="party-button party-btn-gray"
            >
              Удалить последнего
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
          <section className="party-teams-names-section" style={{ marginTop: "2rem", width: "100%", maxWidth: "500px" }}>
            <h3 style={{ color: "white", textAlign: "center", marginBottom: "1rem" }}>Названия команд</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <input
                value={team1Name}
                onChange={(e) => setTeam1Name(e.target.value)}
                className="party-input"
                placeholder="Название первой команды"
              />
              <input
                value={team2Name}
                onChange={(e) => setTeam2Name(e.target.value)}
                className="party-input"
                placeholder="Название второй команды"
              />
            </div>
          </section>
        </section>

        {/* Отображение команд */}
        {showTeams && (
          <>
            <section className="party-team-grid">
              {/* Команда Стича */}
              <div className="party-team-card party-team-card-stitch">
                <div className="party-team-card-header">
                  <span className="party-team-emoji">💙</span>
                  <div>
                    <h3 className="party-team-title">{team1Name}</h3>
                    <p className="party-team-score-label">Очки: 0</p>
                  </div>
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
                <div className="party-team-card-header">
                  <span className="party-team-emoji">🌴</span>
                  <div>
                    <h3 className="party-team-title">{team2Name}</h3>
                    <p className="party-team-score-label">Очки: 0</p>
                  </div>
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
            <div className="party-team-actions">
              <button
                onClick={handleShuffleAgain}
                className="party-button party-btn-blue"
              >
                ПЕРЕМЕШАТЬ ЕЩЁ РАЗ
              </button>
              <button
                onClick={handleNavigateToChallenges}
                className="party-button party-btn-green"
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
