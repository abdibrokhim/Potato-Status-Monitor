"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { usePotato } from "@/lib/usePotato";
import { Timer, Wifi, WifiOff, Activity } from "lucide-react";

export default function PotatoStatusCard() {
  const { online, since, lastCheck, isLoading } = usePotato();

  const formatUptime = (timestamp?: number) => {
    if (!timestamp) return "—";
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <Card className="relative overflow-hidden border-2 bg-card/50 backdrop-blur-sm">
        <CardContent className="flex flex-col items-center gap-8 p-12">
          {/* Status Icon */}
          <motion.div
            animate={{ 
              rotate: isLoading ? 360 : 0,
              scale: isLoading ? 0.9 : 1 
            }}
            transition={{ 
              rotate: { repeat: isLoading ? Infinity : 0, duration: 1, ease: "linear" },
              scale: { duration: 0.2 }
            }}
            className="relative"
          >
            {isLoading ? (
              <Activity className="w-16 h-16 text-muted-foreground" />
            ) : online ? (
              <Wifi className="w-16 h-16 text-green-500" />
            ) : (
              <WifiOff className="w-16 h-16 text-red-500" />
            )}
          </motion.div>

          {/* Main Status */}
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-foreground">
              Is the Potato Online?
            </h1>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={online ? "yes" : "no"}
                initial={{ scale: 0.5, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.5, opacity: 0, y: -20 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 25,
                  duration: 0.6
                }}
                className="space-y-4"
              >
                <div className={`text-8xl font-black tracking-tight ${
                  online ? "text-green-500" : "text-red-500"
                }`}>
                  {online ? "YES" : "NO"}
                </div>
                
                <Badge 
                  variant={online ? "default" : "destructive"}
                  className="text-sm px-4 py-2"
                >
                  {online ? "🥔 ONLINE" : "🥔 OFFLINE"}
                </Badge>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Stats */}
          <div className="w-full space-y-3 text-center">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Timer className="w-4 h-4" />
              <span className="font-mono text-sm">
                Uptime: {formatUptime(since)}
              </span>
            </div>
            
            {lastCheck && (
              <div className="text-xs text-muted-foreground">
                Last checked: {new Date(lastCheck).toLocaleTimeString()}
              </div>
            )}
          </div>

          {/* Pulsing indicator */}
          <motion.div
            animate={{ 
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
            className={`w-3 h-3 rounded-full ${
              online ? "bg-green-500" : "bg-red-500"
            }`}
          />
        </CardContent>
      </Card>
    </div>
  );
}