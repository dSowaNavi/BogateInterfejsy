'use client'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <div>
      <h1>Oops, movie could not be found</h1>

      <Link href="/filmy">
        Return to movie list.
      </Link>
    </div>
  )
}