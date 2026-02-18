"use client"

import React from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const SECTIONS = [
  { id: "s01", frames: 3 },
  { id: "s02", frames: 3 },
  { id: "s03", frames: 3 },
  { id: "s04", frames: 3 },
  { id: "s05", frames: 3 },
  { id: "s06", frames: 3 },
  { id: "s07", frames: 3 },
  { id: "s08", frames: 3 },
  { id: "s09", frames: 3 },
  { id: "s10", frames: 1 },
]

export default function Pagination() {
  const [activeSection, setActiveSection] = React.useState(0)
  const [activeFrame, setActiveFrame] = React.useState(0)

  React.useLayoutEffect(() => {
    const triggers = SECTIONS.map((section, i) => {
      return ScrollTrigger.create({
        trigger: `#${section.id}`,
        start: "top top",
        end: "bottom top",
        onToggle: (self) => {
          if (self.isActive) {
            setActiveSection(i)
            setActiveFrame(0)
          }
        },
        onUpdate: (self) => {
          if (self.isActive && section.frames > 1) {
            const fi = Math.min(
              Math.floor(self.progress * section.frames),
              section.frames - 1
            )
            setActiveFrame(fi)
          }
        },
      })
    })

    return () => triggers.forEach((t) => t.kill())
  }, [])

  return (
    <nav className="pagination" aria-label="Sección del cuento">
      {SECTIONS.map((section, i) => {
        const isActive = i === activeSection
        return (
          <div key={section.id} className="pagination-item">
            {isActive && section.frames > 1 && (
              <div className="pagination-frames">
                {Array.from({ length: section.frames }).map((_, fi) => (
                  <span
                    key={fi}
                    className={`pagination-frame-dot ${fi === activeFrame ? "pagination-frame-dot--active" : ""}`}
                  />
                ))}
              </div>
            )}
            <button
              className={`pagination-dot ${isActive ? "pagination-dot--active" : ""}`}
              aria-label={`Sección ${i + 1}`}
              onClick={() => {
                const el = document.getElementById(section.id)
                if (el) el.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <span className="pagination-number">{i + 1}</span>
            </button>
          </div>
        )
      })}
    </nav>
  )
}
