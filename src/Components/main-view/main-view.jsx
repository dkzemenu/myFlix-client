import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';

export const MainView = () => {
    const [movies, setMovies] = useState ([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const {user, setUser} = useState(null);

useEffect(() => {
    fetch ('https://movieapi-lcrt.onrender.com/movies')
    .then ((response) => response.json())
    .then((data) => {
        const moviesFromApi = data.map((doc) => {
            return {
                _id: doc._id,
                title: doc.Title,
                description: doc.Description
            };
        });
        setMovies(moviesFromApi);
    });
}, []);

if (!user) { 
    return <LoginView onLoggedIn={(user) => setUser(user)} />
}

if (selectedMovie) {
    return (
        <MovieView 
        movieData = {selectedMovie}
        onBackClick = {() => setSelectedMovie (null)}
        />
    )
}

if (movies.length === 0) {
    return <div>There are no movies!</div>
}

return (
    <div>
        {movies.map((movie) => {
            return (
                <MovieCard 
                key ={movie.id}
                movieData = {movie}
                onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie (newSelectedMovie);
                }}
                />
            )
        })}

    </div>
)};