'use client'

import { useSearchParams } from "next/navigation"

export default function ErrorPage() {
  const search = useSearchParams();
  return <p>{search.get('code') ? search.get('code') : "Sorry, something went wrong"}</p>
}