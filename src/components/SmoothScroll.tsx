"use client";

import { ReactNode } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScroll({ children }: { children: any }) {
  return (
    // @ts-ignore - Bypass React 18/19 node type conflict
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) }}>
      {children}
    </ReactLenis>
  );
}
