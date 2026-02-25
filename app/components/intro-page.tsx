"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface IntroPageProps {
  onOpen: () => void
}

export default function IntroPage({ onOpen }: IntroPageProps) {
  const [visible, setVisible] = useState(false)
  const [clouding, setClouding] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  const handleOpen = () => {
    setClouding(true)
    // 2000ms animación + 200ms delay nube derecha + 700ms pausa con pantalla cubierta
    setTimeout(() => {
      onOpen()
    }, 2900)
  }

  return (
    <div className="intro-page">

      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Image
          src="/images/rataportada.png"
          alt="La Ratita Presumida"
          fill
          className="intro-bg-img"
          priority
        />

        {/* Humo chimenea */}
        <div className="smoke smoke--chimney">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Overlay degradado */}
      <div className="intro-overlay" aria-hidden="true" />

      {/* Contenido */}
      <div className={`intro-content${visible ? " intro-content--visible" : ""}`}>
        <div className="intro-header">
          <h1 className="intro-title">La Ratita<br />Presumida</h1>
        </div>
        <button className="intro-btn" onClick={handleOpen} type="button">
          Abrir el cuento
        </button>
      </div>

      {/* Nubes de transición */}
      {clouding && (
        <div className="cloud-transition">
          <div className="cloud cloud--left">
            <Image src="/images/nubes.png" alt="" fill unoptimized />
          </div>
          <div className="cloud cloud--right">
            <Image src="/images/nubes.png" alt="" fill unoptimized style={{ transform: "scaleX(-1)" }} />
          </div>
        </div>
      )}

    </div>
  )
}