import React, {useState} from "react";
import MovieCard from './movieCard.js';
import {useService} from '../services/movieService';

const { useCallback } = React;

export const SearchMovices = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const service = useService();

    const searchMovies = useCallback((e) => {
        e.preventDefault();
        const data = service.getMoviesByName({ query }).then(async (res) => {
            const result  = await res.json();
            setMovies(result.results)
        });
        
      }, [query]);
    
    return (
        <>
            <form className="form" >
                <label className="label" htmlFor="query">Movie Name</label>
                <input className="input neo-shadow-inset neo-shadow-inset-focus" type="text" name="query"
                    value={query} onChange={(e) => setQuery(e.target.value)}
                />
                <button className="button neo-shadow neo-shadow-hover" onClick={searchMovies}>Search</button>
            </form>
            <div className="card-list">
                {
                    movies.filter(movie => movie.poster_path && movie.overview).map(movie => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))
                }
            </div>
        </>
    );
}