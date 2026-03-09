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
import { useAudio } from "@/app/components/shared/audio-provider"

gsap.registerPlugin(ScrollTrigger)

interface StoryProps {
  onEnd?: () => void
}

function AudioToggle() {
  const { toggleMute, muted } = useAudio()

  return (
    <button
      className="audio-toggle-btn"
      onClick={toggleMute}
      aria-label={muted ? "Activar música" : "Silenciar música"}
    >
      {muted ? (
        /* Altavoz silenciado */
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        /* Altavoz activo */
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}
    </button>
  )
}

export default function Story({ onEnd }: StoryProps) {
  const [clouding, setClouding] = useState(false)

  const handleFinish = () => {
    if (clouding) return
    setClouding(true)
  }

  // Cuando las nubes empiezan, congelar scroll y pasar al closing al terminar
  useEffect(() => {
    if (!clouding || !onEnd) return
    stopLenis()
    ScrollTrigger.getAll().forEach((st) => st.disable())
    // 2s animación + 200ms delay nube derecha + 700ms pausa con pantalla cubierta
    const t = setTimeout(() => {
      window.scrollTo(0, 0)
      onEnd()
    }, 2900)
    return () => clearTimeout(t)
  }, [clouding, onEnd])

  return (
    <main>
      <AudioToggle />
      <Section01 />
      <Section02 />
      <Section03 />
      <Section04 />
      <Section05 />
      <Section06 />
      <Section07 />
      <Section08 />
      <Section09 />
      <Section10 onFinish={handleFinish} />
      <Pagination />

      {/* Transición de nubes al final — barrido de izquierda a derecha */}
      {clouding && (
        <>
          {/* Fija el fondo de la sección 10 mientras duran las nubes */}
          <div style={{ position: "fixed", inset: 0, zIndex: 99 }}>
            <Image src="/images/final28.png" alt="" fill unoptimized style={{ objectFit: "cover" }} />
          </div>

          <div className="cloud-transition cloud-transition--blocking">
            <div className="cloud cloud--left">
              <Image src="/images/nubes.png" alt="" fill unoptimized />
            </div>
            <div className="cloud cloud--right">
              <Image src="/images/nubes.png" alt="" fill unoptimized style={{ transform: "scaleX(-1)" }} />
            </div>
          </div>
        </>
      )}
    </main>
  )
}
