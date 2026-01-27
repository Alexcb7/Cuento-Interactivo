"use client"
import StorySection from "@/app/components/shared/storysections"

export default function Section02() {
  return (
    <StorySection
      id="s02"
      title="¡Una tienda de lazos!"
      subtitle="La ratita entra y ve un lazo rojo precioso."
      images={[
        { src: "/images/rata4.png", alt: "Ratita encuentra la tienda de lazos" },
        { src: "/images/rata5.png", alt: "Ratita ve el lazo rojo dentro de la tienda" },
        { src: "/images/rata6.png", alt: "Ratita compra el lazo rojo" },
      ]}
      bg="#081a2b"
    />
  )
}
