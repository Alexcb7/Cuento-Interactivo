"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface ClosingPageProps {
  onRestart: () => void
}

export default function ClosingPage({ onRestart }: ClosingPageProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="closing-page">

      {/* Imagen de fondo */}
      <Image
        src="/images/ratadespedida.png"
        alt="La Ratita Presumida y el Ratón"
        fill
        className="closing-bg-img"
        priority
      />

      {/* Overlay degradado para legibilidad */}
      <div className="closing-overlay" aria-hidden="true" />

      {/* Contenido: header arriba + botón abajo */}
      <div className={`closing-content${visible ? " closing-content--visible" : ""}`}>

        {/* Tarjeta de título */}
        <div className="closing-header">
          <h1 className="closing-title">Fin del Cuento</h1>
        </div>

        {/* Botón */}
        <button className="closing-btn" onClick={onRestart} type="button">
          Leer otra vez
        </button>

      </div>
    </div>
  )
}
