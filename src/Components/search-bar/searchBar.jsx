import React from "react";

export const SearchBar = ({movies, setMovies}) => {
    const handleSearch = (event) => {
        const query = event.target.value

        const filteredMovies = movies.filter((movie) => 
        movie.title.toLowerCase().includes(query.toLowerCase()));

        if (!filteredMovies.length || !query) {
            setMovies(movies);
        } else {
            setMovies(filteredMovies);
        }
    };
    
    const handleKeyPress = (event) => {
        const query = event.target.value

        if (event.key === 'Enter' && query.length == 0) {
            event.preventDefault();
            window.location.reload();
        }
    };

    return (
        <div>
            <label><h4>Search</h4></label>
            <input type='text' onChange={handleSearch} onKeyDown={handleKeyPress}>
            </input>
        </div>
    )
    
}