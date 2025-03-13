
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
}

interface MapNavigationProps {
  items: NavigationItem[];
  onSelect: (id: string) => void;
  activeItem?: string;
}

export const MapNavigation = ({
  items,
  onSelect,
  activeItem
}: MapNavigationProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div 
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="relative">
        <motion.div 
          className="p-2 md:p-3 bg-parchment-light border-2 border-treasure-brown rounded-full shadow-md cursor-pointer overflow-hidden"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="text-treasure-gold h-5 w-5" />
            <div className="font-display text-lg md:text-xl text-treasure-red">Navigate</div>
          </div>
        </motion.div>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-parchment-light border-2 border-treasure-brown rounded-lg shadow-lg p-3 min-w-[220px]"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-2">
                {items.map((item, index) => (
                  <motion.button
                    key={item.id}
                    className={`px-4 py-2.5 text-left rounded-md hover:bg-parchment transition-colors ${activeItem === item.id ? 'bg-parchment text-treasure-red font-medium' : 'text-navy-dark'}`}
                    onClick={() => {
                      onSelect(item.id);
                      setIsExpanded(false);
                    }}
                    whileHover={{ x: 5, backgroundColor: "#e8d6a6" }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
              
              <motion.div 
                className="absolute -bottom-2 left-1/2 w-4 h-4 bg-parchment-light border-b-2 border-r-2 border-treasure-brown -translate-x-1/2 rotate-45"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MapNavigation;
