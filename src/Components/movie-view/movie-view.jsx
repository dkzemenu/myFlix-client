export const MovieView = ({movieData, onBackClick}) => {
    return (
        <div>
            <div>
                <span>Title: </span>
                <span>{movieData.title} </span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movieData.description} </span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    )
}