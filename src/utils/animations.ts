import { useEffect, useState, useRef } from 'react';

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

export function useParachuteAnimation(initialX: number, targetY: number) {
  const [isDropping, setIsDropping] = useState(true);
  const [position, setPosition] = useState({ x: initialX, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropCompleteRef = useRef(false);

  useEffect(() => {
    const randomX = initialX + (Math.random() * 20 - 10);
    setPosition({ x: randomX, y: 0 });
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsDropping(false);
      dropCompleteRef.current = true;
    }, 5000 + Math.random() * 3000);
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [initialX]);

  const resetDrop = () => {
    const newX = Math.random() * 80 + 10;
    setPosition({ x: newX, y: 0 });
    setIsDropping(true);
    dropCompleteRef.current = false;
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsDropping(false);
      dropCompleteRef.current = true;
    }, 5000 + Math.random() * 3000);
  };

  const completeDrop = () => {
    if (!isDropping && !dropCompleteRef.current) {
      dropCompleteRef.current = true;
    }
  };
  
  return { isDropping, position, resetDrop, completeDrop };
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
