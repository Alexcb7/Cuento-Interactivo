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
  images: { src: string; alt: string }[] // exactamente 3 por ahora
  bg?: string
}

export default function StorySection({ id, title, subtitle, images, bg }: Props) {
  const rootRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const imgs = Array.from(root.querySelectorAll("[data-frame]")) as HTMLElement[]
      const titleEl = root.querySelector("[data-title]") as HTMLElement | null
      const subEl = root.querySelector("[data-subtitle]") as HTMLElement | null

      // Estado inicial
      imgs.forEach((el, i) => {
        gsap.set(el, {
          opacity: i === 0 ? 1 : 0,
          scale: i === 0 ? 1 : 1.03,
        })
      })

      if (titleEl) gsap.set(titleEl, { opacity: 0, y: 16 })
      if (subEl) gsap.set(subEl, { opacity: 0, y: 12 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=200%", // 2 pantallas extra => 3 “momentos”
          scrub: true,
          pin: true,
          anticipatePin: 1,
          // snap suave para que se sienta “por pasos”
          snap: {
            snapTo: [0, 0.5, 1],
            duration: { min: 0.12, max: 0.25 },
            delay: 0.02,
            ease: "power1.inOut",
          },
        },
      })

      // Texto entra al principio
      if (titleEl) tl.to(titleEl, { opacity: 1, y: 0, duration: 0.25 }, 0)
      if (subEl) tl.to(subEl, { opacity: 1, y: 0, duration: 0.25 }, 0.05)

      // Transición 1 -> 2
      tl.to(imgs[0], { opacity: 0, scale: 1.03, duration: 0.4 }, 0.33)
      tl.to(imgs[1], { opacity: 1, scale: 1, duration: 0.4 }, 0.33)

      // Transición 2 -> 3
      tl.to(imgs[1], { opacity: 0, scale: 1.03, duration: 0.4 }, 0.66)
      tl.to(imgs[2], { opacity: 1, scale: 1, duration: 0.4 }, 0.66)
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section id={id} className="relative h-[100vh] w-[100vw] overflow-hidden">
      <div
        ref={rootRef}
        className="relative h-full w-full"
        style={{ background: bg ?? "#0b1020" }}
      >
        {/* CAPA IMÁGENES */}
        <div className="absolute inset-0">
          {images.map((img, i) => (
            <div key={img.src} data-frame className="absolute inset-0">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={id === "s01"} // solo la primera prioritaria
                className="object-cover"
                sizes="100vw"
              />
              {/* leve overlay para legibilidad */}
              <div className="absolute inset-0 bg-black/20" />
            </div>
          ))}
        </div>

        {/* TEXTO / NARRADOR */}
        <div className="relative z-10 flex h-full w-full items-end p-6 md:p-10">
          <div className="max-w-[720px] rounded-2xl bg-white/80 p-4 backdrop-blur-md md:p-6">
            <h2 data-title className="text-xl font-bold md:text-3xl">
              {title}
            </h2>
            {subtitle ? (
              <p data-subtitle className="mt-2 text-sm md:text-lg">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
