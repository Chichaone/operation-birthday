import { useEffect, useRef, useState } from 'react';

const floatingItems = [
  { className: 'shape-heart animate-drift', top: '12%', left: '14%', delay: '0s' },
  { className: 'shape-star animate-drift', top: '24%', left: '78%', delay: '1s' },
  { className: 'shape-confetti animate-drift', top: '68%', left: '20%', delay: '2s' },
  { className: 'shape-heart animate-drift', top: '72%', left: '82%', delay: '0.5s' },
  { className: 'shape-star animate-drift', top: '8%', left: '52%', delay: '1.6s' },
  { className: 'shape-confetti animate-drift', top: '42%', left: '8%', delay: '2.3s' },
  { className: 'shape-star animate-drift', top: '86%', left: '46%', delay: '1.1s' },
  { className: 'shape-heart animate-drift', top: '34%', left: '36%', delay: '0.7s' }
];

function App() {
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.loop = true;
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (musicOn) {
      audio.pause();
      setMusicOn(false);
      return;
    }

    audio
      .play()
      .then(() => setMusicOn(true))
      .catch(() => setMusicOn(false));
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-party-blue-start to-party-blue-end px-6 py-10 text-center text-slate-900">
      <div className="pointer-events-none absolute inset-0">
        {floatingItems.map((item, index) => (
          <span
            key={`${item.className}-${index}`}
            className={`floating-shape ${item.className}`}
            style={{ top: item.top, left: item.left, animationDelay: item.delay }}
          />
        ))}
        <div className="absolute -left-20 top-24 h-36 w-36 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute -right-16 bottom-16 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="absolute right-6 top-6 z-20 flex items-center gap-3 text-lg font-semibold text-slate-800">
        <button
          onClick={toggleMusic}
          className="rounded-full bg-white/70 px-5 py-2 shadow-lg shadow-slate-900/10 transition hover:scale-105 hover:shadow-xl"
        >
          {`Музыка: ${musicOn ? 'вкл' : 'выкл'}`}
        </button>
        <audio ref={audioRef} src="/audio/intro.mp3" />
      </div>

      <section className="relative z-10 flex max-w-5xl flex-col items-center gap-8 rounded-3xl bg-white/15 px-8 py-10 shadow-2xl shadow-slate-900/20 backdrop-blur-lg md:px-12">
        <header className="animate-fadeIn space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-white/80">добро пожаловать</p>
          <h1 className="text-4xl font-black text-white drop-shadow-lg md:text-6xl">ВЕЧЕРИНКА STITCH PARTY CHALLENGE</h1>
          <p className="text-lg text-white/90 md:text-2xl">
            Сегодня не просто день рождения.
            <br />
            Сегодня — самая весёлая вечеринка года 💙
          </p>
        </header>

        <div className="relative flex flex-col items-center gap-6 md:flex-row md:gap-12">
          <div className="relative flex items-center justify-center">
            <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-white/20 blur-2xl md:h-32 md:w-32" />
            <div className="absolute -right-8 bottom-0 h-20 w-20 rounded-full bg-party-accent/30 blur-2xl md:h-28 md:w-28" />
            <img
              src="/images/mascot.png"
              alt="Маскот вечеринки"
              width={280}
              height={280}
              className="animate-float drop-shadow-2xl"
              loading="eager"
            />
          </div>

          <div className="relative max-w-xl rounded-3xl bg-white px-6 py-6 text-left text-lg text-slate-800 shadow-2xl shadow-slate-900/15 md:text-xl">
            <div className="absolute -left-4 top-8 h-6 w-6 rotate-45 bg-white" />
            <p className="leading-relaxed">
              Привет! Если ты здесь, значит ты готова:
              <br />🔥 танцевать
              <br />🎯 соревноваться
              <br />😂 смеяться
              <br />и получать сюрпризы!
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <button
            className="animate-pulseGlow rounded-full bg-party-accent px-10 py-4 text-xl font-extrabold uppercase tracking-wide text-white shadow-2xl shadow-party-accent/40 transition hover:scale-105 active:translate-y-[1px] md:px-14 md:py-5 md:text-2xl"
            onClick={() => {
              console.log('Start the party clicked');
            }}
          >
            НАЧАТЬ ВЕЧЕРИНКУ
          </button>
          <span className="text-sm text-white/90 md:text-base">Обратной дороги нет 😎</span>
        </div>
      </section>
    </main>
  );
}

export default App;
