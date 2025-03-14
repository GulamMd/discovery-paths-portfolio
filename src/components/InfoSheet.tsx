
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Briefcase, GraduationCap, Award, FileText, ExternalLink } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useParallaxEffect } from "@/utils/animations";
import { 
  workExperienceItems, 
  educationItems, 
  resumeUrl 
} from "@/data/portfolioData";

interface InfoSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoSheet = ({ isOpen, onClose }: InfoSheetProps) => {
  const [activeTab, setActiveTab] = useState("experience");
  const parallaxPosition = useParallaxEffect(20, true);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent 
        className="bg-parchment border-l-2 border-treasure-brown overflow-y-auto max-w-md sm:max-w-lg"
        onEscapeKeyDown={onClose}
      >
        <SheetHeader className="mb-6 relative">
          <div 
            className="absolute top-0 right-0 p-2 cursor-pointer hover:text-treasure-red transition-colors"
            onClick={onClose}
          >
            <X size={20} />
          </div>
          <SheetTitle className="font-display text-2xl text-treasure-red">
            My Treasure Scroll
          </SheetTitle>
          <SheetDescription className="font-serif text-treasure-brown italic">
            Discover the journey of my career and education
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3 bg-parchment-dark/20 border border-treasure-brown/30 mb-6">
            <TabsTrigger 
              value="experience" 
              className="font-medium flex items-center gap-2 data-[state=active]:bg-parchment-light data-[state=active]:text-treasure-red"
            >
              <Briefcase size={16} />
              <span className="hidden sm:inline">Experience</span>
            </TabsTrigger>
            <TabsTrigger 
              value="education" 
              className="font-medium flex items-center gap-2 data-[state=active]:bg-parchment-light data-[state=active]:text-treasure-red"
            >
              <GraduationCap size={16} />
              <span className="hidden sm:inline">Education</span>
            </TabsTrigger>
            <TabsTrigger 
              value="resume" 
              className="font-medium flex items-center gap-2 data-[state=active]:bg-parchment-light data-[state=active]:text-treasure-red"
            >
              <FileText size={16} />
              <span className="hidden sm:inline">Resume</span>
            </TabsTrigger>
          </TabsList>

          <motion.div
            className="relative"
            style={{
              transform: `perspective(1000px) rotateX(${
                parallaxPosition.y * 0.3
              }deg) rotateY(${parallaxPosition.x * 0.3}deg)`,
            }}
          >
            <TabsContent value="experience" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="font-display text-xl text-navy-dark mb-4">Work Experience</h3>
                <Accordion type="single" collapsible className="w-full">
                  {workExperienceItems.map((item, index) => (
                    <AccordionItem 
                      key={item.id} 
                      value={item.id}
                      className="border-treasure-brown/30 overflow-hidden"
                    >
                      <AccordionTrigger className="hover:text-treasure-red transition-colors py-3">
                        <div className="flex flex-col items-start text-left">
                          <span className="font-medium text-lg">{item.role}</span>
                          <span className="text-sm text-treasure-brown">{item.company} • {item.period}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-treasure-brown">
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="space-y-3"
                        >
                          <p>{item.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {item.technologies.map((tech, idx) => (
                              <span 
                                key={idx}
                                className="text-xs px-2 py-1 bg-navy-light text-parchment-light rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </TabsContent>

            <TabsContent value="education" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="font-display text-xl text-navy-dark mb-4">Education</h3>
                <Accordion type="single" collapsible className="w-full">
                  {educationItems.map((item, index) => (
                    <AccordionItem 
                      key={item.id} 
                      value={item.id}
                      className="border-treasure-brown/30 overflow-hidden"
                    >
                      <AccordionTrigger className="hover:text-treasure-red transition-colors py-3">
                        <div className="flex flex-col items-start text-left">
                          <span className="font-medium text-lg">{item.title}</span>
                          <span className="text-sm text-treasure-brown">{item.institution} • {item.period}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-treasure-brown">
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <p>{item.description}</p>
                        </motion.div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </TabsContent>

            <TabsContent value="resume" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center space-y-6"
              >
                <h3 className="font-display text-xl text-navy-dark mb-2">Resume</h3>
                
                <div className="p-6 border-2 border-dashed border-treasure-brown/50 rounded-lg bg-parchment-light/50">
                  <FileText size={64} className="mx-auto mb-4 text-treasure-gold" />
                  <p className="text-treasure-brown mb-4">View or download my complete resume to learn more about my skills, experience, and qualifications.</p>
                  
                  <motion.a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-navy-dark text-parchment-light rounded-md hover:bg-navy-light transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Resume <ExternalLink size={16} />
                  </motion.a>
                </div>
                
                <div className="p-4 bg-parchment-dark/20 rounded-md text-treasure-brown text-sm italic">
                  <p>You can also reach out directly via email or LinkedIn to request additional information about my experience and portfolio.</p>
                </div>
              </motion.div>
            </TabsContent>
          </motion.div>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default InfoSheet;
