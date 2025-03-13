import { useState, useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
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
  const [isDropping, setIsDropping] = useState(true);
  const [dropPosition, setDropPosition] = useState({ x, y });
  const initialized = useRef(false);

  // Initial drop animation - only runs once
  useEffect(() => {
    if (!initialized.current) {
      // Randomize the initial x position slightly
      const randomX = x + (Math.random() * 10 - 5);
      setDropPosition({ x: randomX, y });
      
      const timer = setTimeout(() => {
        setIsDropping(false);
      }, 2000 + Math.random() * 2000); // Random time between 2-4 seconds
      
      initialized.current = true;
      return () => clearTimeout(timer);
    }
  }, [x, y]);

  // Reset the drop periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance to trigger a new drop
        // Generate new random x position within the map bounds
        const newX = Math.random() * 80 + 10; // Between 10% and 90% of width
        setDropPosition({ x: newX, y });
        setIsDropping(true);
        
        setTimeout(() => {
          setIsDropping(false);
        }, 3000 + Math.random() * 2000);
      }
    }, 15000); // Check every 15 seconds
    
    return () => clearInterval(interval);
  }, [y]);

  return (
    <motion.div
      className="airdrop absolute"
      style={{
        left: `${dropPosition.x}%`,
        top: isDropping ? "-10%" : `${dropPosition.y}%`,
        pointerEvents: isDropping ? "none" : "auto",
      }}
      initial={{ opacity: 0 }}
      animate={
        isDropping 
          ? { y: [`-10vh`, `${dropPosition.y}vh`], opacity: 1, transition: { duration: 3, ease: "easeOut" } } 
          : { opacity: 1 }
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-110">
            {/* Parachute */}
            <div className="w-16 h-12 mb-1">
              <img 
                src="/Untitled design.svg" 
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
  );
};

export default ProjectAirdrop;