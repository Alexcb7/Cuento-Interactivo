"use client"
import StorySection from "@/app/components/shared/storysections"

export default function Section04() {
  return (
    <StorySection
      id="s04"
      title="Aparece el gallo enamorado"
      subtitle="Pero… la ratita no está convencida."
      images={[
        { src: "/images/rata10.png", alt: "Gallo aparece enamorado" },
        { src: "/images/rata11.png", alt: "Gallo y ratita conversan, ratita rechaza" },
        { src: "/images/rata12.png", alt: "Gallo se va triste" },
      ]}
    />
  )
}
