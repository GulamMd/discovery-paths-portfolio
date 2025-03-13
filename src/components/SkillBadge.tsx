
import { useIntersectionObserver, useRotateAnimation } from '@/utils/animations';
import { motion } from 'framer-motion';

interface SkillBadgeProps {
  id: string;
  name: string;
  icon: string;
  level: number; // 1-5
  x: number;
  y: number;
}

export const SkillBadge = ({
  id,
  name,
  icon,
  level,
  x,
  y
}: SkillBadgeProps) => {
  const { ref, isIntersecting } = useIntersectionObserver();
  const rotateStyle = useRotateAnimation(20, true, id.charCodeAt(0) % 4);
  
  const getSkillIcon = () => {
    // Replace with actual icons for your tech stack
    switch (icon.toLowerCase()) {
      case 'react':
        return '/icons/react.svg';
      case 'typescript':
        return '/icons/typescript.svg';
      case 'javascript':
        return '/icons/javascript.svg';
      case 'html':
        return '/icons/html.svg';
      case 'css':
        return '/icons/css.svg';
      case 'tailwind':
        return '/icons/tailwind.svg';
      default:
        return '/icons/code.svg';
    }
  };
  
  // Generate stars based on skill level
  const stars = Array(5).fill(0).map((_, i) => (
    <span key={i} className={`text-xs ${i < level ? 'text-treasure-gold' : 'text-muted-foreground'}`}>★</span>
  ));

  return (
    <motion.div
      ref={ref}
      className="skill-badge"
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={isIntersecting ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      whileHover={{ scale: 1.1 }}
    >
      <div className="relative">
        <div 
          className="w-14 h-14 rounded-full bg-parchment border-2 border-treasure-gold flex items-center justify-center overflow-hidden group"
          style={rotateStyle}
        >
          <div className="relative z-10 w-8 h-8">
            <img src={getSkillIcon()} alt={name} className="w-full h-full object-contain" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-treasure-gold/10 to-parchment/30"></div>
        </div>
        
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap flex flex-col items-center">
          <span className="font-marker text-xs text-navy-dark">{name}</span>
          <div className="flex">{stars}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillBadge;
