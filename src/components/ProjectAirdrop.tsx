
import { useState, useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface ProjectAirdropProps {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  link?: string;
  x: number;
  y: number;
}

export const ProjectAirdrop = ({
  id,
  title,
  description,
  technologies,
  image,
  link,
  x,
  y
}: ProjectAirdropProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isDropping, setIsDropping] = useState(true);
  const [position, setPosition] = useState({ x, y: 0 });
  const [reachedBottom, setReachedBottom] = useState(false);
  const airdropRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);

  // Get reference to the map container
  useEffect(() => {
    mapRef.current = document.querySelector('.treasure-map');
  }, []);

  // Initial setup and drop animation
  useEffect(() => {
    // Set random initial x position
    const randomX = Math.random() * 80 + 10; // Random x between 10% and 90%
    setPosition({ x: randomX, y: 0 });
    setIsDropping(true);
    setReachedBottom(false);
  }, []);

  // Handle checking if airdrop reached bottom of screen
  useEffect(() => {
    if (!isDropping || !airdropRef.current || !mapRef.current || isHovered) return;

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
          
          // Reset after pop animation completes
          setTimeout(() => {
            // New random position for next drop
            const newX = Math.random() * 80 + 10;
            setPosition({ x: newX, y: 0 });
            setIsVisible(true);
            setIsDropping(true);
            setReachedBottom(false);
          }, 700);
        }, 1000);
      }
    };

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
  }, [isDropping, isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={airdropRef}
          className="airdrop absolute"
          style={{
            left: `${position.x}%`,
            top: `${isDropping && !isHovered ? (isHovered ? position.y : "auto") : position.y}%`,
            pointerEvents: "auto",
          }}
          initial={{ opacity: 0, top: "-10%" }}
          animate={
            isDropping && !isHovered
              ? { 
                  y: ["0vh", `${window.innerHeight}px`], 
                  opacity: 1, 
                  transition: { 
                    y: { duration: 7, ease: "linear" },
                    opacity: { duration: 0.5 }
                  } 
                } 
              : { 
                  opacity: 1,
                  y: isHovered ? "0" : "auto"
                }
          }
          exit={{ 
            scale: [1, 1.2, 0], 
            opacity: [1, 1, 0], 
            transition: { duration: 0.7, ease: "backOut" } 
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-110">
                {/* Parachute - Consistent size */}
                <div className="w-24 h-20 mb-1">
                  <img 
                    src="./lovable-uploads/Untitled design.svg" 
                    alt="Parachute treasure" 
                    className="w-full object-contain"
                    style={{ backgroundColor: 'transparent' }}
                  />
                </div>
              </div>
            </HoverCardTrigger>
            
            <HoverCardContent className="w-80 bg-parchment-light border-treasure-brown">
              <Card className="border-none shadow-none bg-transparent">
                {image && (
                  <div className="w-full h-40 rounded-md overflow-hidden mb-3">
                    <img 
                      src={image} 
                      alt={title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                )}
                
                <CardHeader className="p-0 space-y-1">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl text-navy-dark">{title}</CardTitle>
                    {link && (
                      <a 
                        href={link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-treasure-gold hover:text-treasure-red transition-colors"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="p-0 pt-2">
                  <CardDescription className="text-treasure-brown">{description}</CardDescription>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="text-xs px-2 py-1 bg-navy-light text-parchment-light rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </HoverCardContent>
          </HoverCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectAirdrop;
