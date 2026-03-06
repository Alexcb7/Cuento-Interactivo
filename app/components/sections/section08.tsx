"use client"
import StorySection from "@/app/components/shared/storysections"

export default function Section09() {
  return (
    <StorySection
      id="s08"
      title="La ratita escapa del gato"
      frameTexts={[
        "La ratita entró corriendo en su casa y cerró la puerta con llave. ¡Qué susto se había llevado!",
        "Ya a salvo, se acurrucó en su sillón con un chocolate caliente y un buen libro para calmarse.",
        "Pero se sentía sola y triste. «¿Encontraré algún día a alguien que me quiera de verdad?»",
      ]}
      images={[
        { src: "/images/rata22.png", alt: "Rata escapa del gato" },
        { src: "/images/rata23.png", alt: "Rata tranquila leyendo" },
        { src: "/images/rata24.png", alt: "Rata Triste" },
      ]}
    />
  )
}
