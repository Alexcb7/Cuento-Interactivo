"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { stopLenis } from "@/app/components/shared/leni"
import Section01 from "@/app/components/sections/section01"
import Section02 from "@/app/components/sections/section02"
import Section03 from "@/app/components/sections/section03"
import Section04 from "@/app/components/sections/section04"
import Section05 from "@/app/components/sections/section05"
import Section06 from "@/app/components/sections/section06"
import Section07 from "@/app/components/sections/section07"
import Section08 from "@/app/components/sections/section08"
import Section09 from "@/app/components/sections/section09"
import Section10 from "@/app/components/sections/section_final"
import Pagination from "@/app/components/shared/pagination"

gsap.registerPlugin(ScrollTrigger)

interface StoryProps {
  onEnd?: () => void
}

export default function Story({ onEnd }: StoryProps) {
  const [clouding, setClouding] = useState(false)

  useEffect(() => {
    if (!onEnd) return

    let called = false

    // Espera a que los ScrollTriggers de las secciones estén inicializados
    const timer = setTimeout(() => {
      const st = ScrollTrigger.create({
        trigger: "#s10",
        start: "top top",
        end: () => "+=" + window.innerHeight * 2,
        onLeave: () => {
          if (called) return
          called = true
          setClouding(true)
        },
      })

      return () => st.kill()
    }, 400)

    return () => clearTimeout(timer)
  }, [onEnd])

  // Cuando las nubes empiezan, congelar scroll y pasar al closing al terminar
  useEffect(() => {
    if (!clouding || !onEnd) return
    // Congelar scroll para que el snap no arrastre la vista
    stopLenis()
    ScrollTrigger.getAll().forEach((st) => st.disable())
    // 2.2s animación principal + 500ms pantalla cubierta
    const t = setTimeout(() => {
      window.scrollTo(0, 0)
      onEnd()
    }, 2700)
    return () => clearTimeout(t)
  }, [clouding, onEnd])

  return (
    <main>
      <Section01 />
      <Section02 />
      <Section03 />
      <Section04 />
      <Section05 />
      <Section06 />
      <Section07 />
      <Section08 />
      <Section09 />
      <Section10 />
      <Pagination />

      {/* Transición de nubes al final — barrido de izquierda a derecha */}
      {clouding && (
        <div className="cloud-transition cloud-transition--blocking">
          <div className="cloud cloud--sweep-lead">
            <Image src="/images/nubes.png" alt="" fill unoptimized />
          </div>
          <div className="cloud cloud--sweep-follow">
            <Image src="/images/nubes.png" alt="" fill unoptimized style={{ transform: "scaleX(-1)" }} />
          </div>
        </div>
      )}
    </main>
  )
}
