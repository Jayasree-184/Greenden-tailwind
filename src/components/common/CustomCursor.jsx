import React, { useState, useEffect } from 'react';

/**
 * Desktop-only subtle botanical trailing cursor.
 * Complements the native cursor without replacing it.
 * Strictly disabled on touch devices and when prefers-reduced-motion is active.
 */
export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices with fine control
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      if (!target) return;

      // Check if target or parent is a clickable button, link, or interactive item
      const isInteractive = target.closest('button, a, input, select, textarea, [role="button"]');
      setIsHovered(!!isInteractive);

      // Check if target or parent is a flower product image link
      const isProductImage = target.closest('[data-cursor="view"], article img, .group img');
      setIsViewMode(!!isProductImage && !isInteractive);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isEnabled || !isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out hidden md:block"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
      aria-hidden="true"
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-200 border ${
          isViewMode
            ? 'w-16 h-16 bg-emerald-950/80 backdrop-blur-xs border-emerald-400/60 text-white shadow-lg'
            : isHovered
            ? 'w-10 h-10 bg-emerald-700/15 border-emerald-800/40 shadow-xs'
            : 'w-6 h-6 bg-emerald-800/10 border-emerald-800/25'
        }`}
      >
        {isViewMode && (
          <span className="text-[10px] font-bold tracking-widest uppercase font-sans text-emerald-100">
            VIEW
          </span>
        )}
      </div>
    </div>
  );
}