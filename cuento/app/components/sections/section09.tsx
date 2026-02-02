"use client"
import StorySection from "@/app/components/shared/storysections"

export default function Section09() {
  return (
    <StorySection
      id="s09"
      title="Rata escapa del gato"
      subtitle="La ratita huye del gato y se mete en casa"
      images={[
        { src: "/images/rata22.png", alt: "Rata escapa del gato" },
        { src: "/images/rata23.png", alt: "Rata tranquila leyendo" },
        { src: "/images/rata24.png", alt: "Rata Triste" },
      ]}
    />
  )
}
