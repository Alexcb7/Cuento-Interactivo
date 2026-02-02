"use client"
import StorySection from "@/app/components/shared/storysections"

export default function Section08() {
  return (
    <StorySection
      id="s08"
      title="Llega el gato con bombones"
      subtitle="La ratita escucha… y acepta."
      images={[
        { src: "/images/rata19.png", alt: "Gato aparece con flores" },
        { src: "/images/rata20.png", alt: "Gato y ratita conversan, ratita acepta" },
        { src: "/images/rata21.png", alt: "Gato la persigue" },
      ]}
    />
  )
}
