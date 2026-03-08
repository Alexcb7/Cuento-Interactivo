"use client"
import StorySection from "@/app/components/shared/storysections"

export default function Section05() {
  return (
    <StorySection
      id="s05"
      title="Llega el perro con flores"
      frameTexts={[
        "Al rato llegó el perro con un ramo de flores y una gran sonrisa. «¡Ratita, cásate conmigo!»",
        "«¿Y por las noches qué harás?», preguntó la ratita. «¡Guau, guau!», ladró el perro.",
        "«¡Ay no, que me asustarás!», respondió la ratita cruzando los brazos. Y el perro se fue cabizbajo.",
      ]}
      images={[
        { src: "/images/rata13.png", alt: "Perro aparece con flores" },
        { src: "/images/rata14.png", alt: "Perro y ratita conversan, ratita rechaza" },
        { src: "/images/rata15.png", alt: "Perro se va triste" },
      ]}
      sfx={[
        { frameIndex: 1, src: "/sounds/perro.mp3.mp3", label: "¡Guau, guau!" },
      ]}
    />
  )
}
