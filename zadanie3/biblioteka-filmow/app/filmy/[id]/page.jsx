'use client'
import { notFound, useParams } from 'next/navigation'
import FavoriteButton from './FavouriteButton'
import useFetch from '../../../hooks/useFetch'
import { useEffect, useState} from 'react'


export default function FilmDetailsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)
  const p = useParams()
  const id = Number(p?.id)

useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/filmy`);
      const unpackedData = await res.json();
      setData(unpackedData);
      setLoading(unpackedData.loading);
      setError(unpackedData.error)
    }

    fetchData();
  }, []);

  const film = data?.find((f) => f.id === id)


  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!loading && !film) {
    notFound()
}

  return (

    
    <div>
      

      <div>
      <h1>{film.title}</h1>

      <p>Year: {film.year}</p>
      <p>Genre: {film.genre}</p>

      <FavoriteButton /> 
      </div>
    </div>
  )
}