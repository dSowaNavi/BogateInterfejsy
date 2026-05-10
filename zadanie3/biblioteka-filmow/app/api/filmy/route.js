import { NextResponse } from 'next/server'
import { z } from 'zod'

let films = [
  { id: 1, title: 'Oppenheimer', year: 2023, genre: 'Dramat' },
  { id: 2, title: 'Dune: Czesc druga', year: 2024, genre: 'Sci-Fi' },
  { id: 3, title: 'Past Lives', year: 2023, genre: 'Romans' },
  { id: 4, title: 'Poor Things', year: 2023, genre: 'Komedia' },
]

const filmSchema = z.object({
  title: z.string().min(2),
  year: z.number().int().min(1888).max(2030),
  genre: z.string().min(1),
})

export async function GET() {
  return NextResponse.json(films)
}

export async function POST(request) {
  try {
    const body = await request.json()

    const validatedData = filmSchema.parse({
      title: body.title,
      year: Number(body.year),
      genre: body.genre,
    })

    const newFilm = {
      id: films.length + 1,
      title: validatedData.title,
      year: validatedData.year,
      genre: validatedData.genre,
    }

    films.push(newFilm)

    return NextResponse.json(newFilm, {
      status: 201,
    })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        error: 'Validation error',
      },
      {
        status: 400,
      }
    )
  }
}