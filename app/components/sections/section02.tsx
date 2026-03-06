"use client"
import StorySection from "@/app/components/shared/storysections"

export default function Section02() {
  return (
    <StorySection
      id="s02"
      title="¡Una tienda de lazos!"
      frameTexts={[
        "Paseando por la calle, la ratita descubrió una preciosa tienda llena de lazos de todos los colores.",
        "Entró emocionada y miró las estanterías repletas de lazos brillantes. ¡Había tantos para elegir!",
        "«¡Me llevo este lazo rojo!», dijo decidida, pagando con su moneda a la amable tendera.",
      ]}
      images={[
        { src: "/images/rata4.png", alt: "Ratita encuentra la tienda de lazos" },
        { src: "/images/rata5.png", alt: "Ratita ve el lazo rojo dentro de la tienda" },
        { src: "/images/rata6.png", alt: "Ratita compra el lazo rojo" },
      ]}
    />
  )
}
