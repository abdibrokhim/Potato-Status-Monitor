"use client";
import useSWR from "swr";
import { PotatoStatus } from "@/lib/types";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function usePotato(poll = 3000) {
  const { data, error, isLoading } = useSWR<PotatoStatus>("/api/potato", fetcher, {
    refreshInterval: poll,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });
  
  return { 
    online: data?.online ?? false, 
    since: data?.since, 
    lastCheck: data?.lastCheck,
    error,
    isLoading
  };
}