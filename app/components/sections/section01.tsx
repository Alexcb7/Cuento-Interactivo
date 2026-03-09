"use client"
import StorySection from "@/app/components/shared/storysections"

export default function Section01() {
  return (
    <StorySection
      id="s01"
      title="La ratita pasea por el jardín…"
      frameTexts={[
        "La ratita presumida paseaba feliz por el mercado cuando, de repente, vio algo brillante en el suelo.",
        "Se agachó curiosa y descubrió una moneda de oro reluciente. ¡Qué suerte!",
        "«¿Qué podré comprar?», pensó ilusionada. ¿Un quesito? ¿Un lacito? ¡Tenía tantas ideas!",
      ]}
      images={[
        { src: "/images/rata1.png", alt: "Ratita paseando y encontrando una moneda" },
        { src: "/images/rata2.png", alt: "Ratita recogiendo la moneda" },
        { src: "/images/rata3.png", alt: "Ratita pensando qué comprar" },
      ]}
      sparkle={[
        { frameIndex: 0, top: "82%", left: "35%" },
        { frameIndex: 1, top: "82%", left: "35%" },
        { frameIndex: 2, top: "57%", left: "48%" },
      ]}
    />
  )
}