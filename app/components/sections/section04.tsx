"use client"
import StorySection from "@/app/components/shared/storysections"

export default function Section04() {
  return (
    <StorySection
      id="s04"
      title="Aparece el gallo enamorado"
      frameTexts={[
        "De pronto apareció el gallo, con un ramo de flores y el corazón enamorado. «¡Ratita, cásate conmigo!»",
        "«¿Y por las noches qué harás?», preguntó la ratita. «¡Quiquiriquí!», cantó el gallo.",
        "«¡Ay no, que me asustarás!», dijo la ratita. Y el gallo se marchó con el corazón roto.",
      ]}
      images={[
        { src: "/images/rata10.png", alt: "Gallo aparece enamorado" },
        { src: "/images/rata11.png", alt: "Gallo y ratita conversan, ratita rechaza" },
        { src: "/images/rata12.png", alt: "Gallo se va triste" },
      ]}
      sfx={[
        { frameIndex: 1, src: "/sounds/gallo.mp3.mp3", label: "¡Quiquiriquí!" },
      ]}
    />
  )
}
