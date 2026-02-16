"use client"

import React from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const SECTIONS = ["s01", "s02", "s03", "s04", "s05"]

export default function Pagination() {
  const [active, setActive] = React.useState(0)

  React.useLayoutEffect(() => {
    const triggers = SECTIONS.map((id, i) => {
      return ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) setActive(i)
        },
      })
    })

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [])

  return (
    <nav className="pagination" aria-label="Sección del cuento">
      {SECTIONS.map((id, i) => (
        <button
          key={id}
          className={`pagination-dot ${i === active ? "pagination-dot--active" : ""}`}
          aria-label={`Sección ${i + 1}`}
          onClick={() => {
            const el = document.getElementById(id)
            if (el) el.scrollIntoView({ behavior: "smooth" })
          }}
        >
          <span className="pagination-number">{i + 1}</span>
        </button>
      ))}
    </nav>
  )
}
