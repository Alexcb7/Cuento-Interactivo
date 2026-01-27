"use client"
import StorySection from "@/app/components/shared/storysections"

export default function Section05() {
  return (
    <StorySection
      id="s05"
      title="Llega el perro con flores"
      subtitle="La ratita escucha… pero vuelve a decir que no."
      images={[
        { src: "/images/s05/1.webp", alt: "Perro aparece con flores" },
        { src: "/images/s05/2.webp", alt: "Perro y ratita conversan, ratita rechaza" },
        { src: "/images/s05/3.webp", alt: "Perro se va triste" },
      ]}
      bg="#1d142a"
    />
  )
}
