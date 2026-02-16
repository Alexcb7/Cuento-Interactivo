"use client"

import Section01 from "@/app/components/sections/section01"
import Section02 from "@/app/components/sections/section02"
import Section03 from "@/app/components/sections/section03"
import Section04 from "@/app/components/sections/section04"
import Section05 from "@/app/components/sections/section05"
import Pagination from "@/app/components/shared/pagination"

export default function Story() {
  return (
    <>
      <Pagination />
      <main>
        <Section01 />
        <Section02 />
        <Section03 />
        <Section04 />
        <Section05 />
      </main>
    </>
  )
}
