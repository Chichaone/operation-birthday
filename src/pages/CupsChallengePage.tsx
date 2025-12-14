import React, { useState, useEffect } from "react";
import ScoreBoard from "../components/ScoreBoard";
import ChallengeHeader from "../components/ChallengeHeader";

type CupRound = {
    id: number;
    title: string;
    videoSrc: string;
    description: string | React.ReactNode;
    pointsHint: string;
};

const CUP_ROUNDS: CupRound[] = [
    {
        id: 1,
        title: "Раунд 1 — Собери все стаканчики шариком",
        videoSrc: `${import.meta.env.BASE_URL}videos/cups/round1.mp4`,
        description: (
            <>
                Игроки с помощью воздушного шарика должны собрать стаканчики друг в друга.
                <br />
                <strong>Кто быстрее соберет?</strong>
            </>
        ),
        pointsHint: "1 балл самому быстрому.",
    },
    {
        id: 2,
        title: "Раунд 2 — Башенный Ниндзя",
        videoSrc: `${import.meta.env.BASE_URL}videos/cups/round2.mp4`,
        description: (
            <>
                У каждой команды есть башня из пластиковых стаканчиков, сверху — лёгкий шарик.
                <br />
                <br />
                <strong>Задание:</strong>
                <ul style={{ listStyle: "none", paddingLeft: 0, marginTop: "0.5rem" }}>
                    <li>👉 разобрать башню по одному стаканчику,</li>
                    <li>👉 перекладывая их вниз,</li>
                    <li>👉 <strong>НЕ уронив шарик ни на секунду</strong>.</li>
                </ul>
                Кто разберёт пирамиду быстрее и без ошибок — тот выигрывает раунд.
            </>
        ),
        pointsHint: "1 балл за победу.",
    },
    {
        id: 3,
        title: "Раунд 3 — КРЕСТОФЛИП",
        videoSrc: `${import.meta.env.BASE_URL}videos/cups/round3.mp4`,
        description: (
            <>
                ⚡ <strong>Цель</strong> — выиграть в крестики нолики.
                <br />
                <br />
                <strong>🥤 КАК ПРОХОДИТ РАУНД</strong>
                <div style={{ marginTop: "0.5rem" }}>
                    1️⃣ Каждый игрок подходит к столу. Перед ним стопка своих стаканов.
                </div>
                <div style={{ marginTop: "0.3rem" }}>
                    2️⃣ Игрок берёт верхний стакан и выполняет задачу: <strong>🔄 Перевернуть стакан!</strong>
                    <br />
                    Но не просто перевернуть — нужно сделать «флип»: бросить стакан так, чтобы он встал дном вниз на стол.
                </div>
                <div style={{ marginTop: "0.3rem" }}>
                    3️⃣ Как только игрок успешно перевернул стакан, то быстро ставит стакан в любую свободную клетку.
                </div>
            </>
        ),
        pointsHint: "2 балла команде победителей.",
    },
    {
        id: 4,
        title: "Раунд 4 — Охота за стаканами",
        videoSrc: `${import.meta.env.BASE_URL}videos/cups/round4.mp4`,
        description: (
            <>
                ⚡ <strong>Цель</strong> — собрать все стаканчики быстрее соперника.
                <br />
                <br />
                <strong>🔹 1. Подготовка</strong>
                <br />
                Перед каждым игроком лежит одинаковое количество стаканчиков. В центре лежит игральный кубик.
                <br />
                <br />
                <strong>🔹 2. Ход игрока</strong>
                <br />
                Игрок бросает кубик. 👉 Кубик показывает число 1…6 — столько стаканов он может «собрать» в башню. Но только по правилам:
                <br />
                <strong>Как собирать:</strong>
                <ul style={{ listStyle: "none", paddingLeft: 0, marginTop: "0.3rem" }}>
                    <li>✔ Игрок берет столько стаканчиков, сколько показал кубик</li>
                    <li>✔ Складывает их в башню</li>
                    <li>✔ Ходы происходят по очереди</li>
                    <li>✔ Верхний стаканчик должен быть обязательно твоего цвета</li>
                </ul>
                <br />
                <strong>🔹 3. Кто выигрывает?</strong>
                <br />
                🎉 Первым полностью собравший стопку игрок!
            </>
        ),
        pointsHint: "1 балл за победу.",
    },
    {
        id: 5,
        title: "Раунд 5 — Четыре шага до победы",
        videoSrc: `${import.meta.env.BASE_URL}videos/cups/round5.mp4`,
        description: (
            <>
                Перед игроками поле из линий, похожее на квадратную сетку. На пересечениях стоят стаканчики разных цветов.
                <br />
                <br />
                Каждый игрок по очереди выбирает любой свой стакан и:
                <ul style={{ listStyle: "none", paddingLeft: 0, marginTop: "0.5rem" }}>
                    <li>👉 делает им <strong>4 шага подряд</strong>,</li>
                    <li>👉 каждый шаг — это перемещение на соседнее пересечение квадратика.</li>
                </ul>
                <br />
                <strong>Побеждает тот, чей стаканчик останется последним на поле!</strong>
            </>
        ),
        pointsHint: "2 балла стратегу за победу.",
    },
    {
        id: 6,
        title: "Раунд 6 — СТАКАНОХВАТ",
        videoSrc: `${import.meta.env.BASE_URL}videos/cups/round6.mp4`,
        description: (
            <>
                Финальная битва на реакцию!
                <br />
                <br />
                🎯 <strong>Цель игры:</strong> Поймать подброшенный стакан другим стаканом быстрее и аккуратнее, чем соперник.
            </>
        ),
        pointsHint: "3 балла",
    },
    {
        id: 7,
        title: "Раунд 7 — СМОТРИ НЕ ТУДА",
        videoSrc: `${import.meta.env.BASE_URL}videos/cups/round7.mp4`,
        description: (
            <>
                <h3>Правила игры</h3>
                <ol>
                    <li>Один игрок показывает рукой в любую сторону (вверх, вниз, влево или вправо).</li>
                    <li>Второй игрок одновременно поворачивает голову в одну из сторон.</li>
                    <li><strong>Если направления совпали — второй игрок проиграл.</strong></li>
                    <li>Если не совпало — роли меняются. Игра продолжается!</li>
                </ol>
            </>
        ),
        pointsHint: "3 балла",
    },
    {
        id: 8,
        title: "Раунд 8 — 🎲 ХРУСТ-РУЛЕТКА",
        videoSrc: `${import.meta.env.BASE_URL}videos/cups/round8.mp4`,
        description: (
            <>
                <h3>Правила игры</h3>
                <ol>
                    <li>Игроки по очереди бросают кубик.</li>
                    <li>Считают число на кубике (сколько выпало).</li>
                    <li>Выбирают одну чипсину и обводят линиями на поле столько шагов/клеток, сколько выпало.</li>
                    <li>Если всё сделано правильно — игрок съедает эту чипсину 😋</li>
                    <li>Играем, пока чипсы не закончатся.</li>
                    <li><strong>Побеждает тот, кто съел больше чипсин!</strong> 🏆</li>
                </ol>

                <p>Совет: хрустеть громко — это добавляет +1 к настроению 😄</p>
            </>
        ),
        pointsHint: "3 балла",
    },
    {
        id: 9,
        title: "Раунд 9 — ПИНГ-БУЛЬК",
        videoSrc: `${import.meta.env.BASE_URL}videos/cups/round10.mp4`,
        description: (
            <>
                <h3>Правила игры</h3>
                <ol>
                    <li>Ставим несколько стаканов на стол/пол.</li>
                    <li>Игрок кидает мячик для пинг-понга в стаканы.</li>
                    <li>Каждое попадание = 1 очко.</li>
                    <li>Играем по таймеру или по количеству бросков.</li>
                    <li><strong>Побеждает тот, кто набрал больше очков.</strong></li>
                </ol>

                <p>Совет: кидай мягко и точно 😉</p>
            </>
        ),
        pointsHint: "Столько баллов сколько очков набрал игрок",
    },
    {
        id: 10,
        title: "Раунд 10 — 🍝 МАКАРОНО-МАРАФОН",
        videoSrc: `${import.meta.env.BASE_URL}videos/cups/round11.mp4`,
        description: (
            <>
                <h3>Правила игры</h3>
                <ol>
                    <li>Палочка зажата между зубами (руками не трогаем!).</li>
                    <li>Нужно надеть макаронины на палочку и заполнить её полностью.</li>
                    <li><strong>Кто справился быстрее — победил!</strong> 🏆</li>
                </ol>

                <p>⚡ Не смейся — промахнёшься!</p>
            </>
        ),
        pointsHint: "5 баллов",
    },
    {
        id: 11,
        title: "Раунд 11 — ХВАТАЙ!",
        videoSrc: `${import.meta.env.BASE_URL}videos/cups/round9.mp4`,
        description: (
            <>
                <h3>Правила игры</h3>
                <ol>
                    <li>Встаньте по парам, стакан — между вами.</li>
                    <li>Ведущий говорит, куда положить руки.</li>
                    <li>В любой момент звучит команда <strong>«СТАКАН!»</strong></li>
                    <li><strong>Кто первым схватил стакан — победил.</strong></li>
                </ol>

                <p>⚠️ Не моргай — реакция решает всё!</p>
            </>
        ),
        pointsHint: "4 балла",
    },
    {
        id: 12,
        title: "Раунд 12 — СЛЕПОЙ УДАР",
        videoSrc: `${import.meta.env.BASE_URL}videos/cups/round12.mp4`,
        description: (
            <>
                <h3>Правила игры</h3>
                <ol>
                    <li>Игроки встают по парам.</li>
                    <li>Одному игроку <strong>завязывают глаза</strong> и дают мягкую палку.</li>
                    <li>Второй игрок становится напротив и держит перед собой тарелку.</li>
                    <li>
                        Игрок с палкой <strong>выбирает часть тела</strong> (рука, плечо, нога и т.д.)
                        и аккуратно пытается ударить.
                    </li>
                    <li>
                        Задача второго игрока — <strong>угадать, куда будет удар</strong>, и <strong>прикрыть это место тарелкой</strong>.
                    </li>
                    <li>Если тарелка оказалась на нужном месте — защита успешна 🛡️</li>
                </ol>

                <h3 style={{ marginTop: "1rem" }}>Подсчёт очков</h3>
                <ul>
                    <li>На пару даётся <strong>5 попыток</strong></li>
                    <li>✅ Угадал и прикрыл — <strong>1 балл</strong></li>
                    <li>❌ Не угадал — <strong>0 баллов</strong></li>
                </ul>

                <p>
                    👉 После 5 ударов игроки <strong>меняются ролями</strong>
                    <br />
                    👉 Побеждает команда с <strong>большим общим счётом</strong> 🏆
                </p>

                <p>⚠️ Играем аккуратно — здесь важнее реакция, интуиция и веселье 😄</p>
            </>
        ),
        pointsHint: "4 балла",
    },
];

type CupsChallengePageProps = {
    stitchScore: number;
    hawaiiScore: number;
    setStitchScore: React.Dispatch<React.SetStateAction<number>>;
    setHawaiiScore: React.Dispatch<React.SetStateAction<number>>;
    team1Name?: string;
    team2Name?: string;
};

const CupsChallengePage: React.FC<CupsChallengePageProps> = ({
    stitchScore,
    hawaiiScore,
    setStitchScore,
    setHawaiiScore,
    team1Name,
    team2Name,
}) => {
    const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const currentRound = CUP_ROUNDS[currentRoundIndex];

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleNextRound = () => {
        setCurrentRoundIndex((prev) => (prev === CUP_ROUNDS.length - 1 ? prev : prev + 1));
    };

    const handlePrevRound = () => {
        setCurrentRoundIndex((prev) => (prev === 0 ? prev : prev - 1));
    };

    return (
        <div className={`party-challenges-page party-fade-in ${isVisible ? "party-fade-in-visible" : ""}`}>
            <div className="party-challenges-inner" style={{ flexDirection: "column", alignItems: "center" }}>
                {/* Хедер с навигацией и заголовком */}
                <ChallengeHeader title="Конкурсы на ваш вкус" />

                {/* Фиксированный счёт слева */}
                <div className="party-scoreboard-fixed">
                    <ScoreBoard
                        stitchScore={stitchScore}
                        hawaiiScore={hawaiiScore}
                        setStitchScore={setStitchScore}
                        setHawaiiScore={setHawaiiScore}
                        team1Name={team1Name}
                        team2Name={team2Name}
                    />
                </div>

                {/* ✅ Центруем карточку по центру экрана */}
                <main
                    className="party-main"
                    style={{
                        minHeight: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                    }}
                >
                    {/* Контейнер с карточкой и кнопками навигации */}
                    <div
                        style={{
                            position: "relative",
                            width: "100%",
                            maxWidth: "800px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {/* Кнопка предыдущего раунда */}
                        <button
                            className="party-card-nav-button party-card-nav-prev"
                            onClick={handlePrevRound}
                            disabled={currentRoundIndex === 0}
                            title="Предыдущий раунд"
                            aria-label="Предыдущий раунд"
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {/* Карточка текущего раунда */}
                        <section className="party-challenge-card" style={{ width: "100%", minHeight: "520px" }}>
                            <div className="party-dance-round-header">
                                <div className="party-challenge-indicator">
                                    Раунд {currentRoundIndex + 1} из {CUP_ROUNDS.length}
                                </div>
                                <h3 className="party-challenge-title">{currentRound.title}</h3>
                            </div>

                            <div
                                className="party-dance-video-wrapper"
                                style={{ marginTop: "1rem", borderRadius: "1rem", overflow: "hidden", background: "#000" }}
                            >
                                <video
                                    key={currentRound.videoSrc}
                                    className="party-dance-video"
                                    style={{ width: "100%", maxHeight: "50vh", display: "block" }}
                                    controls
                                    src={currentRound.videoSrc}
                                >
                                    Ваш браузер не поддерживает видео.
                                </video>
                            </div>

                            <div className="party-challenge-description party-text" style={{ marginTop: "1.5rem" }}>
                                {currentRound.description}
                            </div>
                            <p className="party-challenge-points-hint">{currentRound.pointsHint}</p>
                        </section>

                        {/* Кнопка следующего раунда */}
                        <button
                            className="party-card-nav-button party-card-nav-next"
                            onClick={handleNextRound}
                            disabled={currentRoundIndex === CUP_ROUNDS.length - 1}
                            title="Следующий раунд"
                            aria-label="Следующий раунд"
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CupsChallengePage;
