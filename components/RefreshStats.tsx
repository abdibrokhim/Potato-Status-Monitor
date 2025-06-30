"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function RefreshStats() {
  const [refreshCount, setRefreshCount] = useState(0);
  const [sessionStart] = useState(() => Date.now());

  useEffect(() => {
    const stored = localStorage.getItem("potato-refreshes");
    if (stored) {
      setRefreshCount(parseInt(stored, 10));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshCount(prev => {
        const next = prev + 1;
        localStorage.setItem("potato-refreshes", next.toString());
        return next;
      });
    }, 3000); // Match potato polling interval

    return () => clearInterval(interval);
  }, []);

  const sessionDuration = Math.floor((Date.now() - sessionStart) / 1000);
  const refreshRate = sessionDuration > 0 ? (refreshCount / sessionDuration * 60).toFixed(1) : "0";

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <RotateCcw className="w-5 h-5" />
          Dedication Level
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <motion.div 
            className="text-3xl font-bold text-primary"
            key={refreshCount}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {refreshCount.toLocaleString()}
          </motion.div>
          <p className="text-sm text-muted-foreground">
            Status checks this session
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span className="text-sm">
            {refreshRate} checks/min
          </span>
        </div>
        
        <Badge variant="secondary" className="w-fit">
          {refreshCount > 100 ? "🏆 Potato Master" : 
           refreshCount > 50 ? "🥉 Tuber Enthusiast" : 
           refreshCount > 20 ? "🥔 Casual Observer" : 
           "👋 Newcomer"}
        </Badge>
      </CardContent>
    </Card>
  );
}