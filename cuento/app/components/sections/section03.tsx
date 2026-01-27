"use client"
import StorySection from "@/app/components/shared/storysections"

export default function Section03() {
  return (
    <StorySection
      id="s03"
      title="De vuelta a casa"
      subtitle="Qué bien sienta descansar con un zumo y un pastel."
      images={[
        { src: "/images/s03/1.webp", alt: "Ratita paseando por el jardín con su lazo" },
        { src: "/images/s03/2.webp", alt: "Ratita llegando a casa" },
        { src: "/images/s03/3.webp", alt: "Ratita sentada tomando zumo y pastel" },
      ]}
      bg="#092018"
    />
  )
}
