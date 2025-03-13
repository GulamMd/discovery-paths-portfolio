
import { useEffect, useState } from 'react';

export function useIntersectionObserver(
  options: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  }
) {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return { ref: setRef, isIntersecting };
}

export function useParallaxEffect(
  intensity: number = 20,
  reverse: boolean = false
) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.clientX) / intensity;
      const y = (window.innerHeight / 2 - e.clientY) / intensity;
      
      setPosition({
        x: reverse ? -x : x,
        y: reverse ? -y : y,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [intensity, reverse]);

  return position;
}

export function useRandomFloatAnimation(
  baseDelay: number = 0,
  durationRange: [number, number] = [3, 6]
) {
  const [style, setStyle] = useState({});
  
  useEffect(() => {
    const minDuration = durationRange[0];
    const maxDuration = durationRange[1];
    const randomDuration = minDuration + Math.random() * (maxDuration - minDuration);
    const randomDelay = baseDelay + Math.random() * 2;
    
    setStyle({
      animation: `float ${randomDuration}s ease-in-out infinite`,
      animationDelay: `${randomDelay}s`,
    });
  }, [baseDelay, durationRange]);
  
  return style;
}

export function useParachuteDrop(
  initialY: number = -200,
  finalY: number = 0,
  duration: number = 3
) {
  const [y, setY] = useState(initialY);
  const [isDropping, setIsDropping] = useState(true);
  
  useEffect(() => {
    if (isDropping) {
      const timer = setTimeout(() => {
        setY(finalY);
        setIsDropping(false);
      }, duration * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isDropping, finalY, duration]);
  
  const resetDrop = () => {
    setY(initialY);
    setIsDropping(true);
  };
  
  return { y, isDropping, resetDrop };
}

export function useRotateAnimation(
  speed: number = 12,
  reverse: boolean = false,
  baseDelay: number = 0
) {
  const [style, setStyle] = useState({});
  
  useEffect(() => {
    const direction = reverse ? 'reverse' : 'normal';
    const randomDelay = baseDelay + Math.random() * 2;
    
    setStyle({
      animation: `rotate-slow ${speed}s linear infinite ${direction}`,
      animationDelay: `${randomDelay}s`,
    });
  }, [speed, reverse, baseDelay]);
  
  return style;
}

export function useFadeInAnimation(delay: number = 0, duration: number = 0.5) {
  return {
    opacity: 0,
    animation: `fade-in ${duration}s ease-out forwards`,
    animationDelay: `${delay}s`,
  };
}

export const staggeredFadeIn = (index: number, baseDelay: number = 0, interval: number = 0.1) => {
  const delay = baseDelay + index * interval;
  return {
    opacity: 0,
    transform: 'translateY(10px)',
    animation: 'fade-in 0.5s ease-out forwards',
    animationDelay: `${delay}s`,
  };
};
