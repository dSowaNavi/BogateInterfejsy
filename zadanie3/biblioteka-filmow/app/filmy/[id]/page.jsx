'use client'
import { notFound, useParams } from 'next/navigation'
import FavoriteButton from './FavouriteButton'
import useFetch from '../../../hooks/useFetch'

export default function FilmDetailsPage({ params }) {

const p = useParams()
  const id = Number(p.id)
  const { data , loading, error } = useFetch(
    `/api/filmy`
  )
 if (loading) {
    return <p>Ładowanie...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  
  const film = data?.find((f) => f.id === id)
  

  if (!film) {
    notFound()
  }

  return (
    <div>
      <h1>{film.title}</h1>

      <p>Year: {film.year}</p>
      <p>Genre: {film.genre}</p>

      <FavoriteButton />
    </div>
  )
}