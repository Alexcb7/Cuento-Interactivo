"use client"
import StorySection from "@/app/components/shared/storysections"

export default function Section06() {
  return (
    <StorySection
      id="s06"
      title="Llega el cerdo con bombones"
      frameTexts={[
        "Entonces apareció el cerdo con una caja de bombones envuelta con un gran lazo. «¡Ratita, cásate conmigo!»",
        "«¿Y por las noches qué harás?», preguntó la ratita. «¡Oinc, oinc!», gruñó el cerdo.",
        "«¡Ay no, que me asustarás!», dijo la ratita. Y el cerdo se marchó arrastrando los pies, muy triste.",
      ]}
      images={[
        { src: "/images/rata16.png", alt: "Perro aparece con bombones" },
        { src: "/images/rata17.png", alt: "Cerdo y ratita conversan, ratita rechaza" },
        { src: "/images/rata18.png", alt: "Cerdo se va triste" },
      ]}
      sfx={[
        { frameIndex: 1, src: "/sounds/cerdo.mp3.mp3", label: "¡Oinc, oinc!" },
      ]}
    />
  )
}
