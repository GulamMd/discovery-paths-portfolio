
import { useState } from 'react';
import { Anchor, Bookmark, Award, GraduationCap } from 'lucide-react';
import { useIntersectionObserver, useRotateAnimation } from '@/utils/animations';
import { motion } from 'framer-motion';

interface MapMarkerProps {
  id: string;
  type: 'education' | 'achievement' | 'generic';
  title: string;
  subtitle: string;
  description: string;
  x: number;
  y: number;
  onSelect?: (id: string) => void;
  isActive?: boolean;
}

export const MapMarker = ({
  id,
  type,
  title,
  subtitle,
  description,
  x,
  y,
  onSelect,
  isActive = false
}: MapMarkerProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver();
  const rotateStyle = useRotateAnimation(15, false, id.charCodeAt(0) % 5);
  
  const handleClick = () => {
    if (onSelect) {
      onSelect(id);
    }
  };

  const getMarkerIcon = () => {
    switch (type) {
      case 'education':
        return <GraduationCap className="text-treasure-red" />;
      case 'achievement':
        return <Award className="text-treasure-gold" />;
      default:
        return <Bookmark className="text-navy" />;
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`map-marker ${isActive ? 'active' : ''}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={isIntersecting ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div 
        className="marker-pin relative z-10 w-12 h-12 flex items-center justify-center bg-parchment-light rounded-full border-2 border-treasure-brown shadow-md transition-all"
        style={rotateStyle}
      >
        {getMarkerIcon()}
      </div>
      
      <div className={`marker-content -translate-x-1/2 -translate-y-full mb-4 border border-treasure-brown ${isActive ? 'active' : ''}`}>
        <h3 className="font-display text-xl text-treasure-red mb-1">{title}</h3>
        <p className="text-sm font-medium text-navy-dark mb-2">{subtitle}</p>
        <p className="text-treasure-brown">{description}</p>
      </div>
      
      {(isHovered || isActive) && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-marker text-sm whitespace-nowrap text-navy-dark animate-fade-in">
          {title}
        </div>
      )}
    </motion.div>
  );
};

export default MapMarker;
