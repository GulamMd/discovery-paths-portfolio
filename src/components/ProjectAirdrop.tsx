
import { useState, useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useParachuteAnimation } from '@/utils/animations';

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
  const { 
    isDropping, 
    position, 
    resetDrop, 
    completeDrop 
  } = useParachuteAnimation(x, y);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="airdrop absolute"
          style={{
            left: `${position.x}%`,
            top: isDropping ? "-10%" : `${position.y}%`,
            pointerEvents: isDropping ? "none" : "auto",
          }}
          initial={{ opacity: 0 }}
          animate={
            isDropping 
              ? { y: [`-10vh`, `${position.y + 5}vh`], opacity: 1, transition: { duration: 5, ease: "easeOut" } } 
              : { opacity: 1 }
          }
          exit={{ 
            scale: [1, 1.2, 0], 
            opacity: [1, 1, 0], 
            transition: { duration: 0.7, ease: "backOut" } 
          }}
          onAnimationComplete={() => {
            if (!isDropping && !isHovered) {
              // After drop is complete, trigger the pop animation after a delay
              setTimeout(() => {
                setIsVisible(false);
                // After pop animation, reset the drop with a delay
                setTimeout(() => {
                  setIsVisible(true);
                  resetDrop();
                }, 500);
              }, 1000);
            }
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            // When mouse leaves and drop is complete, start the disappear countdown
            if (!isDropping) {
              completeDrop();
            }
          }}
        >
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-110">
                {/* Parachute - INCREASED SIZE */}
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
