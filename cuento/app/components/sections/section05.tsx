"use client"
import StorySection from "@/app/components/shared/storysections"

export default function Section05() {
  return (
    <StorySection
      id="s05"
      title="Llega el perro con flores"
      subtitle="La ratita escucha… pero vuelve a decir que no."
      images={[
        { src: "/images/rata13.png", alt: "Perro aparece con flores" },
        { src: "/images/rata14.png", alt: "Perro y ratita conversan, ratita rechaza" },
        { src: "/images/rata15.png", alt: "Perro se va triste" },
      ]}
    />
  )
}
