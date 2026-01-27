"use client"

import React from "react"
import Story from "@/app/components/story"
import { initLenis } from "@/app/components/shared/leni"

export default function Page() {
  React.useEffect(() => {
    initLenis()
  }, [])

  return <Story />
}
