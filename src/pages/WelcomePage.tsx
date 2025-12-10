import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => (
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

const Mascot = () => (
  <div className="relative flex flex-col items-center">
    <div className="party-mascot-wrapper drop-shadow-2xl">
      <img src="/images/mascot.png" alt="Маскот вечеринки" className="w-60 md:w-72 lg:w-80" />
    </div>
  </div>
);

const WelcomeCard = () => (
  <div className="party-welcome-card text-base md:text-lg lg:text-xl font-medium">
    <p>
      Привет! Если вы здесь, значит вы готовы:
      <br />🔥 танцевать
      <br />🎯 соревноваться
      <br />😂 смеяться
      <br />и получать сюрпризы!
    </p>
  </div>
);

const StartButton = ({ onClick }: { onClick: () => void }) => (
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

const WelcomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 80);
    return () => clearTimeout(timeout);
  }, []);

  const handleStart = () => {
    setIsExiting(true);
    setTimeout(() => navigate("/teams"), 500); // Match animation duration
  };

  return (
    <div
      className={`flex flex-col items-center flex-1 px-4 pb-12 party-fade-in ${
        isVisible ? "party-fade-in-visible" : ""
      } ${isExiting ? "party-fade-out" : ""}`}
    >
      <Header />

      <main className="flex flex-col items-center justify-center flex-1 w-full gap-8">
        <div className="party-welcome-row">
          <Mascot />
          <WelcomeCard />
        </div>
        <StartButton onClick={handleStart} />
      </main>
    </div>
  );
};

export default WelcomePage;