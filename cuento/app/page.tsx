"use client"

import React from "react"
import Story from "@/app/components/story"
import { initLenis } from "@/app/components/shared/leni"

export default function Page() {
  React.useEffect(() => {
    initLenis()
  }, [])

  React.useEffect(() => {
    const blockSpace = (e: KeyboardEvent) => {
      if (e.code === "Space") e.preventDefault()
    }
    window.addEventListener("keydown", blockSpace)
    return () => window.removeEventListener("keydown", blockSpace)
  }, [])

  return <Story />
}
