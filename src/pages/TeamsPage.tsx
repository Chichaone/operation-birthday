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

const TeamsPage = () => {
  const [players, setPlayers] = useState<string[]>([""]);
  const [teamStitch, setTeamStitch] = useState<string[]>([]);
  const [teamHawaii, setTeamHawaii] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Плавное появление страницы
    const timeout = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  const handlePlayerChange = (index: number, value: string) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = value;
    setPlayers(updatedPlayers);
  };

  const handleAddPlayer = () => {
    setPlayers([...players, ""]);
  };

  const handleRemoveLastPlayer = () => {
    if (players.length > 1) {
      setPlayers(players.slice(0, -1));
    }
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
      className={`flex flex-col flex-1 px-4 py-12 md:py-16 lg:py-20 items-center party-fade-in ${
        isVisible ? "party-fade-in-visible" : ""
      }`}
    >
      <div className="max-w-4xl w-full text-center text-white space-y-6">
        <div className="space-y-2">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-sm">СОСТАВЛЯЕМ КОМАНДЫ 💙</h2>
          <p className="text-lg md:text-xl text-white/90">Введите имена участниц и нажмите «Разделить на команды»</p>
        </div>

        {/* Динамический список полей ввода */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {players.map((player, index) => (
            <input
              key={index}
              value={player}
              onChange={(e) => handlePlayerChange(index, e.target.value)}
              placeholder={`Участница ${index + 1}`}
              className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-900 placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg"
            />
          ))}
        </div>

        {/* Кнопки для управления списком */}
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={handleAddPlayer}
            className="px-6 py-3 rounded-full bg-white/25 hover:bg-white/35 text-white font-semibold border border-white/40 shadow-lg transition"
          >
            Добавить участницу
          </button>
          <button
            onClick={handleRemoveLastPlayer}
            disabled={players.length <= 1}
            className="px-6 py-3 rounded-full bg-white/25 hover:bg-white/35 text-white font-semibold border border-white/40 shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Удалить последнюю
          </button>
        </div>

        {/* Основные кнопки действий */}
        <div className="flex flex-wrap gap-3 justify-center pt-4">
          <button
            onClick={handleDivideTeams}
            className="px-8 py-4 rounded-full bg-pink-500 hover:bg-pink-400 text-white font-bold text-xl shadow-lg transition"
          >
            РАЗДЕЛИТЬ НА КОМАНДЫ
          </button>
          <button
            onClick={handleClearList}
            className="px-8 py-4 rounded-full bg-white/25 hover:bg-white/35 text-white font-semibold text-xl border border-white/40 shadow-lg transition"
          >
            ОЧИСТИТЬ СПИСОК
          </button>
        </div>

        {/* Отображение команд */}
        {showTeams && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 pt-6 party-team-grid">
            {/* Карточка Команды Стича */}
            <div className="bg-white/90 text-sky-900 rounded-2xl p-6 shadow-2xl party-team-card">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">💙</span>
                <div>
                  <h3 className="text-2xl font-bold">Команда Стича</h3>
                  <p className="text-sm text-sky-800/80">Очки: 0</p>
                </div>
              </div>
              <ul className="space-y-2 text-left text-lg font-semibold">
                {teamStitch.map((name, idx) => (
                  <li key={idx} className="px-3 py-2 rounded-lg bg-sky-100 text-sky-900">
                    {name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Карточка Команды Гавайев */}
            <div className="bg-white/90 text-emerald-900 rounded-2xl p-6 shadow-2xl party-team-card">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🌴</span>
                <div>
                  <h3 className="text-2xl font-bold">Команда Гавайев</h3>
                  <p className="text-sm text-emerald-800/80">Очки: 0</p>
                </div>
              </div>
              <ul className="space-y-2 text-left text-lg font-semibold">
                {teamHawaii.map((name, idx) => (
                  <li key={idx} className="px-3 py-2 rounded-lg bg-emerald-100 text-emerald-900">
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Кнопки под командами */}
        {showTeams && (
          <div className="flex flex-wrap gap-3 justify-center pt-6">
            <button
              onClick={handleShuffleAgain}
              className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg transition"
            >
              ПЕРЕМЕШАТЬ ЕЩЁ РАЗ
            </button>
            <button
              onClick={handleNavigateToChallenges}
              className="px-6 py-3 rounded-full bg-green-600 hover:bg-green-500 text-white font-semibold shadow-lg transition"
            >
              ПЕРЕЙТИ К КОНКУРСАМ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsPage;