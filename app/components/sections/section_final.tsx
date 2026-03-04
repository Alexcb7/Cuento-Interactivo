"use client"
import StorySection from "@/app/components/shared/storysections"

export default function SectionFinal() {
  return (
    <StorySection
      id="s10"
      title="El raton y la ratita se enamoran"
      subtitle="Cita amorosa"
      images={[
        { src: "/images/final28.png", alt: "Ratita y Raton cenando" },
      ]}
    >
      {/* Vapor plato izquierdo */}
      <div className="smoke smoke--plate" style={{ top: "68%", left: "34%" }}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Vapor plato derecho */}
      <div className="smoke smoke--plate" style={{ top: "68%", left: "60%" }}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </StorySection>
  )
}
