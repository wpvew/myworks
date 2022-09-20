import React from 'react';
import { FilmItem } from '../FilmItem';
import { useNavigate } from 'react-router-dom'
import styles from './filmlist.module.css';
import { IFilmData, useFilmsData } from '../../hooks/useFilmsData';
import Spinner from '../spinner/Spinner';


export function FilmList() {
  const [films, loader] = useFilmsData() as [IFilmData[], boolean];
  const navigate = useNavigate();
  films.sort((a, b) => a.epId - b.epId)

  return (
    <div className="container">
      {loader
        ? <Spinner/>
        : <ul className={styles.filmList}>
            {films.map((film) => (
              <li onClick={() => navigate(`${film.id}`)} className={styles.filmItem} key={film.epId}>
                <FilmItem filmDetails={film}/>
              </li>
            ))}
          </ul>
      }
    </div>
  );
}
