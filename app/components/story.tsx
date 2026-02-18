"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
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
  useEffect(() => {
    if (!onEnd) return

    let called = false

    // Espera a que los ScrollTriggers de las secciones estén inicializados
    const timer = setTimeout(() => {
      const st = ScrollTrigger.create({
        trigger: "#s10",
        start: "top center",
        onEnter: () => {
          if (called) return
          called = true
          // Pausa para que el usuario vea la última imagen antes del cierre
          setTimeout(onEnd, 1500)
        },
      })

      return () => st.kill()
    }, 400)

    return () => clearTimeout(timer)
  }, [onEnd])

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
    </main>
  )
}
