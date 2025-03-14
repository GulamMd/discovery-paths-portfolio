
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, ScrollText } from "lucide-react";

interface InfoButtonProps {
  onClick: () => void;
}

const InfoButton = ({ onClick }: InfoButtonProps) => {
  return (
    <motion.div
      className="absolute top-28 right-5 z-30"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <motion.button
        onClick={onClick}
        className="relative bg-parchment-light border-2 border-treasure-brown rounded-full p-2 shadow-lg hover:shadow-xl hover:border-treasure-gold group transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="w-12 h-12 relative flex items-center justify-center">
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-treasure-red"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              rotate: { repeat: Infinity, duration: 12, ease: "linear" },
              scale: { repeat: Infinity, duration: 2, ease: "easeInOut" }
            }}
          >
            <ScrollText className="w-6 h-6" />
          </motion.div>
          
          <motion.div 
            className="absolute opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex space-x-1">
              <Briefcase className="w-4 h-4 text-treasure-gold" />
              <GraduationCap className="w-4 h-4 text-treasure-gold" />
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-parchment-light border border-treasure-brown px-3 py-1 rounded-md text-navy-dark font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 invisible group-hover:visible"
          initial={{ x: 10, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          Explore My Journey
          <div className="absolute top-1/2 -right-1.5 w-3 h-3 bg-parchment-light border-t border-r border-treasure-brown transform rotate-45 -translate-y-1/2"></div>
        </motion.div>
      </motion.button>
    </motion.div>
  );
};

export default InfoButton;
