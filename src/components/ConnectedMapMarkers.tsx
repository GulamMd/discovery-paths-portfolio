
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Briefcase, 
  FileText 
} from 'lucide-react';
import { 
  educationItems, 
  workExperienceItems, 
  resumeUrl 
} from '@/data/portfolioData';

const ConnectedMapMarkers = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay the appearance of the journey for better UX
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Calculate positions for the journey thread
  const educationPoints = educationItems.map(item => ({
    id: item.id,
    x: item.coordinates.x,
    y: item.coordinates.y,
    type: 'education',
    title: item.title,
    subtitle: item.institution,
    period: item.period,
  }));

  const workPoints = workExperienceItems.map(item => ({
    id: item.id,
    x: item.coordinates.x,
    y: item.coordinates.y,
    type: 'work',
    title: item.role,
    subtitle: item.company,
    period: item.period,
  }));
  
  // Add a resume point at the end of the journey
  const resumePoint = {
    id: 'resume',
    x: 90, // Positioned at the end of the journey
    y: 25,
    type: 'resume',
    title: 'Resume',
    subtitle: 'Download CV',
    period: '',
  };
  
  // Combine all points in the journey
  const allPoints = [...educationPoints, ...workPoints, resumePoint];
  
  // Create an array of connector points for the thread
  const connectorPoints = allPoints.map(point => `${point.x}% ${point.y}%`).join(', ');

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* The connecting thread line */}
      {isVisible && (
        <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-visible">
          <motion.polyline
            points={connectorPoints}
            fill="none"
            stroke="#8B4513" // Brown thread color
            strokeWidth="2"
            strokeDasharray="5,5" // Dashed line
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
          />
        </svg>
      )}
      
      {/* The marker points */}
      {isVisible && allPoints.map((point, index) => (
        <motion.div
          key={point.id}
          className="absolute pointer-events-auto"
          style={{ 
            left: `${point.x}%`, 
            top: `${point.y}%`, 
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 + (index * 0.2), duration: 0.5 }}
        >
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.1 }}
          >
            {/* Icon marker */}
            <div className="w-12 h-12 bg-parchment-light border-2 border-treasure-brown rounded-full flex items-center justify-center shadow-md hover:border-treasure-gold transition-all">
              {point.type === 'education' && <GraduationCap className="text-treasure-red w-5 h-5" />}
              {point.type === 'work' && <Briefcase className="text-treasure-gold w-5 h-5" />}
              {point.type === 'resume' && <FileText className="text-navy-dark w-5 h-5" />}
            </div>
            
            {/* Marker labels that appear on hover */}
            <div className="absolute overflow-hidden pointer-events-none opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap -translate-x-1/2 -translate-y-full left-1/2 top-0 mb-2">
              <div className="bg-parchment-light border border-treasure-brown px-3 py-2 rounded shadow-md">
                <p className="font-medium text-sm text-navy-dark">{point.title}</p>
                <p className="text-xs text-treasure-brown">{point.subtitle} {point.period && `• ${point.period}`}</p>
              </div>
            </div>
            
            {/* Resume download link */}
            {point.type === 'resume' && (
              <a 
                href={resumeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 rounded-full"
                onClick={(e) => e.stopPropagation()}
                aria-label="Download Resume"
              />
            )}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default ConnectedMapMarkers;
