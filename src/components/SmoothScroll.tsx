"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SmoothScroll({ children }: { children: any }) {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) }}>
      {children}
    </ReactLenis>
  );
}
