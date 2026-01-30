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
  images: { src: string; alt: string }[] // 3 por sección
  bg?: string
}

export default function StorySection({ id, title, subtitle, images, bg }: Props) {
  const sectionRef = React.useRef<HTMLElement | null>(null)

  React.useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const frames = Array.from(section.querySelectorAll<HTMLElement>("[data-frame]"))
      const titleEl = section.querySelector<HTMLElement>("[data-title]")
      const subEl = section.querySelector<HTMLElement>("[data-subtitle]")

      if (frames.length < 3) return

      // 🔒 Estado inicial inmediato (evita flashes)
      frames.forEach((el, i) => gsap.set(el, { opacity: i === 0 ? 1 : 0 }))
      if (titleEl) gsap.set(titleEl, { opacity: 1, y: 0 })
      if (subEl) gsap.set(subEl, { opacity: 1, y: 0 })

      let current = 0
      const show = (index: number) => {
        if (index === current) return
        gsap.to(frames[current], { opacity: 0, duration: 0.2, overwrite: true })
        gsap.to(frames[index], { opacity: 1, duration: 0.2, overwrite: true })
        current = index
      }

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress
          const idx = p < 1 / 3 ? 0 : p < 2 / 3 ? 1 : 2
          show(idx)
        },
      })

    }, section)

    const t = setTimeout(() => ScrollTrigger.refresh(), 150)

    return () => {
      clearTimeout(t)
      ctx.revert()
    }
  }, [images])

  // ✅ altura: 3 imágenes => 300vh (scroll natural dentro de sección)
  const sectionHeightVh = Math.max(1, images.length) * 100

  return (
    <section
      id={id}
      ref={sectionRef}
      className="story-section"
      style={{ height: `${sectionHeightVh}vh`, background: bg ?? "#0b1020" }}
    >
      {/* ✅ sticky: mantiene la “pantalla” fija mientras haces scroll natural */}
      <div className="story-sticky">
        <div className="frames">
          {images.map((img, i) => (
            <div
              key={img.src}
              className="frame"
              data-frame
              // 🔒 evita flash sin depender de GSAP
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <div className="img-wrap">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="100vw"
                  className="img"
                  unoptimized
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
            <h2 data-title className="story-title">{title}</h2>
            {subtitle ? <p data-subtitle className="story-subtitle">{subtitle}</p> : null}
          </div>
        </div>
      </div>
    </section>
  )
}
