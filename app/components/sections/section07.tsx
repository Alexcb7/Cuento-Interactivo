"use client"
import StorySection from "@/app/components/shared/storysections"

export default function Section07() {
  return (
    <StorySection
      id="s07"
      title="Llega el gato con flores"
      frameTexts={[
        "Llegó entonces el gato, elegante y sonriente, con un ramo de tulipanes. «Ratita, cásate conmigo.»",
        "«¿Y por las noches qué harás?», preguntó ella. «Dormiré calladito», ronroneó el gato con dulzura.",
        "¡Pero de repente el gato mostró sus garras y la persiguió. ¡Era una trampa! ¡La ratita corrió asustada!",
      ]}
      images={[
        { src: "/images/rata19.png", alt: "Gato aparece con flores" },
        { src: "/images/rata20.png", alt: "Gato y ratita conversan, ratita acepta" },
        { src: "/images/rata21.png", alt: "Gato la persigue" },
      ]}
      speedLines={[
        { frameIndex: 2, top: "35%", left: "55%" },
      ]}
    />
  )
}
