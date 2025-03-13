
import { useState } from 'react';
import { Mail, Github, Linkedin, Twitter, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggeredFadeIn } from '@/utils/animations';
import { ContactInfo } from '@/data/portfolioData';

interface ContactsSectionProps {
  contactInfo: ContactInfo;
}

export const ContactsSection = ({ contactInfo }: ContactsSectionProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="absolute top-5 right-5 md:top-10 md:right-10 z-20"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="p-4 bg-parchment-light border border-treasure-brown rounded-lg shadow-md">
          <div className="flex flex-col items-end">
            <h2 className="font-display text-2xl md:text-3xl text-treasure-red">{contactInfo.name}</h2>
            <p className="text-navy italic text-sm md:text-base -mt-1">{contactInfo.title}</p>
            
            <div className={`${isHovered ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden transition-all duration-500`}>
              <div className="flex flex-col gap-3">
                {contactInfo.email && (
                  <motion.a 
                    href={`mailto:${contactInfo.email}`} 
                    className="flex items-center gap-2 text-navy-dark hover:text-treasure-gold transition-colors" 
                    style={staggeredFadeIn(0, 0.1)}
                  >
                    <Mail size={16} /> <span>{contactInfo.email}</span>
                  </motion.a>
                )}
                
                {contactInfo.phone && (
                  <motion.a 
                    href={`tel:${contactInfo.phone}`} 
                    className="flex items-center gap-2 text-navy-dark hover:text-treasure-gold transition-colors"
                    style={staggeredFadeIn(1, 0.1)}
                  >
                    <Phone size={16} /> <span>{contactInfo.phone}</span>
                  </motion.a>
                )}
                
                {contactInfo.github && (
                  <motion.a 
                    href={contactInfo.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 text-navy-dark hover:text-treasure-gold transition-colors"
                    style={staggeredFadeIn(2, 0.1)}
                  >
                    <Github size={16} /> <span>GitHub</span>
                  </motion.a>
                )}
                
                {contactInfo.linkedin && (
                  <motion.a 
                    href={contactInfo.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 text-navy-dark hover:text-treasure-gold transition-colors"
                    style={staggeredFadeIn(3, 0.1)}
                  >
                    <Linkedin size={16} /> <span>LinkedIn</span>
                  </motion.a>
                )}
                
                {contactInfo.twitter && (
                  <motion.a 
                    href={contactInfo.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 text-navy-dark hover:text-treasure-gold transition-colors"
                    style={staggeredFadeIn(4, 0.1)}
                  >
                    <Twitter size={16} /> <span>Twitter</span>
                  </motion.a>
                )}
                
                {contactInfo.location && (
                  <motion.div 
                    className="flex items-center gap-2 text-navy-dark"
                    style={staggeredFadeIn(5, 0.1)}
                  >
                    <MapPin size={16} /> <span>{contactInfo.location}</span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {!isHovered && (
          <div className="absolute -bottom-6 right-0 font-marker text-xs text-navy-dark animate-pulse-subtle">
            Hover for contact info
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ContactsSection;
