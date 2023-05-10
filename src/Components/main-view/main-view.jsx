import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
    const [movies, setMovies] = useState ([
        {
            id: 1, 
            title: 'The Godfather',
            description: 'Some kind of cool mafia movie'
        }, 
        {
            id: 2,
            title: '21 Jump Street',
            description:' A pair of underachieving cops are sent back to a local high school to blend in and bring down a synthetic drug ring.'
        },
        {
            id: 3,
            title: 'SuperNova',
            description: 'A deep space rescue and recovery spaceship with a crew of 6 receives a distress call from a mining operation 3432 light years away. A rescue operation via dimension jump is made. Bad idea.'

        }
]);

const [selectedMovie, setSelectedMovie] = useState(null);

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