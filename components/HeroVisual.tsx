"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { YantraLines } from "./YantraLines";

const Yantra3D = dynamic(() => import("./Yantra3D"), { ssr: false });

type Nav = Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };

/** True only where real-time WebGL will be smooth: hardware GPU, no data-saver, no reduced motion. */
function canRender3D() {
  if (typeof window !== "undefined" && window.innerWidth < 768) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const n = navigator as Nav;
  if (n.connection?.saveData || (n.deviceMemory && n.deviceMemory < 4)) return false;
  try {
    const gl = document.createElement("canvas").getContext("webgl2");
    if (!gl) return false;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    // Software rasterisers (no GPU) would block the main thread for every frame.
    return !/swiftshader|llvmpipe|software|basic render/i.test(renderer);
  } catch { return false; }
}

/**
 * The static line yantra paints immediately. The WebGL yantra is downloaded and started only
 * after the visitor first interacts, so it never competes with page load, and only on capable devices.
 */
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"static" | "3d">("static");
  const [visible, setVisible] = useState(true);
  const [particles, setParticles] = useState(600);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" });
    if (ref.current) io.observe(ref.current);
    if (!canRender3D()) return () => io.disconnect();
    setParticles(window.innerWidth < 768 ? 220 : 600);
    const events = ["pointermove", "pointerdown", "touchstart", "keydown", "wheel", "scroll"] as const;
    const start = () => { setMode("3d"); events.forEach((e) => window.removeEventListener(e, start)); };
    events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));
    return () => { io.disconnect(); events.forEach((e) => window.removeEventListener(e, start)); };
  }, []);

  return (
    <div ref={ref} className="relative aspect-square w-full" aria-hidden>
      <YantraLines className={`absolute inset-0 h-full w-full text-gold/60 transition-opacity duration-1000 ${mode === "3d" ? "opacity-0" : "opacity-100"}`} />
      {mode === "3d" && visible && <div className="absolute inset-0 animate-[fadein_1.2s_ease-out]"><Yantra3D particles={particles} /></div>}
    </div>
  );
}
