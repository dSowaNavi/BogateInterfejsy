import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

 const FILMS = [
  { id: 1, title: 'Oppenheimer',       year: 2023, genre: 'Dramat',  rating: 5, watched: true  },
  { id: 2, title: 'Dune: Część druga', year: 2024, genre: 'Sci-Fi',  rating: 4, watched: false },
  { id: 3, title: 'Past Lives',        year: 2023, genre: 'Romans',  rating: 5, watched: true  },
  { id: 4, title: 'Poor Things',       year: 2023, genre: 'Komedia', rating: 4, watched: false },
];

  function RatingStars({ rating = 3 }) {
  const full = '★'.repeat(rating);
  const empty = '☆'.repeat(5 - rating);

  return <span>{full + empty}</span>;
}


function GenreBadge({ genre }) {
  const colors = {
    'Dramat': '#2509f3',
    'Sci-Fi': '#49caf1',
    'Romans': '#f043a2',
    'Komedia': '#5fec4d',
  };

  const bgColor = colors[genre] ?? '#b2bec3';

  return (
    <span style={{
      backgroundColor: bgColor      
    }}>
      {genre}
    </span>
  );
}

function WatchedBadge({ watched }) {
  if (!watched) return null;
  return <p>✓ Obejrzany</p>;
}


function FilmCard({ title, year, genre, rating, watched }) {
  console.log('render:', title);

  return (
    <div>
      <h3>{title} ({year})</h3>

      <GenreBadge genre={genre} />
      <RatingStars rating={rating} />
      <WatchedBadge watched={watched} />
    </div>
  );
}


function FilmList({ title, films }) {
  return (
    <div>
      <h2>{title}</h2>
      {films.map(film => (
        <FilmCard key={film.id} {...film} />
      ))}
    </div>
  );
}

function App() {
  const watchedFilms = FILMS.filter(film => film.watched);
  const unwatchedFilms = FILMS.filter(film => !film.watched);

  return (
    <div>
      <h1>🎬 Biblioteka Filmów</h1>

      <FilmList title="Obejrzane" films={watchedFilms} />
      <FilmList title="Do obejrzenia" films={unwatchedFilms} />
    </div>
  );
}

export default App
