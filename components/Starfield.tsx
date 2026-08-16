/* Deterministic star positions — no hydration mismatch, no JS at runtime. */
function rand(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export default function Starfield({ count = 90 }: { count?: number }) {
  const stars = Array.from({ length: count }, (_, i) => ({
    left: rand(i + 1) * 100,
    top: rand(i + 51) * 100,
    size: 1 + rand(i + 101) * 2.1,
    delay: rand(i + 151) * 6,
    dur: 3 + rand(i + 201) * 5,
    op: 0.25 + rand(i + 251) * 0.6,
  }));

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-cream animate-twinkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.op,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
      {/* shooting stars */}
      {[0, 1].map((i) => (
        <span
          key={`sh-${i}`}
          className="absolute h-px w-24 animate-shooting bg-gradient-to-l from-transparent via-pale-gold to-transparent"
          style={{
            left: `${70 + i * 18}%`,
            top: `${8 + i * 22}%`,
            animationDelay: `${i * 4.5 + 2}s`,
          }}
        />
      ))}
    </div>
  );
}
