"use client"
import StorySection from "@/app/components/shared/storysections"

export default function Section03() {
  return (
    <StorySection
      id="s03"
      title="De vuelta a casa"
      subtitle="Qué bien sienta descansar con un zumo y un pastel."
      images={[
        { src: "/images/rata7.png", alt: "Ratita paseando por el jardín con su lazo" },
        { src: "/images/rata8.png", alt: "Ratita llegando a casa" },
        { src: "/images/rata9.png", alt: "Ratita sentada tomando zumo y pastel" },
      ]}
    />
  )
}
