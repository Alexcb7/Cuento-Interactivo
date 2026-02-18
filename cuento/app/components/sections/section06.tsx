"use client"
import StorySection from "@/app/components/shared/storysections"

export default function Section06() {
  return (
    <StorySection
      id="s06"
      title="Llega el cerdo con bombones"
      subtitle="La ratita escucha… pero vuelve a decir que no."
      images={[
        { src: "/images/rata16.png", alt: "Perro aparece con bombones" },
        { src: "/images/rata17.png", alt: "Cerdo y ratita conversan, ratita rechaza" },
        { src: "/images/rata18.png", alt: "Cerdo se va triste" },
      ]}
    />
  )
}
