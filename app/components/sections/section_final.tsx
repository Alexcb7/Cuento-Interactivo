"use client"
import StorySection from "@/app/components/shared/storysections"

interface SectionFinalProps {
  onFinish?: () => void
}

export default function SectionFinal({ onFinish }: SectionFinalProps) {
  return (
    <StorySection
      id="s10"
      title="El ratón y la ratita se enamoran"
      frameTexts={[
        "Y juntos prepararon una cena maravillosa. La ratita y el ratón cenaron felices, y colorín colorado, este cuento se ha acabado.",
      ]}
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

      {/* Botón Final */}
      {onFinish && (
        <button className="final-btn" onClick={onFinish} type="button">
          Final
        </button>
      )}
    </StorySection>
  )
}
