import React from 'react';
import PropTypes from 'prop-types'; 
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { FavoriteButton } from './favorite-button';

export const MovieCard = ({ movieData, favoriteMovie, token, user }) => {
    return (
        <Card className='h-100'>
            <Card.Img variant='top' src={movieData.image}/>
            <Card.Body>
                <Card.Title> {movieData.title} </Card.Title>
                <Card.Text></Card.Text>
                <Link to={`/movies/${encodeURIComponent(movieData._id)}`}>
                    <Button variant='link' > Open </Button>
                </Link>
                <FavoriteButton movieData={movieData} favoriteMovie={favoriteMovie} token={token} user={user} />
            </Card.Body>
        </Card>
    )
};

MovieCard.propTypes = {
    movieData: PropTypes.shape({
        title: PropTypes.string,
        image: PropTypes.string,
        description: PropTypes.string,
        _id: PropTypes.string
    }).isRequired
};