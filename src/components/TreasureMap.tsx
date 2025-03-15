import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Fullscreen } from "lucide-react";
import { useParallaxEffect } from "@/utils/animations";
import ProjectAirdrop from "./ProjectAirdrop";
import ContactsSection from "./ContactsSection";
import InfoButton from "./InfoButton";
import InfoSheet from "./InfoSheet";
import ConnectedMapMarkers from "./ConnectedMapMarkers";
import {
  contactInfo,
  projectItems,
} from "@/data/portfolioData";

const TreasureMap = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeAirdrops, setActiveAirdrops] = useState<Array<{ id: string; project: typeof projectItems[0]; delay: number }>>([]);
  const [isInfoSheetOpen, setIsInfoSheetOpen] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxPosition = useParallaxEffect(40);
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start({
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" },
    });
  }, [controls]);
  
  useEffect(() => {
    if (activeAirdrops.length === 0) {
      addRandomAirdrop();
    }
    
    const interval = setInterval(() => {
      if (activeAirdrops.length < 3) {
        addRandomAirdrop();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeAirdrops.length]);
  
  const addRandomAirdrop = () => {
    const randomIndex = Math.floor(Math.random() * projectItems.length);
    const randomDelay = Math.random() * 2;
    const randomX = Math.random() * 80 + 10;
    
    const selectedProject = {
      ...projectItems[randomIndex],
      coordinates: { 
        ...projectItems[randomIndex].coordinates,
        x: randomX 
      }
    };
    
    const newAirdrop = {
      id: `airdrop-${Date.now()}-${Math.random()}`,
      project: selectedProject,
      delay: randomDelay
    };
    
    setActiveAirdrops(prev => [...prev, newAirdrop]);
  };

  const removeAirdrop = (id: string) => {
    setActiveAirdrops(prev => prev.filter(item => item.id !== id));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full overflow-hidden">
      <div className="map-container h-full">
        <motion.div
          ref={mapRef}
          className="treasure-map h-full"
          style={{
            transform: `perspective(1000px) rotateX(${
              parallaxPosition.y * 0.5
            }deg) rotateY(${parallaxPosition.x * 0.5}deg)`,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={controls}
        >
          <div className="absolute inset-0 bg-parchment">
            <div className="absolute inset-0 bg-[url('./lovable-uploads/Treasure_Map.jpg')] bg-cover bg-center opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-parchment-dark/20"></div>
          </div>

          <div className="map-border"></div>

          <ConnectedMapMarkers />

          <motion.div
            className="absolute bottom-10 left-10 z-10 w-24 h-24 bg-[url('/compass-rose.svg')] bg-contain bg-center bg-no-repeat opacity-60"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: "backOut" }}
          />

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

          <ContactsSection contactInfo={contactInfo} />
          
          <InfoButton onClick={() => setIsInfoSheetOpen(true)} />

          <motion.button
            onClick={toggleFullscreen}
            className="absolute top-5 right-5 md:top-5 md:right-5 z-20 bg-parchment-light border-2 border-treasure-brown rounded-full p-2 shadow-md hover:border-treasure-gold"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <Fullscreen className="text-treasure-red h-6 w-6" />
          </motion.button>

          <div className="relative z-10">
            {activeAirdrops.map((airdrop) => (
              <ProjectAirdrop
                key={airdrop.id}
                id={airdrop.id}
                title={airdrop.project.title}
                description={airdrop.project.description}
                technologies={airdrop.project.technologies}
                image={airdrop.project.image}
                link={airdrop.project.link}
                x={airdrop.project.coordinates.x}
                y={airdrop.project.coordinates.y}
                onComplete={() => removeAirdrop(airdrop.id)}
              />
            ))}
          </div>

          <motion.div
            className="absolute top-1/4 right-1/4 w-32 h-32 opacity-20 bg-contain bg-center bg-no-repeat pointer-events-none"
            style={{ backgroundImage: "url('/compass-rose.svg')" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          />
          
          <motion.div
            className="absolute bottom-1/3 left-1/5 w-24 h-24 opacity-15 bg-contain bg-center bg-no-repeat pointer-events-none"
            style={{ backgroundImage: "url('/ship.svg')" }}
            animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
      
      <InfoSheet 
        isOpen={isInfoSheetOpen} 
        onClose={() => setIsInfoSheetOpen(false)} 
      />
    </div>
  );
};

export default TreasureMap;
