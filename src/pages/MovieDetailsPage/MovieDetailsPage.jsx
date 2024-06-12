import { Link, useLocation, useParams } from "react-router-dom";
import { getMovieApi } from "../../api/movie-api";
import { useEffect, useRef, useState } from "react";

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
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [movieId]);

  return (
    <div>
      <Link to={backLocation.current}>Go back</Link>
      {movie && (
        <div>
          <h2>{movie.original_title}</h2>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
