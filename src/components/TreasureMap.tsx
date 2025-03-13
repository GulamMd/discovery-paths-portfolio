
import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useParallaxEffect } from '@/utils/animations';
import MapMarker from './MapMarker';
import ProjectAirdrop from './ProjectAirdrop';
import SkillBadge from './SkillBadge';
import ContactsSection from './ContactsSection';
import MapNavigation from './MapNavigation';
import {
  contactInfo,
  educationItems,
  achievementItems,
  projectItems,
  skillItems
} from '@/data/portfolioData';

const TreasureMap = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const parallaxPosition = useParallaxEffect(40);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: 'easeOut' },
    });
  }, [controls]);

  const handleMarkerSelect = (id: string) => {
    setActiveSection(id);
  };

  const handleNavigationSelect = (section: string) => {
    setActiveSection(section);
    
    // Scroll to the section
    const sections: { [key: string]: string } = {
      'education': educationItems[0].id,
      'achievements': achievementItems[0].id,
      'projects': projectItems[0].id,
      'skills': skillItems[0].id,
    };
    
    const targetId = sections[section] || section;
    
    const elements = document.querySelectorAll(`[data-id="${targetId}"]`);
    if (elements.length > 0) {
      elements[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const navigationItems = [
    { id: 'education', label: 'Education' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
  ];

  return (
    <div className="map-container">
      <motion.div 
        ref={mapRef}
        className="treasure-map"
        style={{
          transform: `perspective(1000px) rotateX(${parallaxPosition.y * 0.5}deg) rotateY(${parallaxPosition.x * 0.5}deg)`,
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={controls}
      >
        {/* Background maps and textures */}
        <div className="absolute inset-0 bg-parchment">
          <div className="absolute inset-0 bg-[url('/map-background.jpg')] bg-cover opacity-90"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-parchment-dark/20"></div>
        </div>
        
        {/* Map border effect */}
        <div className="map-border"></div>
        
        {/* Compass rose */}
        <div className="compass bottom-10 left-10 z-10"></div>
        
        {/* Title */}
        <motion.div 
          className="absolute top-5 left-5 md:top-10 md:left-10 z-20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-treasure-red">
            Treasure Portfolio
          </h1>
          <p className="font-serif text-lg md:text-xl text-navy-dark italic">
            A journey through my accomplishments and skills
          </p>
        </motion.div>
        
        {/* Contact info */}
        <ContactsSection contactInfo={contactInfo} />
        
        {/* Map markers for education */}
        <div className="relative z-10">
          {educationItems.map((item) => (
            <div data-id={item.id} key={item.id}>
              <MapMarker
                id={item.id}
                type="education"
                title={item.title}
                subtitle={`${item.institution} • ${item.period}`}
                description={item.description}
                x={item.coordinates.x}
                y={item.coordinates.y}
                onSelect={handleMarkerSelect}
                isActive={activeSection === item.id}
              />
            </div>
          ))}
        </div>
        
        {/* Map markers for achievements */}
        <div className="relative z-10">
          {achievementItems.map((item) => (
            <div data-id={item.id} key={item.id}>
              <MapMarker
                id={item.id}
                type="achievement"
                title={item.title}
                subtitle={item.date}
                description={item.description}
                x={item.coordinates.x}
                y={item.coordinates.y}
                onSelect={handleMarkerSelect}
                isActive={activeSection === item.id}
              />
            </div>
          ))}
        </div>
        
        {/* Project airdrops */}
        <div className="relative z-10">
          {projectItems.map((item) => (
            <div data-id={item.id} key={item.id}>
              <ProjectAirdrop
                id={item.id}
                title={item.title}
                description={item.description}
                technologies={item.technologies}
                image={item.image}
                link={item.link}
                x={item.coordinates.x}
                y={item.coordinates.y}
              />
            </div>
          ))}
        </div>
        
        {/* Skill badges */}
        <div className="relative z-10">
          {skillItems.map((item) => (
            <div data-id={item.id} key={item.id}>
              <SkillBadge
                id={item.id}
                name={item.name}
                icon={item.icon}
                level={item.level}
                x={item.coordinates.x}
                y={item.coordinates.y}
              />
            </div>
          ))}
        </div>
        
        {/* Navigation */}
        <MapNavigation
          items={navigationItems}
          onSelect={handleNavigationSelect}
          activeItem={activeSection || undefined}
        />
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 opacity-20 bg-contain bg-center bg-no-repeat pointer-events-none" style={{ backgroundImage: "url('/compass-rose.svg')" }}></div>
        <div className="absolute bottom-1/3 left-1/5 w-24 h-24 opacity-15 bg-contain bg-center bg-no-repeat pointer-events-none" style={{ backgroundImage: "url('/ship.svg')" }}></div>
      </motion.div>
    </div>
  );
};

export default TreasureMap;
