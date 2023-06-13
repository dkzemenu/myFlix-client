import React from 'react';
import PropTypes from 'prop-types'; 
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movieData }) => {
    return (
        <Card className='h-100'>
            <Card.Img variant='top' src={movieData.image}/>
            <Card.Body>
                <Card.Title> {movieData.title} </Card.Title>
                <Card.Text></Card.Text>
                <Link to={`/movies/${encodeURIComponent(movieData.id)}`}>
                    <Button variant='link' > Open </Button>
                </Link>
            </Card.Body>
        </Card>
    )
};

MovieCard.propTypes = {
    movieData: PropTypes.shape({
        title: PropTypes.string,
        image: PropTypes.string,
        description: PropTypes.string
    }).isRequired
};