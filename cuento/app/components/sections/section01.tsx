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
      bg="#0b1020"
    />
  )
}
