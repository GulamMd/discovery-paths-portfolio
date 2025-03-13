
import { useEffect } from 'react';
import TreasureMap from '@/components/TreasureMap';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const Index = () => {
  useEffect(() => {
    // Welcome toast
    const timer1 = setTimeout(() => {
      toast("Welcome to the Treasure Portfolio!", {
        description: "Explore my journey through this interactive map",
        position: "bottom-center",
        duration: 5000,
      });
    }, 1500);
    
    // Airdrop toast
    const timer2 = setTimeout(() => {
      toast("Watch for airdrops!", {
        description: "Treasure chests are falling randomly from the sky with my projects",
        position: "bottom-center",
        duration: 5000,
      });
    }, 4000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <motion.div 
      className="w-screen h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <TreasureMap />
    </motion.div>
  );
};

export default Index;
