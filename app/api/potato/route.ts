import { NextRequest, NextResponse } from "next/server";

/** Truly random potato presence (50% chance) */
export async function GET(_: NextRequest) {
  const online = Math.random() > 0.5;
  // Optionally sprinkle in fake uptime start
  const since = Date.now() - Math.floor(Math.random() * 3_600_000);
  const lastCheck = Date.now();
  
  return NextResponse.json({ 
    online, 
    since, 
    lastCheck 
  });
}