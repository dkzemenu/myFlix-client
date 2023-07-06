import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export const MovieView = ({ movies, user, token, storedToken, storedUser}) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m._id === movieId) || {};
    const [isFavorite, setIsFavorite] = useState(null);
    let userFav =JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        isFavoriteMovie();
    }, []);

    const isFavoriteMovie = () => {
        if(userFav.FavoriteMovies.includes(movieId)) {
            setIsFavorite(true);
        } else {
            setIsFavorite(false);
        }
    }

    const handleClick = () => {
        if (!isFavorite) {
            fetch(`https://movieapi-lcrt.onrender.com/users/${user.Username}/movies/${movieId}`, {
            method: "POST",
            headers: {"Content-Type": "application/json", Authorization: `Bearer ${storedToken}`}
        }).then((res) => {
            if (res.ok) { 
            alert('Movie was added to favorites');
            setIsFavorite(!isFavorite);
            userFav =JSON.parse(localStorage.getItem('user'));
            user.FavoriteMovies.push(movieId);
            localStorage.setItem('user', JSON.stringify(user));
            console.log('add successful ' + movieId)
            } else {
                alert('Something went terribly wrong');
            }
        }).catch((e) => {
            console.log(e);
        });
    }else {
              fetch(`https://movieapi-lcrt.onrender.com/users/${user.Username}/movies/${movieId}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json", Authorization: `Bearer ${storedToken}`}
        }).then(response => {
            if(response.ok) {
                alert('Movie was removed from favorites');
                setIsFavorite(false);
                user.FavoriteMovies = user.FavoriteMovies.filter( id => id !== movieId);
                localStorage.setItem('user', JSON.stringify(user));
                console.log ('remove successful ' + movieId)
            }else {
                alert('Something went terribly wrong');
            }
        }).catch((e) => {
            console.log(e);
        })
    }
};

    return (
        <div>
            <div>
                <img className='w-25' src ={movie.image} />
            </div>
            <div className='w-50' >
                <span>Title: </span>
                <span>{movie.title} </span>
            </div>
            <div className='w-50' >
                <span>Description: </span>
                <span>{movie.description} </span>
            </div>
            <Link to={`/`} >
                <button className="back-button">Back</button>
            </Link>
            {isFavorite ? 
                <Button variant="danger" className="ms-2" onClick={handleClick}>Remove from favorites</Button>
                : <Button variant="secondary" className="ms-2" onClick={handleClick}>Add to favorites</Button>
            }  
        </div>
    )
}