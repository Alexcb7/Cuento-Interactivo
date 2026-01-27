"use client"
import StorySection from "@/app/components/shared/storysections"

export default function Section04() {
  return (
    <StorySection
      id="s04"
      title="Aparece el gallo enamorado"
      subtitle="Pero… la ratita no está convencida."
      images={[
        { src: "/images/s04/1.webp", alt: "Gallo aparece enamorado" },
        { src: "/images/s04/2.webp", alt: "Gallo y ratita conversan, ratita rechaza" },
        { src: "/images/s04/3.webp", alt: "Gallo se va triste" },
      ]}
      bg="#2a1a08"
    />
  )
}
