import React, { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

type FloatingShape = {
  type: "circle" | "star" | "diamond" | "heart";
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  opacity?: number;
};

const Header: React.FC = () => (
  <header className="text-center mt-8 space-y-3">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide drop-shadow-sm text-white">
      ВЕЧЕРИНКА STITCH PARTY CHALLENGE
    </h1>
    <p className="text-lg md:text-xl lg:text-2xl text-white/90 leading-snug max-w-2xl mx-auto">
      Сегодня не просто день рождения.
      <br />
      Сегодня — самая весёлая вечеринка года 💙
    </p>
  </header>
);

const Mascot: React.FC = () => (
  <div className="relative flex flex-col items-center">
    <div className="party-mascot-wrapper drop-shadow-2xl">
      {/* Используем изображение из public/images/mascot.png */}
      <img src="/images/mascot.png" alt="Маскот вечеринки" className="w-60 md:w-72 lg:w-80" />
    </div>
  </div>
);

const SpeechBubble: React.FC = () => (
  <div className="party-speech-bubble mt-6 text-base md:text-lg lg:text-xl font-medium max-w-xl text-center">
    Привет! Если ты здесь, значит ты готова:
    <br />🔥 танцевать
    <br />🎯 соревноваться
    <br />😂 смеяться
    <br />и получать сюрпризы!
  </div>
);

const StartButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <div className="mt-8 flex flex-col items-center gap-2">
    <button
      onClick={onClick}
      className={`party-start-button px-10 py-4 rounded-full bg-pink-500 hover:bg-pink-400 text-2xl md:text-3xl font-bold uppercase tracking-wide text-white shadow-xl transform`}
    >
      НАЧАТЬ ВЕЧЕРИНКУ
    </button>
    <span className="text-white/85 text-lg">Обратной дороги нет 😎</span>
  </div>
);

const MusicToggle: React.FC<{ isPlaying: boolean; onToggle: () => void }> = ({ isPlaying, onToggle }) => (
  <div className="absolute top-4 right-4">
    <button
      onClick={onToggle}
      className={`party-music-toggle px-4 py-2 text-sm md:text-base rounded-full bg-white/20 text-white border border-white/40 shadow-md hover:shadow-lg transition`}
    >
      Музыка: {isPlaying ? "вкл" : "выкл"}
    </button>
  </div>
);

const WelcomeScreen: React.FC<{ isVisible: boolean; isExiting: boolean; onStart: () => void }> = ({
  isVisible,
  isExiting,
  onStart,
}) => (
  <div
    className={`flex flex-col items-center flex-1 px-4 pb-12 party-fade-in ${
      isVisible ? "party-fade-in-visible" : ""
    } ${isExiting ? "party-fade-out" : ""}`}
  >
    <Header />

    <main className="flex flex-col items-center justify-center flex-1 w-full">
      <Mascot />
      <SpeechBubble />
      <StartButton onClick={onStart} />
    </main>
  </div>
);

type TeamsScreenProps = {
  players: string[];
  onPlayerChange: (index: number, value: string) => void;
  onDivide: () => void;
  onClear: () => void;
  teamStitch: string[];
  teamHawaii: string[];
  onShuffleAgain: () => void;
  onNext: () => void;
};

const TeamsScreen: React.FC<TeamsScreenProps> = ({
  players,
  onPlayerChange,
  onDivide,
  onClear,
  teamStitch,
  teamHawaii,
  onShuffleAgain,
  onNext,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 40);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`flex flex-col flex-1 px-4 py-12 md:py-16 lg:py-20 items-center party-fade-in ${
        isVisible ? "party-fade-in-visible" : ""
      }`}
    >
      <div className="max-w-4xl w-full text-center text-white space-y-6">
        <div className="space-y-2">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-sm">СОСТАВЛЯЕМ КОМАНДЫ 💙</h2>
          <p className="text-lg md:text-xl text-white/90">
            Введите имена участниц и нажмите «Разделить на команды»
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {players.map((player, index) => (
            <input
              key={index}
              value={player}
              onChange={(event) => onPlayerChange(index, event.target.value)}
              placeholder={`Участница ${index + 1}`}
              className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-900 placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={onDivide}
            className="px-6 py-3 rounded-full bg-pink-500 hover:bg-pink-400 text-white font-semibold shadow-lg transition"
          >
            РАЗДЕЛИТЬ НА КОМАНДЫ
          </button>
          <button
            onClick={onClear}
            className="px-6 py-3 rounded-full bg-white/25 hover:bg-white/35 text-white font-semibold border border-white/40 shadow-lg transition"
          >
            ОЧИСТИТЬ ИМЕНА
          </button>
        </div>

        {(teamStitch.length > 0 || teamHawaii.length > 0) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 party-team-grid">
            <div className="bg-white/90 text-sky-900 rounded-2xl p-6 shadow-2xl party-team-card">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">💙</span>
                <div>
                  <h3 className="text-2xl font-bold">Команда Стича</h3>
                  <p className="text-sm text-sky-800/80">Очки: 0</p>
                </div>
              </div>
              <ul className="space-y-2 text-left text-lg font-semibold">
                {teamStitch.map((playerName, idx) => (
                  <li
                    key={`${playerName}-${idx}`}
                    className="px-3 py-2 rounded-lg bg-sky-100 text-sky-900"
                  >
                    {playerName}
                  </li>
                ))}
                {teamStitch.length === 0 && <li className="text-sky-800/70">Пока пусто — добавьте имена</li>}
              </ul>
            </div>

            <div className="bg-white/90 text-emerald-900 rounded-2xl p-6 shadow-2xl party-team-card">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🌴</span>
                <div>
                  <h3 className="text-2xl font-bold">Команда Гавайев</h3>
                  <p className="text-sm text-emerald-800/80">Очки: 0</p>
                </div>
              </div>
              <ul className="space-y-2 text-left text-lg font-semibold">
                {teamHawaii.map((playerName, idx) => (
                  <li
                    key={`${playerName}-${idx}`}
                    className="px-3 py-2 rounded-lg bg-emerald-100 text-emerald-900"
                  >
                    {playerName}
                  </li>
                ))}
                {teamHawaii.length === 0 && <li className="text-emerald-800/70">Пока пусто — добавьте имена</li>}
              </ul>
            </div>
          </div>
        )}

        {(teamStitch.length > 0 || teamHawaii.length > 0) && (
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={onShuffleAgain}
              className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg transition"
            >
              ПЕРЕМЕШАТЬ ЕЩЁ РАЗ
            </button>
            <button
              onClick={onNext}
              className="px-6 py-3 rounded-full bg-green-500 hover:bg-green-400 text-white font-semibold shadow-lg transition"
            >
              ПЕРЕЙТИ К КОНКУРСАМ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [welcomeVisible, setWelcomeVisible] = useState(false);
  const [welcomeExiting, setWelcomeExiting] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<"welcome" | "teams" | "challenges">("welcome");
  const [players, setPlayers] = useState<string[]>(["", "", "", "", "", ""]);
  const [teamStitch, setTeamStitch] = useState<string[]>([]);
  const [teamHawaii, setTeamHawaii] = useState<string[]>([]);

  const floatingShapes = useMemo<FloatingShape[]>(
    () => [
      { type: "circle", left: "8%", top: "10%", size: 10, duration: 16, delay: 0 },
      { type: "star", left: "20%", top: "35%", size: 14, duration: 18, delay: 2 },
      { type: "diamond", left: "70%", top: "15%", size: 12, duration: 15, delay: 1 },
      { type: "circle", left: "85%", top: "30%", size: 18, duration: 20, delay: 3 },
      { type: "heart", left: "50%", top: "20%", size: 16, duration: 17, delay: 1.5 },
      { type: "star", left: "15%", top: "70%", size: 18, duration: 19, delay: 0.5 },
      { type: "diamond", left: "60%", top: "75%", size: 14, duration: 16, delay: 2.5 },
      { type: "circle", left: "75%", top: "55%", size: 12, duration: 18, delay: 0.8 },
      { type: "heart", left: "35%", top: "60%", size: 14, duration: 21, delay: 1.2 },
    ],
    []
  );

  useEffect(() => {
    const timeout = setTimeout(() => setWelcomeVisible(true), 80);
    return () => clearTimeout(timeout);
  }, []);

  const shuffleNames = (list: string[]) => {
    const array = [...list];
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleToggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMusicOn) {
      audio.pause();
      setIsMusicOn(false);
    } else {
      audio
        .play()
        .then(() => setIsMusicOn(true))
        .catch(() => setIsMusicOn(false));
    }
  };

  const handleStart = () => {
    console.log("Start the party clicked");
    setWelcomeExiting(true);
    setWelcomeVisible(false);
    setTimeout(() => setCurrentScreen("teams"), 460);
  };

  const handlePlayerChange = (index: number, value: string) => {
    setPlayers((prev) => prev.map((player, idx) => (idx === index ? value : player)));
  };

  const handleDivideTeams = () => {
    const filled = players.map((player) => player.trim()).filter(Boolean);
    const shuffled = shuffleNames(filled);
    const midpoint = Math.ceil(shuffled.length / 2);

    // Разделение на команды
    setTeamStitch(shuffled.slice(0, midpoint));
    setTeamHawaii(shuffled.slice(midpoint));
  };

  const handleClearNames = () => {
    setPlayers(["", "", "", "", "", ""]);
    setTeamStitch([]);
    setTeamHawaii([]);
  };

  const handleShuffleAgain = () => {
    const combined = [...teamStitch, ...teamHawaii];
    const baseList = combined.length ? combined : players.map((player) => player.trim()).filter(Boolean);
    const shuffled = shuffleNames(baseList);
    const midpoint = Math.ceil(shuffled.length / 2);

    // Перемешивание уже существующих команд
    setTeamStitch(shuffled.slice(0, midpoint));
    setTeamHawaii(shuffled.slice(midpoint));
  };

  const handleGoToChallenges = () => {
    // Переход к конкурсам
    setCurrentScreen("challenges");
  };

  return (
    <div
      className={`party-background min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-b from-sky-200 via-blue-400 to-blue-700`}
      style={{ background: "linear-gradient(180deg, #8ec5ff 0%, #4a74d9 100%)" }}
    >
      {/* Используем аудиофайл из public/audio/intro.mp3 */}
      <audio ref={audioRef} src="/audio/intro.mp3" className="hidden" />

      <div className="party-decorations" aria-hidden={true}>
        {floatingShapes.map((shape, index) => (
          <span
            key={`${shape.type}-${index}`}
            className={`party-floating-element party-${shape.type}`}
            style={{
              left: shape.left,
              top: shape.top,
              width: shape.size,
              height: shape.size,
              animationDuration: `${shape.duration}s`,
              animationDelay: `${shape.delay}s`,
              opacity: shape.opacity ?? 0.6,
            }}
          />
        ))}
      </div>

      <MusicToggle isPlaying={isMusicOn} onToggle={handleToggleMusic} />

      {currentScreen === "welcome" && (
        <WelcomeScreen isVisible={welcomeVisible} isExiting={welcomeExiting} onStart={handleStart} />
      )}

      {currentScreen === "teams" && (
        <TeamsScreen
          players={players}
          onPlayerChange={handlePlayerChange}
          onDivide={handleDivideTeams}
          onClear={handleClearNames}
          teamStitch={teamStitch}
          teamHawaii={teamHawaii}
          onShuffleAgain={handleShuffleAgain}
          onNext={handleGoToChallenges}
        />
      )}

      {currentScreen === "challenges" && (
        <div className="flex flex-col flex-1 items-center justify-center text-center text-white party-fade-in party-fade-in-visible px-4 pb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold drop-shadow">Скоро конкурсы!</h2>
          <p className="mt-4 text-lg md:text-xl text-white/85 max-w-2xl">
            Команды готовы — осталось подготовить испытания. Stay tuned ✨
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
