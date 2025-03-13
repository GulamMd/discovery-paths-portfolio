
import { useEffect } from 'react';
import TreasureMap from '@/components/TreasureMap';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const Index = () => {
  useEffect(() => {
    // Welcome toast
    const timer = setTimeout(() => {
      toast("Welcome to the Treasure Portfolio!", {
        description: "Click on map markers to explore my journey",
        position: "bottom-center",
        duration: 5000,
      });
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      className="min-h-screen w-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <TreasureMap />
    </motion.div>
  );
};

export default Index;
