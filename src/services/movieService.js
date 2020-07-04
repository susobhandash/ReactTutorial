import React from 'react';

const { createContext, useContext } = React;

const movieServiceContext = createContext({getMoviesByName: ({query}) => {
    try {
        const url = 'https://api.themoviedb.org/3/search/movie?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=en-US&query=' + query + '&page=1&include_adult=false';
        return fetch(url);
    } catch(err){
        console.error(err);
        return err;
    }
}});

export const MovieServiceProvider = (props) => {
    const value = {
        getMoviesByName: props.getMoviesByName
    };

    return (
        <movieServiceContext.Provider value={value}>
            {props.children}
        </movieServiceContext.Provider>
    )
};

export const useService = () => {
    return useContext(movieServiceContext);
};