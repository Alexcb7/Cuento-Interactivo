"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface IntroPageProps {
  onOpen: () => void
}

export default function IntroPage({ onOpen }: IntroPageProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="intro-page">

      {/* Imagen de fondo */}
      <Image
        src="/images/rataportada.png"
        alt="La Ratita Presumida"
        fill
        className="intro-bg-img"
        priority
      />

      {/* Overlay degradado para legibilidad */}
      <div className="intro-overlay" aria-hidden="true" />

      {/* Contenido: header arriba + botón abajo */}
      <div className={`intro-content${visible ? " intro-content--visible" : ""}`}>

        {/* Tarjeta de título */}
        <div className="intro-header">
          <h1 className="intro-title">La Ratita<br />Presumida</h1>
        </div>

        {/* Botón */}
        <button className="intro-btn" onClick={onOpen} type="button">
          Abrir el cuento
        </button>

      </div>
    </div>
  )
}
