"use client"
import StorySection from "@/app/components/shared/storysections"

export default function Section10() {
  return (
    <StorySection
      id="s10"
      title="Llaman a la puerta"
      subtitle="La ratita conoce al raton"
      images={[
        { src: "/images/rata25.png", alt: "Llaman a la puerta" },
        { src: "/images/rata26.png", alt: "Aparece el ratón" },
        { src: "/images/rata27.png", alt: "Rata se enamora de ratón" },
      ]}
    />
  )
}
