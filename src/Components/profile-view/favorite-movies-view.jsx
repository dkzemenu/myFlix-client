import React from "react";


export const FavoriteMoviesView=({ favoriteMovieList }) => {

    return(
        <div>
            <h5>Favorite Movies:</h5>
                     { favoriteMovieList && favoriteMovieList.length > 0 ?(
                     favoriteMovieList.map((movie) => (
                        <p key={movie._id}>{movie.title}</p>
                     ))):(
                        <p> No movies in your favorites</p>
                     )}
        </div>
    )
}