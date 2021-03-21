import { useEffect, useState } from "react";

import { Button } from "./Button";

import { api } from "../services/api";

import '../styles/sidebar.scss';

interface SidebarProps {
  sidebarSelectedGenreId: number;
  getSelectedId: (id: number) => void;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function SideBar({ sidebarSelectedGenreId, getSelectedId }: SidebarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            id={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => getSelectedId(genre.id)}
            selected={sidebarSelectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}