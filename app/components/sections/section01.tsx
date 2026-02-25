"use client"
import StorySection from "@/app/components/shared/storysections"

export default function Section01() {
  return (
    <StorySection
      id="s01"
      title="La ratita pasea por el jardín…"
      subtitle="¡Uy! Algo brilla en el suelo."
      images={[
        { src: "/images/rata1.png", alt: "Ratita paseando y encontrando una moneda" },
        { src: "/images/rata2.png", alt: "Ratita recogiendo la moneda" },
        { src: "/images/rata3.png", alt: "Ratita pensando qué comprar" },
      ]}
      sparkle={[
        { frameIndex: 0, top: "85%", left: "35%" },
        { frameIndex: 1, top: "85%", left: "35%" },
        { frameIndex: 2, top: "57%", left: "48%" },
      ]}
      fruit={[
        { frameIndex: 2, top: "60%", left: "20%", src: "/images/manzana.png" },
      ]}
    />
  )
}