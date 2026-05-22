'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import useFetch from '../../hooks/useFetch'

export default function FilmsPage() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [search, setSearch] = useState('')

const searchRef = useRef(null)

 const { data, loading, error } = useFetch(
    `/api/filmy?v=${refreshKey}`
  )

useEffect(() => {
  searchRef.current?.focus()  
}, [])


  const filteredFilms = 
    data?.filter((film) =>
      film.title.toLowerCase().includes(search.toLowerCase())
    ) || []

  return (
    <div>
      <h1>Movie List</h1>

      <div>
        <button
          onClick={() => setRefreshKey((prev) => prev + 1)}
        >
          RefreshKey
        </button>

      </div>

      <input
        ref={searchRef}
        type="text"        
        placeholder="Enter title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: '10px',
          width: '300px',
          marginBottom: '20px',
        }}
      />

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <ul>
          {filteredFilms.map((film) => (
            <li key={film.id}>
              <Link  href={`/filmy/${film.id}`} prefetch = {false} replace>
                {film.title} ({film.year})
              </Link>              
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}