import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser:null);
    const [token, setToken] = useState(storedToken? storedToken:null);
    const [movies, setMovies] = useState ([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
  

useEffect(() => {
    if (!token) {
        return;
    }
    
    fetch ('https://movieapi-lcrt.onrender.com/movies',{headers: {Authorization: 'Bearer${token}'}})
    .then ((response) => response.json())
    .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((doc) => {
            return {
                _id: doc._id,
                title: doc.Title,
                description: doc.Description,
                image: doc.ImagePath
            };
        });
        setMovies(moviesFromApi);
    });
}, [token]);

if (!user) { 
    return (
    <>    <LoginView onLoggedIn={(user, token) => 
        {
        setUser(user); 
        setToken(token);
        }} 
        />
        or
        <SignupView/>
        </>
    );
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
        <button onClick={() => {setUser(null); setToken(null); localStorage.clear();}}>Logout</button>
    </div>
)};
