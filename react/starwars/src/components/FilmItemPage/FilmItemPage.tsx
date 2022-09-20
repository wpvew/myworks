import React from 'react';
import { IFilmData, useFilmsData } from '../../hooks/useFilmsData';
import { Link } from 'react-router-dom'
import styles from './filmitempage.module.css';
import Spinner from '../spinner/Spinner';

export function FilmItemPage() {
  const [film, loader, error] = useFilmsData() as [IFilmData, boolean, {}];

  return (
    <>
      { loader ? <Spinner/>
        :  !loader && !!film.epId
        ? <div className='container'>
            <Link to='/' className={styles.btnBack}>Back</Link>
            <h1 className={styles.filmTitle}>{film?.title}</h1>
            <div className={styles.filmBlock}>
              <div className={styles.filmInfo}>
                <p className={styles.filmDesc}>{film?.openDesc}</p>
                <div className={styles.filmLists}>
                  <h2 style={{ fontSize: 20 }}>Planets</h2>
                  <ul>
                    {film.planets?.map(planet => (
                      <li style={{ fontSize: 16 }} key={planet}>{planet}</li>
                    ))}
                  </ul>
                  <h2 style={{ fontSize: 20 }}>Species</h2>
                  <ul>
                    {film.species?.map(species => (
                      <li style={{ fontSize: 16 }} key={species}>{species}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <img className={styles.filmImg} src={film?.img} alt={film?.title} />
            </div>
          </div>
        : !!Object.keys(error).length && <div style={{ fontSize: 28 }}>film didn't find</div>
      }
    </>
  );
}
