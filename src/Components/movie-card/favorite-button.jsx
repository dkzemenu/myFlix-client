import {Button} from 'react-bootstrap';

export const FavoriteButton = ({ token, favoriteMovie, movieData}) => {
    const handleSubmit = (event) => {
        event.preventDefault();
    
    let data = movieData;

        if(favoriteMovie.includes(movieData._id)) {
            fetch(`https://movieapi-lcrt.onrender.com/movies/${movieData._id}}`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`}
            }).then((res) => (res.json())
            ).then(() =>{
                alert("Removed from Favorites");
                window.location.reload();
                console.log('remove successful');
        }).catch((err) => {
            alert('Something went wrong' + err);
        })
        } else {
            fetch(`https://movieapi-lcrt.onrender.com/movies/${movieData._id}}`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`}
            }).then((res) => (res.json()))
            .then(() => {
                alert('Movie was added to favorites');
                window.location.reload();
                console.log('add successful');
            }).catch((err) => {
                alert('Something went wrong' + err);
            })
        }
    }
    return (
        <Button onClick={handleSubmit} variant='primary'>Add/Remove from favorites</Button>
    )
}