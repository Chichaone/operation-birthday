import React, { useMemo, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import WelcomePage from "./pages/WelcomePage";
import TeamsPage from "./pages/TeamsPage";
import ChallengesPage from "./pages/ChallengesPage";

type FloatingShape = {
  type: "circle" | "star" | "diamond" | "heart";
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  opacity?: number;
};

const MusicToggle = ({ isPlaying, onToggle }: { isPlaying: boolean; onToggle: () => void }) => (
  <div className="absolute top-4 right-4">
    <button
      onClick={onToggle}
      className={`party-music-toggle px-4 py-2 text-sm md:text-base rounded-full bg-white/20 text-white border border-white/40 shadow-md hover:shadow-lg transition`}
    >
      Музыка: {isPlaying ? "вкл" : "выкл"}
    </button>
  </div>
);

const App = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMusicOn, setIsMusicOn] = useState(false);

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

  return (
    <div
      className={`party-background min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-b from-sky-200 via-blue-400 to-blue-700`}
      style={{ background: "linear-gradient(180deg, #8ec5ff 0%, #4a74d9 100%)" }}
    >
      <audio ref={audioRef} src="/audio/intro.mp3" className="hidden" loop />

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

      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/challenges" element={<ChallengesPage />} />
      </Routes>
    </div>
  );
};

export default App;
