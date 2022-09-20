import React from 'react';
import { IFilmData } from '../../hooks/useFilmsData';
import styles from './filmitem.module.css';

interface IFilmItemProps {
  filmDetails: IFilmData,
}

export const FilmItem = ({ filmDetails: film }: IFilmItemProps) => {
  return (
    <article className={styles.filmCard}>
      <img className={styles.filmImg} src={film.img} alt={film.title} />
      <div className={styles.filmInfo}>
        <div className={styles.filmHeader}>
          <h2 className={styles.filmTitle}>{film.title}</h2>
          <span className={styles.filmEpisode}>{`Episode #${film.epId}`}</span>
        </div>
        <p className={styles.filmDesc}>{film.openDesc}</p>
      </div>
    </article>
  );
}
