import React from "react";
import { useNavigate } from "react-router-dom";

type ChallengeHeaderProps = {
    title: string;
    backTo?: string; // Default to "/challenges"
};

const ChallengeHeader: React.FC<ChallengeHeaderProps> = ({
    title,
    backTo = "/challenges"
}) => {
    const navigate = useNavigate();

    return (
        <>
            {/* Фиксированная кнопка "Назад" */}
            <button
                className="party-back-to-teams-button"
                onClick={() => navigate(backTo)}
                title="Назад"
                aria-label="Назад"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* Заголовок страницы */}
            <header style={{ textAlign: "center", marginBottom: "2rem" }}>
                <h2 className="party-title" style={{ margin: 0 }}>
                    {title}
                </h2>
            </header>
        </>
    );
};

export default ChallengeHeader;
