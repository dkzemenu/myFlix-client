import PropTypes from 'prop-types'; 
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movieData, onMovieClick }) => {
    return (
        <Card>
            <Card.Img variant='top' src={movieData.image}/>
            <Card.Body>
                <Card.Title> {movieData.title} </Card.Title>
                <Card.Text></Card.Text>
                <Button onClick={() => onMovieClick(movieData)} variant='link' > Open </Button>
            </Card.Body>
        </Card>

        // <div onClick={() => {
        //     onMovieClick(movieData);
        // }}>
        //     {movieData.title}
        // </div>
    )
};

MovieCard.propTypes = {
    movieData: PropTypes.shape({
        title: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};