"use client"
import StorySection from "@/app/components/shared/storysections"

export default function Section10() {
  return (
    <StorySection
      id="s09"
      title="Llaman a la puerta"
      frameTexts={[
        "De repente, alguien llamó a la puerta. ¡Toc, toc! La ratita se levantó sorprendida. ¿Quién será?",
        "Abrió la puerta y allí estaba un ratoncito simpático con un ramo de flores. «Hola, ratita.»",
        "La ratita sintió que el corazón le latía muy fuerte. ¡Por fin alguien dulce y amable como ella!",
      ]}
      images={[
        { src: "/images/rata25.png", alt: "Llaman a la puerta" },
        { src: "/images/rata26.png", alt: "Aparece el ratón" },
        { src: "/images/rata27.png", alt: "Rata se enamora de ratón" },
      ]}
    />
  )
}
