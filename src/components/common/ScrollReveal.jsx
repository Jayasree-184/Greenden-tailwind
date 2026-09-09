import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * Reusable scroll reveal component.
 * Applies smooth organic entrance animations on viewport intersection.
 * Supports fade-up, fade-left, fade-right, scale-in, bloom.
 */
export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 750,
  threshold = 0.12,
  rootMargin = '0px 0px -40px 0px',
  className = '',
  as: Tag = 'div',
  ...props
}) {
  const [ref, isVisible] = useScrollReveal({ threshold, rootMargin, triggerOnce: true });

  const getAnimationStyles = () => {
    const baseTransition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`;
    const delayStyle = delay ? `${delay}ms` : '0ms';

    if (isVisible) {
      return {
        opacity: 1,
        transform: 'none',
        transition: baseTransition,
        transitionDelay: delayStyle,
      };
    }

    switch (animation) {
      case 'fade-left':
        return {
          opacity: 0,
          transform: 'translateX(-32px)',
          transition: baseTransition,
          transitionDelay: delayStyle,
        };
      case 'fade-right':
        return {
          opacity: 0,
          transform: 'translateX(32px)',
          transition: baseTransition,
          transitionDelay: delayStyle,
        };
      case 'scale-in':
        return {
          opacity: 0,
          transform: 'scale(0.92)',
          transition: baseTransition,
          transitionDelay: delayStyle,
        };
      case 'bloom':
        return {
          opacity: 0,
          transform: 'translateY(24px) scale(0.94)',
          transition: baseTransition,
          transitionDelay: delayStyle,
        };
      case 'fade-up':
      default:
        return {
          opacity: 0,
          transform: 'translateY(24px)',
          transition: baseTransition,
          transitionDelay: delayStyle,
        };
    }
  };

  return (
    <Tag
      ref={ref}
      style={getAnimationStyles()}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  );
}