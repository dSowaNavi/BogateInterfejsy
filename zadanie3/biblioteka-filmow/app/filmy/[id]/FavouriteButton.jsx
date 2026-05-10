'use client'

import { useState } from 'react'

export default function FavoriteButton() {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <button
      onClick={() =>
        setIsFavorite((prev) => !prev)
      }
    >
      {isFavorite
        ? 'Remove from Favourite'
        : 'Add to favourites'}
    </button>
  )
}