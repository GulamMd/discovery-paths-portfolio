
import { useState } from 'react';
import { Package, ExternalLink } from 'lucide-react';
import { useIntersectionObserver, useRandomFloatAnimation } from '@/utils/animations';
import { motion } from 'framer-motion';

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
  const { ref, isIntersecting } = useIntersectionObserver();
  const floatStyle = useRandomFloatAnimation(id.charCodeAt(0) % 3, [4, 7]);

  return (
    <motion.div
      ref={ref}
      className="airdrop"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        ...floatStyle
      }}
      initial={{ y: -50, opacity: 0 }}
      animate={isIntersecting ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10 w-14 h-14 flex items-center justify-center bg-navy-light bg-opacity-90 rounded-lg shadow-lg transition-all">
        <Package className="text-parchment-light" size={28} />
        <div className="absolute h-8 w-[2px] -top-8 left-1/2 -translate-x-1/2 bg-navy-light bg-opacity-50"></div>
      </div>
      
      <div className="airdrop-content -translate-x-1/2 -translate-y-full mb-4 border border-navy-light">
        <div className="flex flex-col gap-3">
          {image && (
            <div className="w-full h-40 rounded-md overflow-hidden">
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
          
          <div>
            <div className="flex justify-between items-start">
              <h3 className="font-display text-xl text-navy-dark">{title}</h3>
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
            
            <p className="text-treasure-brown mt-2">{description}</p>
            
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
          </div>
        </div>
      </div>
      
      {isHovered && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-marker text-sm whitespace-nowrap text-navy-dark animate-fade-in">
          {title}
        </div>
      )}
    </motion.div>
  );
};

export default ProjectAirdrop;
