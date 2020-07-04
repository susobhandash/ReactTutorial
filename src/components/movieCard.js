import React, {useState, useEffect} from "react";
import {useService} from '../services/movieService';

const { useCallback } = React;

export default function MovieCard({movie}){
    const service = useService();
    const [movieid, setMovieid] = useState(0);

    useEffect(() => { 
        setMovieid(movieid);
            if(movieid !== 0) {
                const data = service.getSimilarMovies(movieid).then(async (res) => {
                    const result  = await res.json();
                    console.log(result);
                });
            }
    }, [service, movieid]);

    return (
         <div className="card neo-shadow-lvl">
            <div className="card--image">
                <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                    alt={movie.title + ' poster'} data={movie.id}
                    onClick={(e) => {setMovieid(Number(e.target.getAttribute('data')));}}
                />
            </div>
            <div className="card--content">
                <h3 className="card--title"> {movieid} {movie.id} {movie.title}</h3>
                <p><small>RELEASE DATE: {movie.release_date}</small></p>
                <p><small>RATING: {movie.vote_average}</small></p>
                <p className="card--desc">{movie.overview}</p>
            </div>

        </div>
    )
}