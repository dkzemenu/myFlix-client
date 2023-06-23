import {Button} from 'react-bootstrap';

export const FavoriteButton = ({ favoriteMovie, movieData, user, storedToken, favoriteMovieList, setFavoriteMovieList}) => {
    const handleSubmit = (event) => {
        event.preventDefault();
    
    let data = movieData;

        if(favoriteMovieList.includes(movieData._id)) {
            fetch(`https://movieapi-lcrt.onrender.com/users/${user.Username}/movies/${movieData._id}`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json", Authorization: `Bearer ${storedToken}`}
            }).then((res) => (res.json())
            ).then(() =>{
                alert("Removed from Favorites");
                console.log('remove successful');
                setFavoriteMovieList(favoriteMovieList.filter((movie) => movie._id !== movieData._id));
        }).catch((err) => {
            alert('Something went wrong' + err);
        })
        } else {
            fetch(`https://movieapi-lcrt.onrender.com/users/${user.Username}/movies/${movieData._id}`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json", Authorization: `Bearer ${storedToken}`}
            }).then((res) => (res.json()))
            .then(() => {
                alert('Movie was added to favorites');
                console.log('add successful ' + movieData.title);
                setFavoriteMovieList([...favoriteMovieList, movieData]);
            }).catch((err) => {
                alert('Something went wrong' + err);
            })
        }
    }
    return (
        <Button onClick={handleSubmit} variant='primary'>Add/Remove from favorites</Button>
    )
}