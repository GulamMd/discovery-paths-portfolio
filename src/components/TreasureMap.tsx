import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Fullscreen, Compass, Send, Map, Anchor, X } from "lucide-react";
import { useParallaxEffect } from "@/utils/animations";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ProjectAirdrop from "./ProjectAirdrop";
import InfoAirdrop from "./InfoAirdrop";
import ContactsSection from "./ContactsSection";
import InfoButton from "./InfoButton";
import InfoSheet from "./InfoSheet";
import {
  contactInfo,
  projectItems,
  educationItems,
  workExperienceItems,
  resumeUrl,
} from "@/data/portfolioData";
import { handleChat } from "@/utils/chatHandler"; // Import the utility function

const TreasureMap = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeAirdrops, setActiveAirdrops] = useState<
    Array<{ id: string; project: (typeof projectItems)[0]; delay: number }>
  >([]);
  const [activeInfoAirdrops, setActiveInfoAirdrops] = useState<
    Array<{
      id: string;
      type: "education" | "work" | "resume";
      title: string;
      subtitle: string;
      description: string;
      x: number;
      y: number;
      delay: number;
      onClick?: () => void;
    }>
  >([]);
  const [isInfoSheetOpen, setIsInfoSheetOpen] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxPosition = useParallaxEffect(40);
  const controls = useAnimation();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Ahoy there, matey! Welcome to the treasure hunt! I'm your guide to finding the hidden treasures on this portfolio. Ask me about skills, projects, or say 'start hunt' to begin your adventure!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      // Call the chat handler directly
      const response = await handleChat(newMessages);

      // Update the messages with the assistant's response
      setMessages([
        ...newMessages,
        { role: "assistant", content: response },
      ]);
    } catch (err: any) {
      console.error("Chat Error:", err);
      setError(`Arr! Something went wrong: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial animation
  useEffect(() => {
    controls.start({
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" },
    });
  }, [controls]);

  // Initialize airdrop system
  useEffect(() => {
    // Start with one airdrop
    if (activeAirdrops.length === 0) {
      addRandomAirdrop();
    }

    // Set up interval for continuous airdrops
    const interval = setInterval(() => {
      if (activeAirdrops.length < 3) {
        // Limit concurrent airdrops to 3
        addRandomAirdrop();
      }
    }, 5000); // Add new airdrop every 5 seconds if below limit

    return () => clearInterval(interval);
  }, [activeAirdrops.length]);

  // Initialize info airdrops system
  useEffect(() => {
    // Start with one education airdrop
    if (activeInfoAirdrops.length === 0) {
      addRandomInfoAirdrop();
    }

    // Set up interval for continuous info airdrops
    const interval = setInterval(() => {
      if (activeInfoAirdrops.length < 2) {
        // Limit concurrent info airdrops to 2
        addRandomInfoAirdrop();
      }
    }, 8000); // Add new info airdrop every 8 seconds if below limit

    return () => clearInterval(interval);
  }, [activeInfoAirdrops.length]);

  // Function to add a random airdrop
  const addRandomAirdrop = () => {
    const randomIndex = Math.floor(Math.random() * projectItems.length);
    const randomDelay = Math.random() * 2; // Random delay between 0-2 seconds
    const randomX = Math.random() * 80 + 10; // Random x position 10-90%

    const selectedProject = {
      ...projectItems[randomIndex],
      coordinates: {
        ...projectItems[randomIndex].coordinates,
        x: randomX,
      },
    };

    const newAirdrop = {
      id: `airdrop-${Date.now()}-${Math.random()}`,
      project: selectedProject,
      delay: randomDelay,
    };

    setActiveAirdrops((prev) => [...prev, newAirdrop]);
  };

  // Function to add a random info airdrop
  const addRandomInfoAirdrop = () => {
    const randomDelay = Math.random() * 2; // Random delay between 0-2 seconds
    const randomX = Math.random() * 80 + 10; // Random x position 10-90%

    // Determine type of info airdrop
    const types = ["education", "work", "resume"] as const;
    const randomTypeIndex = Math.floor(Math.random() * types.length);
    const type = types[randomTypeIndex];

    let title = "";
    let subtitle = "";
    let description = "";
    let onClick: (() => void) | undefined;

    // Set content based on type
    if (type === "education") {
      const randomEduIndex = Math.floor(Math.random() * educationItems.length);
      const item = educationItems[randomEduIndex];
      title = item.title;
      subtitle = `${item.institution} • ${item.period}`;
      description = item.description;
    } else if (type === "work") {
      const randomWorkIndex = Math.floor(
        Math.random() * workExperienceItems.length
      );
      const item = workExperienceItems[randomWorkIndex];
      title = item.role;
      subtitle = `${item.company} • ${item.period}`;
      description = item.description;
    } else if (type === "resume") {
      title = "My Resume";
      subtitle = "Click to view my full resume";
      description =
        "Comprehensive overview of my skills, experience, and qualifications.";
      onClick = () => window.open(resumeUrl, "_blank"); // Open resume in a new tab
    }

    const newInfoAirdrop = {
      id: `info-airdrop-${Date.now()}-${Math.random()}`,
      type,
      title,
      subtitle,
      description,
      x: randomX,
      y: 0,
      delay: randomDelay,
      onClick, // Pass the onClick handler
    };

    setActiveInfoAirdrops((prev) => [...prev, newInfoAirdrop]);
  };

  // Function to remove an airdrop
  const removeAirdrop = (id: string) => {
    setActiveAirdrops((prev) => prev.filter((item) => item.id !== id));
  };

  // Function to remove an info airdrop
  const removeInfoAirdrop = (id: string) => {
    setActiveInfoAirdrops((prev) => prev.filter((item) => item.id !== id));
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

  // Listen for fullscreen change events
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
          {/* Background maps and textures */}
          <div className="absolute inset-0 bg-parchment">
            <div className="absolute inset-0 bg-[url('./lovable-uploads/Treasure_Map.jpg')] bg-cover bg-center opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-parchment-dark/20"></div>
          </div>

          {/* Map border effect */}
          <div className="map-border"></div>

          {/* Compass rose */}
          <motion.div
            className="absolute bottom-10 left-10 z-10 w-24 h-24 bg-[url('/compass-rose.svg')] bg-contain bg-center bg-no-repeat opacity-60"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: "backOut" }}
          />

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

          {/* Info Button */}
          <InfoButton onClick={() => setIsInfoSheetOpen(true)} />

          {/* Fullscreen toggle */}
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

          {/* Active project airdrops */}
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

          {/* Active info airdrops */}
          <div className="relative z-10">
            {activeInfoAirdrops.map((airdrop) => (
              <InfoAirdrop
                key={airdrop.id}
                id={airdrop.id}
                type={airdrop.type}
                title={airdrop.title}
                subtitle={airdrop.subtitle}
                description={airdrop.description}
                x={airdrop.x}
                y={airdrop.y}
                delay={airdrop.delay}
                onClick={airdrop.onClick} // Pass the onClick handler
                onComplete={() => removeInfoAirdrop(airdrop.id)}
              />
            ))}
          </div>

          {/* Decorative elements */}
          <motion.div
            className="absolute top-1/4 right-1/4 w-32 h-32 opacity-20 bg-contain bg-center bg-no-repeat pointer-events-none"
            style={{ backgroundImage: "url('/compass-rose.svg')" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          />

          {/* Ship decoration */}
          <motion.div
            className="absolute bottom-1/3 left-1/5 w-24 h-24 opacity-15 bg-contain bg-center bg-no-repeat pointer-events-none"
            style={{ backgroundImage: "url('/ship.svg')" }}
            animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-lg hover:bg-amber-700 transition-all z-50"
        aria-label={
          isOpen ? "Close treasure hunt chat" : "Open treasure hunt chat"
        }
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <Compass size={24} className="animate-pulse" />
        )}
      </button>

      <div
        className={`fixed bottom-24 right-6 w-full max-w-md transition-all duration-300 ease-in-out z-40 ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <Card className="border-2 border-amber-600 bg-amber-50 shadow-xl overflow-hidden">
          <div className="bg-amber-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Map size={20} />
              <h2 className="font-bold">Treasure Hunt Guide</h2>
            </div>
            <Anchor size={20} />
          </div>

          <div
            ref={chatContainerRef}
            className="h-80 overflow-y-auto p-4 bg-amber-100"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 max-w-[80%] ${
                  message.role === "user" ? "ml-auto" : "mr-auto"
                }`}
              >
                <div
                  className={`p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-amber-600 text-white rounded-br-none"
                      : "bg-amber-200 text-amber-900 rounded-bl-none border border-amber-300"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {error && (
              <div className="mb-4 max-w-[80%] mr-auto">
                <div className="p-3 rounded-lg bg-red-100 text-red-800 rounded-bl-none border border-red-300">
                  {error}
                </div>
              </div>
            )}

            {isLoading && (
              <div className="mb-4 max-w-[80%] mr-auto">
                <div className="p-3 rounded-lg bg-amber-200 text-amber-900 rounded-bl-none border border-amber-300">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-amber-600 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-amber-600 animate-bounce delay-150" />
                    <div className="w-2 h-2 rounded-full bg-amber-600 animate-bounce delay-300" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-2 border-t border-amber-200 bg-amber-50"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 rounded border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
              />
              <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
                <Send size={18} />
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {/* Info Sheet */}
      <InfoSheet
        isOpen={isInfoSheetOpen}
        onClose={() => setIsInfoSheetOpen(false)}
      />
    </div>
  );
};

export default TreasureMap;
