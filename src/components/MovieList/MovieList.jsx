import css from "../MovieList/MovieList.module.css";
import { Link, useLocation } from "react-router-dom";
const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <div>
      <ul className={css.list}>
        {movies.map((movie) => (
          <li key={movie.id} className={css.item}>
            <Link to={`/movies/${movie.id}`} state={location}>
              {movie.original_title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
