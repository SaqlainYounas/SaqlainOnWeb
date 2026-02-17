"use client";

import { useEffect, useState } from "react";

export default function IpClock() {
  const [time, setTime] = useState<string>("");
  const [timezone, setTimezone] = useState<string>("");

  useEffect(() => {
    let interval: NodeJS.Timeout;

    async function init() {
      try {
        const res = await fetch("https://worldtimeapi.org/api/ip");
        const data = await res.json();
        setTimezone(data.timezone?.replace(/_/g, " ") ?? "");

        const tz = data.timezone as string;
        const tick = () => {
          const now = new Date();
          setTime(
            now.toLocaleTimeString("en-US", {
              timeZone: tz,
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            })
          );
        };
        tick();
        interval = setInterval(tick, 1000);
      } catch {
        // fallback to local time
        const tick = () => {
          const now = new Date();
          setTime(
            now.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            })
          );
        };
        setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone?.replace(/_/g, " ") ?? "");
        tick();
        interval = setInterval(tick, 1000);
      }
    }

    init();
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return (
    <div className="mb-8 font-mono text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-3">
      <span className="tabular-nums">{time}</span>
      {timezone && (
        <>
          <span className="text-muted-foreground/40">—</span>
          <span>{timezone}</span>
        </>
      )}
    </div>
  );
}
