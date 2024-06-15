import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { getMovieApi } from "../../api/movie-api";
import { useEffect, useRef, useState } from "react";
import css from "../MovieDetailsPage/MovieDetailsPage.module.css";

const defaultImg =
  "<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const location = useLocation();

  const backLocation = useRef(location.state ?? "/movies");
  useEffect(() => {
    if (!movieId) return;
    const fetchData = async () => {
      try {
        const data = await getMovieApi(movieId);
        setMovie(data);
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
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : defaultImg
              }
              width={250}
              alt="poster"
            />
          </div>
          <div>
            <h2 className={css.title}>{movie.original_title}</h2>
            <p className={css.score}>User score: {movie.popularity}</p>
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
      <div className={css.additionationalInformation}>
        <p>Additionational information</p>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
