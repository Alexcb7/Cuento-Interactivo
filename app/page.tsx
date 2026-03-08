"use client"

import { useState, useEffect } from "react"
import Story from "@/app/components/story"
import IntroPage from "@/app/components/intro-page"
import ClosingPage from "@/app/components/closing-page"
import { initLenis, destroyLenis } from "@/app/components/shared/leni"
import AudioProvider, { useAudio } from "@/app/components/shared/audio-provider"

type PageState = "intro" | "story" | "closing"

export default function Page() {
  return (
    <AudioProvider>
      <PageInner />
    </AudioProvider>
  )
}

function PageInner() {
  const [pageState, setPageState] = useState<PageState>("intro")
  const { startMusic, stopMusic } = useAudio()

  // Inicializar / destruir Lenis según el estado
  useEffect(() => {
    if (pageState === "story") {
      window.scrollTo(0, 0)
      initLenis()
    } else {
      destroyLenis()
    }
  }, [pageState])

  // Bloquear barra espaciadora sólo durante el cuento
  useEffect(() => {
    if (pageState !== "story") return
    const blockSpace = (e: KeyboardEvent) => {
      if (e.code === "Space") e.preventDefault()
    }
    window.addEventListener("keydown", blockSpace)
    return () => window.removeEventListener("keydown", blockSpace)
  }, [pageState])

  const handleOpen = () => {
    // Arrancar la música aquí — dentro del evento de clic del usuario
    // para que el navegador permita el autoplay
    startMusic()
    setPageState("story")
  }

  const handleClose = () => {
    stopMusic()
    setPageState("closing")
  }

  const handleRestart = () => {
    window.scrollTo(0, 0)
    setPageState("intro")
  }

  return (
    <>
      {pageState === "intro" && <IntroPage onOpen={handleOpen} />}

      {pageState === "story" && (
        <Story onEnd={handleClose} />
      )}

      {pageState === "closing" && <ClosingPage onRestart={handleRestart} />}
    </>
  )
}
