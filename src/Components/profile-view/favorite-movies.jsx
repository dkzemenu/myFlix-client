import React from "react";


export const FavoriteMovies=({ favoriteMovie }) => {

    return(
        <div>
            <h5>Favorite Movies:</h5>
            {favoriteMovie.map((movies) => {
                return(
                    <div key={movies._id}>
                        <img src={movies.ImagePath} alt="" />
                        <Link to={`/movies/${movies._id}`}>
                            <h4>{movies.Title} </h4>
                        </Link>
                        <button variant='secondary' onClick={()=> removeFav(movies._id)} >Remove from list</button>
                    </div>
                )
            })}
        </div>
    )

}