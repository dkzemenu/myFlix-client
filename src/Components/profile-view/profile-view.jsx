import { Col, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';


// import components 
import { ProfileDelete } from "./profile-delete";  

export const ProfileView = ({ storedUser, storedToken, token, movieData , user }) => {
    let favoriteMovies = movieData.filter((movie) => user.FavoriteMovies.includes(movie._id));

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
        <Row>
        <h2>Favorite Movies</h2>
            {favoriteMovies.length === 0 ? (
                <Col>You have no favorite movies. Lets add some!</Col>
            ) : ( 
            <>
                {favoriteMovies.map((movie) => (
                    <Col className="mb-4" key={movie._id} xl={2} lg={3} md={4} xs={6}>
                       <div>
                            <img className="w-100 mb-1" src={movie.image} alt="movie poster image" />
                            <p> <b>Title: </b>{movie.title}</p>
                            <p> <b> Description: </b>{movie.description} </p>
                       </div>
                    </Col> 
                ))} 
            </>
            )}
        </Row>
        </>
    )

}