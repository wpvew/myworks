import React from 'react';
import { useFilmsData } from '../hooks/useFilmsData';

interface IFilmContextData {
    id: number,
    title: string,
    openDesc: string,
    img: string
}

export const filmContext = React.createContext<Array<IFilmContextData>>([]);

export function FilmContextProveder({ children }: {children: React.ReactNode}) {
    const [data] = useFilmsData() as [IFilmContextData[], boolean];

    return (
        <filmContext.Provider value={data}>
            {children}
        </filmContext.Provider>
    )
}
