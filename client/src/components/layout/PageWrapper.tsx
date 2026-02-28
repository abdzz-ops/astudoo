"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { useLocation } from "wouter"; // Changed from react-router-dom to wouter
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

interface PageWrapperProps {
  children: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  // Wouter's useLocation returns an array [location, setLocation]
  const [location] = useLocation(); 

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-black">
      {/* Decorative background glows */}
      <div 
        className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-white/5 blur-[120px] pointer-events-none z-0" 
        aria-hidden="true"
      />
      <div 
        className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-white/5 blur-[120px] pointer-events-none z-0" 
        aria-hidden="true"
      />

      <div className="relative z-50">
        <Navigation />
      </div>

      <AnimatePresence mode="wait">
        <motion.main 
          // We use the location string as the key to trigger the transition
          key={location} 
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ 
            duration: 0.5, 
            ease: [0.22, 1, 0.36, 1]
          }}
          className="flex-grow flex flex-col pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full z-10 relative"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}