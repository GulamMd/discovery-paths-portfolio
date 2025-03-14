
import { useState, useRef, useEffect } from 'react';
import { Mail, Github, Linkedin, Twitter, MapPin, Phone, User, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggeredFadeIn } from '@/utils/animations';
import { ContactInfo } from '@/data/portfolioData';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from '@/components/ui/hover-card';

interface ContactsSectionProps {
  contactInfo: ContactInfo;
}

export const ContactsSection = ({ contactInfo }: ContactsSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Add a floating animation effect
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  };

  return (
    <motion.div 
      className="absolute top-8 right-8 md:top-12 md:right-14 z-30"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.8 }}
    >
      <HoverCard open={isOpen} onOpenChange={setIsOpen}>
        <HoverCardTrigger asChild>
          <motion.div 
            className="relative cursor-pointer"
            animate={floatingAnimation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="p-3 bg-parchment-light/90 backdrop-blur-sm border-2 border-treasure-brown rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:border-treasure-gold">
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <h2 className="font-display text-2xl md:text-3xl text-treasure-red">{contactInfo.name}</h2>
                  <div className="flex items-center">
                    <Compass className="h-4 w-4 text-navy mr-1" />
                    <p className="text-navy italic text-sm md:text-base">{contactInfo.title}</p>
                  </div>
                </div>
                
                {/* Steampunk Avatar with decorative elements */}
                <div className="relative">
                  <motion.div 
                    className="absolute -top-2 -right-2 w-6 h-6 bg-treasure-gold rounded-full border-2 border-treasure-brown z-10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-full h-full bg-[url('/compass-rose.svg')] bg-cover bg-center"></div>
                  </motion.div>
                  
                  <Avatar className="h-16 w-16 border-2 border-treasure-gold shadow-md overflow-visible">
                    {contactInfo.avatar ? (
                      <AvatarImage 
                        src={contactInfo.avatar} 
                        alt={contactInfo.name}
                        className="object-cover"
                      />
                    ) : (
                      <AvatarFallback className="bg-navy text-parchment-light">
                        <User size={24} />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  
                  <motion.div 
                    className="absolute -bottom-1 -left-1 w-4 h-4 bg-treasure-red rounded-full border border-treasure-brown"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </div>
            </div>
            
            {!isOpen && (
              <motion.div 
                className="absolute -bottom-6 right-0 font-marker text-xs text-navy-dark"
                animate={{ opacity: [0.7, 1, 0.7], y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                Hover for contact info
              </motion.div>
            )}
          </motion.div>
        </HoverCardTrigger>
        
        <HoverCardContent 
          ref={contentRef}
          className="w-72 bg-parchment-light/95 backdrop-blur-sm border-2 border-treasure-brown p-4 rounded-lg shadow-xl"
          side="bottom"
          align="end"
        >
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-treasure-gold opacity-70"></div>
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-treasure-gold opacity-70"></div>
            
            <h3 className="font-display text-xl text-treasure-red mb-3 border-b border-treasure-brown/30 pb-2">
              Contact Details
            </h3>
            
            <div className="flex flex-col gap-3 pl-1">
              {contactInfo.email && (
                <motion.a 
                  href={`mailto:${contactInfo.email}`} 
                  className="flex items-center gap-2 text-navy-dark hover:text-treasure-gold transition-colors" 
                  custom={0}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ x: 3 }}
                >
                  <Mail size={16} className="text-treasure-red" /> 
                  <span className='break-words w-[210px]'>{contactInfo.email}</span>
                </motion.a>
              )}
              
              {contactInfo.phone && (
                <motion.a 
                  href={`tel:${contactInfo.phone}`} 
                  className="flex items-center gap-2 text-navy-dark hover:text-treasure-gold transition-colors"
                  custom={1}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ x: 3 }}
                >
                  <Phone size={16} className="text-treasure-red" /> 
                  <span>{contactInfo.phone}</span>
                </motion.a>
              )}
              
              {contactInfo.github && (
                <motion.a 
                  href={contactInfo.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-navy-dark hover:text-treasure-gold transition-colors"
                  custom={2}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ x: 3 }}
                >
                  <Github size={16} className="text-treasure-red" /> 
                  <span>GitHub</span>
                </motion.a>
              )}
              
              {contactInfo.linkedin && (
                <motion.a 
                  href={contactInfo.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-navy-dark hover:text-treasure-gold transition-colors"
                  custom={3}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ x: 3 }}
                >
                  <Linkedin size={16} className="text-treasure-red" /> 
                  <span>LinkedIn</span>
                </motion.a>
              )}
              
              {contactInfo.twitter && (
                <motion.a 
                  href={contactInfo.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-navy-dark hover:text-treasure-gold transition-colors"
                  custom={4}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ x: 3 }}
                >
                  <Twitter size={16} className="text-treasure-red" /> 
                  <span>Twitter</span>
                </motion.a>
              )}
              
              {contactInfo.location && (
                <motion.div 
                  className="flex items-center gap-2 text-navy-dark"
                  custom={5}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ x: 3 }}
                >
                  <MapPin size={16} className="text-treasure-red" /> 
                  <span>{contactInfo.location}</span>
                </motion.div>
              )}
            </div>
            
            {/* Decorative compass rose */}
            <motion.div 
              className="absolute -z-10 opacity-10 bottom-2 right-2 w-20 h-20 bg-[url('/compass-rose.svg')] bg-contain bg-no-repeat bg-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </HoverCardContent>
      </HoverCard>
    </motion.div>
  );
};

export default ContactsSection;
