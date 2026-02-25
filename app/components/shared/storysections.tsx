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

type Props = {
  id: string
  title: string
  subtitle?: string
  images: { src: string; alt: string }[]
  bg?: string
  sparkle?: SparklePoint[]
  fruit?: FruitPoint[]
}

export default function StorySection({ id, title, subtitle, images, bg, sparkle, fruit }: Props) {
  const sectionRef = React.useRef<HTMLElement | null>(null)
  const [activeSparkle, setActiveSparkle] = React.useState<number | null>(null)
  const [fallenFruits, setFallenFruits] = React.useState<number[]>([])

  const handleFruitClick = (frameIndex: number) => {
    if (!fallenFruits.includes(frameIndex)) {
      setFallenFruits((prev) => [...prev, frameIndex])
    } else {
      // segundo click resetea para poder repetir
      setFallenFruits((prev) => prev.filter((f) => f !== frameIndex))
      setTimeout(() => {
        setFallenFruits((prev) => [...prev, frameIndex])
      }, 50)
    }
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

      if (frames.length === 1) return

      const steps = frames.length - 1
      const totalSlots = steps + 1
      const snapPoints = Array.from({ length: totalSlots + 1 }, (_, i) => i / totalSlots)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + window.innerHeight * totalSlots,
          scrub: true,
          pin: sticky,
          pinSpacing: true,
          invalidateOnRefresh: true,
          snap: {
            snapTo: (value) => gsap.utils.snap(snapPoints, value),
            duration: { min: 0.2, max: 0.4 },
            ease: "power1.inOut",
          },
        },
      })

      for (let i = 0; i < steps; i++) {
        const position = i + 1
        tl.to(frames[i], { opacity: 0, duration: 0.01 }, position)
        tl.to(frames[i + 1], { opacity: 1, duration: 0.01 }, position)
      }
      tl.set({}, {}, totalSlots)
    }, section)

    const t = setTimeout(() => ScrollTrigger.refresh(), 250)

    return () => {
      clearTimeout(t)
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
                </div>

                <div className="overlay" />
              </div>
            )
          })}
        </div>

        <div className="story-text-wrap">
          <div className="story-card">
            <h2 className="story-title">{title}</h2>
            {subtitle ? <p className="story-subtitle">{subtitle}</p> : null}
          </div>
        </div>
      </div>
    </section>
  )
}