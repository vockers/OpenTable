'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SearchBar() {
  const router = useRouter()
  const [location, setLocation] = useState("")

  return (
    <div className="text-left text-lg py-3 m-auto flex justify-center">
      <input
        type="text"
        className="rounded text-lg mr-3 w-74 p-2 w-[450px]"
        placeholder="State, city or town"
        value={location}
        onChange={e => setLocation(e.target.value)}
      />
      <button className="rounded bg-red-600 px-9 py-2 text-white" onClick={() => {
        router.push(`/search?city=${location}`)
      }}>Let's go</button>
    </div>
  )
}