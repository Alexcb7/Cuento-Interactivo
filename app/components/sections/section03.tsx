"use client"
import StorySection from "@/app/components/shared/storysections"

export default function Section03() {
  return (
    <StorySection
      id="s03"
      title="De vuelta a casa"
      frameTexts={[
        "Con su lazo nuevo, la ratita pasó por el jardín. Los pajaritos y las ardillas la saludaban al pasar.",
        "Llegó a su casita y abrió la puerta contenta. ¡Qué ganas de descansar!",
        "Se sentó en el jardín a tomar un zumo de naranja y un pastelito. ¡Qué tarde tan tranquila!",
      ]}
      images={[
        { src: "/images/rata7.png", alt: "Ratita paseando por el jardín con su lazo" },
        { src: "/images/rata8.png", alt: "Ratita llegando a casa" },
        { src: "/images/rata9.png", alt: "Ratita sentada tomando zumo y pastel" },
      ]}
    />
  )
}
