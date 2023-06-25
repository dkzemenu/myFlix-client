import React from "react";


export const FavoriteMoviesView=({ favoriteMovieList }) => {

    return(
        <div>
            <h5>Favorite Movies:</h5>
                     { favoriteMovieList && favoriteMovieList.length > 0 ?(
                     favoriteMovieList.map((movie) => (
                        <div>
                        <p key={movie._id}>Title: {movie.title}</p>
                        <p> {movie.description} </p>
                        </div>
                     ))):(
                        <p> No movies in your favorites</p>
                     )}
        </div>
    )
}