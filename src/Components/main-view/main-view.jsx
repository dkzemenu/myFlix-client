import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import page components
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { ProfileSettings } from "../profile-view/settings";
import MovieForm from "../movie-form/MovieForm";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favoriteMovie, setFavoriteMovie] = useState([]);
  const [favoriteMovieList, setFavoriteMovieList] = useState([]);

  //fetch data from API
  useEffect(() => {
    if (!token) {
      return;
    } else {
      fetch("http://localhost:5000/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => {
          const moviesFromApi = data.map((doc) => {
            return {
              _id: doc._id,
              title: doc.Title,
              description: doc.Description,
              image: doc.ImagePath,
            };
          });
          setMovies(moviesFromApi);
          console.log(data);
        });
    }
  }, [token]);
  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        movies={movies}
        setMovies={setMovies}
        onLoggedOut={() => {
          setUser(null),
            setToken(null),
            localStorage.clear(),
            (<Navigate to="/" />);
        }}
      />
      <Row>
        <Routes>
          {/* allow users to signup for a new account */}
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView token={token} />
                  </Col>
                )}
              </>
            }
          />
          {/* allow existing users to log in  */}
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>
            }
          />
          {/* allow exisitng user to access and view movie datbase by individual movies */}
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col> There are no movies here! </Col>
                ) : (
                  <Col>
                    <MovieView
                      movies={movies}
                      user={user}
                      token={token}
                      storedToken={storedToken}
                      storedUser={storedUser}
                    />
                  </Col>
                )}
              </>
            }
          />
          {/* allow exisitng users to view all movie database */}
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col> There are no movies here!</Col>
                ) : (
                  <>
                    {movies.map((movie) => {
                      return (
                        <Col md={3} key={movie.id} className="mb-5">
                          <MovieCard
                            movieData={movie}
                            favoriteMovie={favoriteMovie}
                            user={user}
                            storedToken={storedToken}
                            favoriteMovieList={favoriteMovieList}
                            setFavoriteMovieList={setFavoriteMovieList}
                          />
                        </Col>
                      );
                    })}
                  </>
                )}
              </>
            }
          />
          {/* allow existing users to see their user profile  */}
          <Route
            path="/users"
            element={
              <>
                {storedUser ? (
                  <Col>
                    <ProfileView
                      storedUser={storedUser}
                      user={user}
                      storedToken={storedToken}
                      token={token}
                      favoriteMovie={favoriteMovie}
                      movieData={movies}
                    />
                  </Col>
                ) : (
                  <Navigate to="/login" replace />
                )}
              </>
            }
          />
          {/* allow users to make changes to their account settings  */}
          <Route
            path="/users/settings"
            element={
              <>
                {storedUser ? (
                  <Col>
                    <ProfileSettings storedUser={storedUser} />
                  </Col>
                ) : (
                  <Navigate to="/login" replace />
                )}
              </>
            }
          />
          <Route
            path="/upload"
            element={
              <>
                {storedUser ? (
                  <Col>
                    <MovieForm />
                  </Col>
                ) : (
                  <Navigate to="/login" replace />
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
