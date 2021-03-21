import { useEffect, useState } from "react";

import { MovieCard } from "./MovieCard";

import { api } from "../services/api";

import '../styles/content.scss';

interface ContentProps {
  contentSelectedGenreId: number;
}

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function Content({ contentSelectedGenreId }: ContentProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);

  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${contentSelectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }, [contentSelectedGenreId]);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${contentSelectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    });
  }, [contentSelectedGenreId]);

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  );
}