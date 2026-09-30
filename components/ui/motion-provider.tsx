"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { Pause, Play } from "lucide-react";

const MotionContext = createContext({
  motionAllowed: false,
  paused: false,
  toggleMotion: () => {},
});

function subscribeToMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useSyncExternalStore(
    subscribeToMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );
  const [paused, setPaused] = useState(false);
  const motionAllowed = !reducedMotion && !paused;

  useEffect(() => {
    document.documentElement.dataset.motion = motionAllowed ? "on" : "off";
    return () => {
      delete document.documentElement.dataset.motion;
    };
  }, [motionAllowed]);

  return (
    <MotionContext.Provider
      value={{
        motionAllowed,
        paused,
        toggleMotion: () => setPaused((value) => !value),
      }}
    >
      {children}
    </MotionContext.Provider>
  );
}

export const useMotionPreference = () => useContext(MotionContext);

export function MotionToggle() {
  const { paused, toggleMotion } = useMotionPreference();
  return (
    <button
      type="button"
      className="motion-toggle"
      onClick={toggleMotion}
      aria-pressed={paused}
      aria-label="Pause decorative animations"
    >
      {paused ? (
        <Play size={13} aria-hidden="true" />
      ) : (
        <Pause size={13} aria-hidden="true" />
      )}
      <span>{paused ? "Motion paused" : "Pause motion"}</span>
    </button>
  );
}
