"use client"

import { useState, useEffect } from "react"
import Story from "@/app/components/story"
import IntroPage from "@/app/components/intro-page"
import ClosingPage from "@/app/components/closing-page"
import { initLenis, destroyLenis } from "@/app/components/shared/leni"

type PageState = "intro" | "story" | "closing"

export default function Page() {
  const [pageState, setPageState] = useState<PageState>("intro")

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
    setPageState("story")
  }

  const handleClose = () => {
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
