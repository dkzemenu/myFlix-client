import { Col, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import {useState} from 'react';

// import components 
import { FavoriteMoviesView } from "./favorite-movies-view";
import { ProfileDelete } from "./profile-delete";
import { MovieCard } from "../movie-card/movie-card";   

export const ProfileView = ({ storedUser, storedToken, token, favoriteMovie, favoriteMovieList, user }) => {

    return(
        <>
        <Row>
            <Col>
                <Link to={`/users/settings`}>Settings</Link>
            </Col>
        </Row>
        <Row>
            <Col>User:</Col>
            <Col>{storedUser.Username}</Col>
        </Row>
        <Row>
            <Col>Email:</Col>
            <Col>{storedUser.email} </Col>
        </Row>
        <Row>
            <Col>Birthday:</Col>
            <Col>{storedUser.Birthday} </Col>
        </Row>
        <Row>            
            <Col>
                <h2> Delete Profile </h2>
                <ProfileDelete storedUser={storedUser} storedToken={storedToken} token={token} user={user} />
            </Col>
        </Row>
        </>
    )

}