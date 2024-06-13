import { Link, useLocation, useParams } from "react-router-dom";
import { getMovieApi } from "../../api/movie-api";
import { useEffect, useRef, useState } from "react";
import css from "../MovieDetailsPage/MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const location = useLocation();

  const backLocation = useRef(location.state ?? "/");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMovieApi(movieId);
        setMovie(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [movieId]);

  return (
    <div>
      <Link className={css.btnBack} to={backLocation.current}>
        Go back
      </Link>
      {movie && (
        <div className={css.mainInformation}>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.original_title}
            />
          </div>
          <div>
            <h2 className={css.title}>{movie.original_title}</h2>
            <p className={css.score}>
              User score: {Math.round(movie.popularity)}%
            </p>
            <p className={css.overview}>Overview</p>
            <p className={css.overviewText}>{movie.overview}</p>
            <p className={css.genres}>Genres</p>
            {movie.genres.map((el, idx) => (
              <span key={idx} className={css.genre}>
                {el.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
