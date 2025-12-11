import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => (
    <header className="party-header">
        <h1 className="party-title">
            ВЕЧЕРИНКА STITCH PARTY CHALLENGE
        </h1>
        <p className="party-subtitle">
            Сегодня не просто день рождения.
            <br />
            Сегодня — самая весёлая вечеринка года 💙
        </p>
    </header>
);

const Mascot = () => (
    <div className="party-mascot">
        <div className="party-mascot-wrapper">
            {/* маскот: файл лежит в public/images/mascot.png */}
            <img
                src="/images/mascot.png"
                alt="Маскот вечеринки"
                className="party-mascot-image"
            />
        </div>
    </div>
);

const WelcomeCard = () => (
    <div className="party-welcome-card">
        <p className="party-text">
            Привет! Если вы здесь, значит вы готовы:
            <br />🔥 танцевать
            <br />🎯 соревноваться
            <br />😂 смеяться
            <br />
            и получать сюрпризы!
        </p>
    </div>
);

const StartButton = ({ onClick }: { onClick: () => void }) => (
    <div className="party-start-wrapper">
        <button
            onClick={onClick}
            className="party-button party-btn-pink party-start-button"
        >
            НАЧАТЬ ВЕЧЕРИНКУ
        </button>
        <span className="party-start-caption">Обратной дороги нет 😎</span>
    </div>
);

const WelcomePage: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => setIsVisible(true), 80);
        return () => clearTimeout(timeout);
    }, []);

    const handleStart = () => {
        setIsExiting(true);
        setTimeout(() => navigate("/teams"), 500); // длительность анимации fade-out
    };

    return (
        <div
            className={`party-welcome-page party-fade-in ${
                isVisible ? "party-fade-in-visible" : ""
            } ${isExiting ? "party-fade-out" : ""}`}
        >
            <Header />

            <main className="party-main">
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
