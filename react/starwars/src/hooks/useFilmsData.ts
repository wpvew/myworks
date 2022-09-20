import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import sw_ep1 from '../img/sw-ep1.jpeg'
import sw_ep2 from '../img/sw-ep2.webp'
import sw_ep3 from '../img/sw-ep3.jpeg'
import sw_ep4 from '../img/sw-ep4.jpeg'
import sw_ep5 from '../img/sw-ep5.webp'
import sw_ep6 from '../img/sw-ep6.jpeg'
import axios from 'axios';

interface IPosters {
  [N: string]: any
}

export const posters: IPosters = {
  '1': sw_ep1,
  '2': sw_ep2,
  '3': sw_ep3,
  '4': sw_ep4,
  '5': sw_ep5,
  '6': sw_ep6
};

interface IFilmListData {
    [N: string]: any
  }

export interface IFilmData {
  id: number,
  epId: number,
  title: string,
  openDesc: string,
  img: string,
  planets?: string[],
  species?: string[],
}

export const useFilmsData = () => {
    const [films, setFilms] = useState<Array<IFilmData>>([]);
    const [film, setFilm] = useState<Partial<IFilmData>>({});
    const [error, setError] = useState({})
    const [loader, setLoader] = useState(true)

    const params = useParams();

    function requestData(data: any) {
      return Promise.all(data.map((item: string) => axios.get(item).then(({data}) => data.name)))
    }

    useEffect(() => {
      axios
        .get(`https://swapi.dev/api/films${params.id ? '/' + params.id : ''}`).then(({data}) => {
          if(!params.id) {
            const filmList: Array<Record<string, any>> = data.results;
            setFilms(filmList.map((film: IFilmListData, i: number): IFilmData => {
              return {
                id: i + 1,
                epId: film['episode_id'],
                title: film['title'],
                openDesc: film['opening_crawl'],
                img: posters[film['episode_id']],
              }})
            )
          } else {
            Promise.all([
              data.species,
              data.planets
            ].map((elem) => requestData(elem))).then(([species, planets]) => {

              setFilm({
                epId: data['episode_id'],
                title: data['title'],
                openDesc: data['opening_crawl'],
                img: posters[data['episode_id']],
                planets: planets,
                species: species,
              })
            })
          }
        })
        .catch(error => {
          setError(error)
        })
        .finally(() => {
          setLoader(false)
        });
    }, [params.id]);

    return [params.id ? film : films, loader, error];
}
