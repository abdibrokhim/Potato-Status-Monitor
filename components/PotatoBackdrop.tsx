"use client";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function PotatoBackdrop() {
  const { theme } = useTheme();
  
  return (
    <>
      {/* Rotating potato backdrop */}
      <motion.div
        className="fixed inset-0 -z-10 flex items-center justify-center opacity-5 dark:opacity-10"
        animate={{ rotate: 360 }}
        transition={{ 
          repeat: Infinity, 
          duration: 180, 
          ease: "linear" 
        }}
      >
        <div className="text-[40rem] select-none pointer-events-none">
          🥔
        </div>
      </motion.div>
      
      {/* Floating potatoes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed text-6xl opacity-5 dark:opacity-10 select-none pointer-events-none"
          style={{
            left: `${10 + (i * 15)}%`,
            top: `${20 + (i * 10)}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4 + i,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        >
          🥔
        </motion.div>
      ))}
      
      {/* Background gradient */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-background via-background to-muted/20" />
    </>
  );
}