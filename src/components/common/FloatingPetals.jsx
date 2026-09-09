import React from 'react';

export default function FloatingPetals({ count = 8 }) {
  const petals = [
    { top: '8%', left: '6%', size: 'w-4 h-6', delay: '0s', duration: '16s', anim: 'animate-petal-1', color: 'fill-pink-200/40 text-pink-300/30' },
    { top: '18%', right: '10%', size: 'w-3 h-5', delay: '3s', duration: '22s', anim: 'animate-petal-2', color: 'fill-rose-200/30 text-rose-300/20' },
    { top: '48%', left: '12%', size: 'w-5 h-7', delay: '5s', duration: '19s', anim: 'animate-petal-3', color: 'fill-emerald-100/40 text-emerald-200/30' },
    { top: '65%', right: '16%', size: 'w-4 h-5', delay: '2s', duration: '25s', anim: 'animate-petal-2', color: 'fill-pink-100/50 text-pink-200/40' },
    { top: '35%', left: '46%', size: 'w-3 h-4', delay: '7s', duration: '20s', anim: 'animate-petal-1', color: 'fill-rose-100/30 text-rose-200/25' },
    { top: '78%', left: '28%', size: 'w-4 h-6', delay: '4s', duration: '18s', anim: 'animate-petal-3', color: 'fill-pink-200/35 text-pink-300/25' },
    { top: '88%', right: '35%', size: 'w-3 h-5', delay: '1s', duration: '21s', anim: 'animate-petal-2', color: 'fill-rose-200/25 text-rose-300/20' },
    { top: '22%', left: '30%', size: 'w-4 h-5', delay: '6s', duration: '24s', anim: 'animate-petal-1', color: 'fill-emerald-100/35 text-emerald-200/25' },
  ].slice(0, count);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {petals.map((petal, index) => (
        <div
          key={index}
          className={`absolute ${petal.anim} transition-all`}
          style={{
            top: petal.top,
            left: petal.left,
            right: petal.right,
            animationDuration: petal.duration,
            animationDelay: petal.delay,
          }}
        >
          <svg
            viewBox="0 0 30 42"
            className={`${petal.size} ${petal.color} filter drop-shadow-xs transform rotate-12`}
          >
            {/* Organic curved botanical petal silhouette */}
            <path
              d="M15 2 C23 10, 29 22, 24 35 C19 41, 11 41, 6 35 C1 22, 7 10, 15 2 Z"
              stroke="currentColor"
              strokeWidth="0.8"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}