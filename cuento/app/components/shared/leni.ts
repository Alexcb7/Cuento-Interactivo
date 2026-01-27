"use client"

import Lenis from "@studio-freight/lenis"
import gsap from "gsap"

let lenis: Lenis | null = null

export function initLenis() {
  if (lenis) return lenis

  lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
    touchMultiplier: 1.2,
  })


  gsap.ticker.add((time) => {
    
    lenis?.raf(time * 1000)
  })


  gsap.ticker.lagSmoothing(0)

  return lenis
}

export function destroyLenis() {
  if (!lenis) return
  lenis.destroy()
  lenis = null
}
