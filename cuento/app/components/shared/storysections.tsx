"use client"

import React from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type Props = {
  id: string
  title: string
  subtitle?: string
  images: { src: string; alt: string }[]
  bg?: string
}

export default function StorySection({ id, title, subtitle, images, bg }: Props) {
  const sectionRef = React.useRef<HTMLElement | null>(null)

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
      const totalSlots = steps + 1 // +1 => HOLD final
      const snapPoints = Array.from({ length: totalSlots + 1 }, (_, i) => i / totalSlots)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + window.innerHeight * totalSlots,
          scrub: true,
          pin: sticky,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: (value) => gsap.utils.snap(snapPoints, value),
            duration: { min: 0.08, max: 0.18 },
            ease: "power1.inOut",
          },
        },
      })

      for (let i = 0; i < steps; i++) {
        const position = (i + 1) / totalSlots
        tl.to(frames[i], { opacity: 0, duration: 0.01 }, position)
        tl.to(frames[i + 1], { opacity: 1, duration: 0.01 }, position)
      }
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
          {images.map((img, i) => (
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
              </div>

              <div className="overlay" />
            </div>
          ))}
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
