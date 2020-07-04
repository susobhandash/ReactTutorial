import React from 'react';

const { createContext, useContext } = React;

const getMoviesByName = (query) => {
    if(query) {
        try {
            const url = 'https://api.themoviedb.org/3/search/movie?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=en-US&query=' + query + '&page=1&include_adult=false';
            return fetch(url);
        } catch(err){
            console.error(err);
            return err;
        }
    }
};

const getSimilarMovies = (id) => {
    if (id) {
        try {
            const url = 'https://api.themoviedb.org/3/movie/' + id + '/similar?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=en-US&page=1';
            return fetch(url);
        } catch(err){
            console.error(err);
            return err;
        }
    }
};

const movieServiceContext = createContext({
    getMoviesByName: ({query}) => {
        return getMoviesByName(query);
    },
    getSimilarMovies: (id) => {
        return getSimilarMovies(id);
    }
});

export const useService = () => {
    return useContext(movieServiceContext);
};
