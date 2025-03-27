import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Briefcase, GraduationCap, FileText } from 'lucide-react';

interface InfoAirdropProps {
  id: string;
  type: 'education' | 'work' | 'resume';
  title: string;
  subtitle: string;
  description: string;
  x: number;
  y: number;
  delay?: number;
  onComplete?: () => void;
  onClick?: () => void; // Add onClick prop
}

const InfoAirdrop = ({
  id,
  type,
  title,
  subtitle,
  description,
  x,
  y,
  delay = 0,
  onComplete,
  onClick, // Add onClick prop
}: InfoAirdropProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isDropping, setIsDropping] = useState(true);
  const [reachedBottom, setReachedBottom] = useState(false);
  const airdropRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);

  // Get reference to the map container
  useEffect(() => {
    mapRef.current = document.querySelector('.treasure-map');
  }, []);

  // Initial setup and drop animation
  useEffect(() => {
    // Set initial x position
    setIsDropping(true);
    setReachedBottom(false);
    
    // Add delay before dropping
    if (delay > 0) {
      const timer = setTimeout(() => {
        setIsDropping(true);
      }, delay * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [delay]);

  // Handle checking if airdrop reached bottom of screen
  useEffect(() => {
    if (!isDropping || !airdropRef.current || !mapRef.current) return;

    const checkPosition = () => {
      if (!airdropRef.current || !mapRef.current) return;
      
      const airdropRect = airdropRef.current.getBoundingClientRect();
      const mapRect = mapRef.current.getBoundingClientRect();
      
      // Check if bottom of airdrop reached bottom of map (with some margin)
      if (airdropRect.bottom >= mapRect.bottom - 20) {
        setReachedBottom(true);
        setIsDropping(false);
        
        // Pop and reset after a delay
        setTimeout(() => {
          setIsVisible(false);
          
          // Call onComplete callback to remove this airdrop
          if (onComplete) {
            onComplete();
          }
        }, 1000);
      }
    };

    // Only run animation if not hovered
    if (!isHovered) {
      // Check position every animation frame
      let animationFrame: number;
      const animate = () => {
        checkPosition();
        animationFrame = requestAnimationFrame(animate);
      };
      
      animationFrame = requestAnimationFrame(animate);
      
      return () => {
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [isDropping, isHovered, onComplete]);

  const getIcon = () => {
    switch (type) {
      case 'education':
        return <GraduationCap className="text-navy-dark" size={24} />;
      case 'work':
        return <Briefcase className="text-treasure-red" size={24} />;
      case 'resume':
        return <FileText className="text-treasure-gold" size={24} />;
      default:
        return <GraduationCap className="text-navy-dark" size={24} />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'education':
        return 'bg-parchment-light';
      case 'work':
        return 'bg-parchment-dark/30';
      case 'resume':
        return 'bg-treasure-gold/20';
      default:
        return 'bg-parchment-light';
    }
  };

  const getParachuteImageSrc = () => {
    switch (type) {
      case 'education':
        return './lovable-uploads/graduation_cap-ai.png';
      case 'work':
        return './lovable-uploads/work_experience_ai.png';
      case 'resume':
        return './lovable-uploads/resume-ai.png';
      default:
        return './lovable-uploads/Untitled design.svg';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={airdropRef}
          className="airdrop absolute"
          style={{
            left: `${x}%`,
            pointerEvents: "auto",
          }}
          initial={{ opacity: 0, top: "-10%" }}
          animate={
            isDropping && !isHovered
              ? { 
                  y: ["0vh", `${window.innerHeight}px`], 
                  opacity: 1, 
                  transition: { 
                    y: { duration: 8, ease: "linear" },
                    opacity: { duration: 0.5 },
                    delay: delay,
                  } 
                } 
              : { 
                  opacity: 1,
                  y: isHovered ? "auto" : "auto" // Don't move when hovered
                }
          }
          exit={{ 
            scale: [1, 1.2, 0], 
            opacity: [1, 1, 0], 
            transition: { duration: 0.7, ease: "backOut" } 
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={type === 'resume' ? onClick : undefined} // Handle click for resume
        >
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-110">
                {/* Parachute */}
                <div className="w-16 h-16 mb-1 drop-shadow-lg">
                  <img 
                    src={getParachuteImageSrc()} 
                    alt="Parachute" 
                    className="w-full h-full object-contain"
                    style={{ backgroundColor: 'transparent' }}
                  />
                </div>
                
                {/* Icon container */}
                
              </div>
            </HoverCardTrigger>
            
            <HoverCardContent className="w-80 bg-parchment-light border-treasure-brown">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {getIcon()}
                  <h3 className="font-display text-xl text-navy-dark">{title}</h3>
                </div>
                <p className="text-sm font-medium text-treasure-brown">{subtitle}</p>
                <p className="text-treasure-brown text-sm">{description}</p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoAirdrop;
