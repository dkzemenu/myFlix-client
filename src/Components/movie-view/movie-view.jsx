import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export const MovieView = ({movieData}) => {
    const { movieId } = useParams();
    const movie = movieData.find((m) => m._id === movieId) || {};
    console.log(movieId);
    return (
        <div>
            <div>
                <img className='w-100' src ={movie.image} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title} </span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.description} </span>
            </div>
            <Link to={`/`} >
                <button className="back-button">Back</button>
            </Link>
        </div>
    )
}