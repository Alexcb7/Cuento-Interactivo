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
  images: { src: string; alt: string }[] // EXACTO 3
  bg?: string
}

export default function StorySection({ id, title, subtitle, images, bg }: Props) {
  const sectionRef = React.useRef<HTMLElement | null>(null)

  React.useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const frames = Array.from(section.querySelectorAll<HTMLElement>("[data-frame]"))

      if (frames.length !== 3) {
        console.warn(`[${id}] Esta sección debe tener 3 imágenes. Tiene:`, frames.length)
        return
      }

      // Estado inicial
      gsap.set(frames, { opacity: 0 })
      gsap.set(frames[0], { opacity: 1 })

      // Timeline a "pasos" controlado por scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200%", // 3 tramos: img1 -> img2 -> img3
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // markers: true,
        },
      })

      // Cambios SECO (sin crossfade). Si quieres fade: sube duration a 0.2/0.3
      tl.addLabel("f1", 0)
      tl.addLabel("f2", 1 / 4)
      tl.addLabel("f3", 2 / 4)

      tl.to(frames[0], { opacity: 0, duration: 0.01 }, "f2")
      tl.to(frames[1], { opacity: 1, duration: 0.01 }, "f2")

      tl.to(frames[1], { opacity: 0, duration: 0.05 }, "f3")
      tl.to(frames[2], { opacity: 1, duration: 0.05 }, "f3")
    }, section)

    // refresco por si Next/Image termina de calcular tamaños más tarde
    const t = setTimeout(() => ScrollTrigger.refresh(), 300)

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
            <div
              key={img.src}
              data-frame
              className="frame"
              style={{ opacity: i === 0 ? 1 : 0 }} // evita flash al recargar
            >
              <div className="img-wrap">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="100vw"
                  unoptimized
                  className="img"
                  priority={id === "s01" && i === 0}
                  loading={id === "s01" && i === 0 ? "eager" : "lazy"}
                />
              </div>

              {/* overlay opcional */}
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
