"use client"

import React from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type SparklePoint = {
  frameIndex: number
  top: string
  left: string
}

type FruitPoint = {
  frameIndex: number
  top: string
  left: string
  src: string
}

type SpeedLinesPoint = {
  frameIndex: number
  top: string
  left: string
}

type Props = {
  id: string
  title: string
  subtitle?: string
  images: { src: string; alt: string }[]
  bg?: string
  sparkle?: SparklePoint[]
  fruit?: FruitPoint[]
  speedLines?: SpeedLinesPoint[]
  children?: React.ReactNode
}

export default function StorySection({ id, title, subtitle, images, bg, sparkle, fruit, speedLines, children }: Props) {
  const sectionRef = React.useRef<HTMLElement | null>(null)
  const stRef = React.useRef<ScrollTrigger | null>(null)
  const snapRef = React.useRef<number[]>([])
  const [activeSparkle, setActiveSparkle] = React.useState<number | null>(null)
  const [fallenFruits, setFallenFruits] = React.useState<number[]>([])
  const [currentFrame, setCurrentFrame] = React.useState(0)
  const totalFrames = images.length

  const handleFruitClick = (frameIndex: number) => {
    if (!fallenFruits.includes(frameIndex)) {
      setFallenFruits((prev) => [...prev, frameIndex])
    } else {
      setFallenFruits((prev) => prev.filter((f) => f !== frameIndex))
      setTimeout(() => {
        setFallenFruits((prev) => [...prev, frameIndex])
      }, 50)
    }
  }

  const navigateFrame = (direction: "prev" | "next") => {
    const st = stRef.current
    const snaps = snapRef.current

    // Secciones con múltiples frames: navegar entre frames primero
    if (st && snaps.length > 0) {
      const idx = direction === "next"
        ? currentFrame + 1
        : currentFrame - 1

      // Si hay un frame siguiente/anterior dentro de esta sección, ir a él
      if (idx >= 0 && idx < snaps.length) {
        const scrollStart = st.start
        const scrollEnd = st.end
        const target = scrollStart + snaps[idx] * (scrollEnd - scrollStart)
        window.scrollTo({ top: target, behavior: "smooth" })
        return
      }
    }

    // Si no hay más frames, navegar a la sección adyacente
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".story-section"))
    const currentIdx = sections.findIndex((s) => s.id === id)
    if (currentIdx === -1) return

    const targetIdx = direction === "next" ? currentIdx + 1 : currentIdx - 1
    if (targetIdx < 0 || targetIdx >= sections.length) return

    const targetSection = sections[targetIdx]
    targetSection.scrollIntoView({ behavior: "smooth" })
  }

  React.useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const frames = Array.from(section.querySelectorAll<HTMLElement>("[data-frame]"))
      const sticky = section.querySelector<HTMLElement>(".story-sticky")

      if (!sticky) {
        console.warn(`[${id}] No encuentro .story-sticky dentro de la sección.`)
        return
      }

      if (frames.length === 0) {
        console.warn(`[${id}] No hay frames en esta sección.`)
        return
      }

      gsap.set(frames, { opacity: 0 })
      gsap.set(frames[0], { opacity: 1 })

      if (frames.length === 1) {
        // Pin single-frame sections so they stay visible during scroll
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => "+=" + window.innerHeight,
          pin: sticky,
          pinSpacing: true,
        })
        return
      }

      const steps = frames.length - 1
      const holdSlots = 1
      const fadeSlots = 0.5
      const totalSlots = steps * (holdSlots + fadeSlots) + holdSlots

      const snapPoints: number[] = []
      for (let i = 0; i <= steps; i++) {
        const holdStart = i * (holdSlots + fadeSlots)
        snapPoints.push(holdStart / totalSlots)
      }
      snapRef.current = snapPoints

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + window.innerHeight * totalSlots,
          scrub: 0.6,
          pin: sticky,
          pinSpacing: true,
          invalidateOnRefresh: true,
          snap: {
            snapTo: snapPoints,
            duration: { min: 0.3, max: 0.8 },
            delay: 0.15,
            ease: "power2.inOut",
          },
          onUpdate: (self) => {
            const progress = self.progress
            let closest = 0
            let minDist = Infinity
            for (let i = 0; i < snapPoints.length; i++) {
              const dist = Math.abs(progress - snapPoints[i])
              if (dist < minDist) { minDist = dist; closest = i }
            }
            setCurrentFrame(closest)
          },
        },
      })

      stRef.current = tl.scrollTrigger!

      for (let i = 0; i < steps; i++) {
        const fadeStart = holdSlots + i * (holdSlots + fadeSlots)
        tl.to(frames[i], { opacity: 0, duration: fadeSlots }, fadeStart)
        tl.to(frames[i + 1], { opacity: 1, duration: fadeSlots }, fadeStart)
      }
      tl.set({}, {}, totalSlots)
    }, section)

    const t = setTimeout(() => ScrollTrigger.refresh(), 250)

    return () => {
      clearTimeout(t)
      stRef.current = null
      ctx.revert()
    }
  }, [id, images])

  return (
    <section
      id={id}
      ref={sectionRef}
      className="story-section"
      style={{ background: bg ?? "#0b1020" }}
    >
      <div className="story-sticky">
        <div className="frames">
          {images.map((img, i) => {
            const sparklePoint = sparkle?.find((s) => s.frameIndex === i)
            const fruitPoint = fruit?.find((f) => f.frameIndex === i)
            const isFallen = fallenFruits.includes(i)

            return (
              <div key={img.src} data-frame className="frame" style={{ opacity: i === 0 ? 1 : 0 }}>
                <div className="img-wrap">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="100vw"
                    unoptimized
                    className="img-main"
                    priority={id === "s01" && i === 0}
                    loading={id === "s01" && i === 0 ? "eager" : "lazy"}
                  />

                  {sparklePoint && (
                    <div
                      className="coin-sparkle"
                      style={{ top: sparklePoint.top, left: sparklePoint.left }}
                      onMouseEnter={() => setActiveSparkle(i)}
                      onMouseLeave={() => setActiveSparkle(null)}
                    >
                      <span className={activeSparkle === i ? "active" : ""}></span>
                      <span className={activeSparkle === i ? "active" : ""}></span>
                      <span className={activeSparkle === i ? "active" : ""}></span>
                    </div>
                  )}

                  {fruitPoint && (
                    <div
                      className={`fruit-drop ${isFallen ? "fallen" : ""}`}
                      style={{ top: fruitPoint.top, left: fruitPoint.left }}
                      onClick={() => handleFruitClick(i)}
                    >
                      <Image
                        src={fruitPoint.src}
                        alt="fruta"
                        width={60}
                        height={60}
                        unoptimized
                      />
                    </div>
                  )}

                  {speedLines?.find((sl) => sl.frameIndex === i) && (() => {
                    const sl = speedLines.find((s) => s.frameIndex === i)!
                    return (
                      <div
                        className="speed-lines"
                        style={{ top: sl.top, left: sl.left }}
                      >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    )
                  })()}
                </div>

                <div className="overlay" />
              </div>
            )
          })}
        </div>

        {children}

        <div className="story-text-wrap">
          <div className="story-card">
            <h2 className="story-title">{title}</h2>
            {subtitle ? <p className="story-subtitle">{subtitle}</p> : null}
          </div>
        </div>

        {/* Flechas de navegación */}
        <div className="frame-nav">
          <button
            className="frame-nav-btn"
            onClick={() => navigateFrame("prev")}
            aria-label="Anterior"
          >
            ‹
          </button>
          <button
            className="frame-nav-btn"
            onClick={() => navigateFrame("next")}
            aria-label="Siguiente"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  )
}