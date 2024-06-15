import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCreditsApi } from "../../api/movieCredits-api";
import css from "../MovieCast/MovieCast.module.css";

const defaultImg =
  "<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>";

const MovieCast = () => {
  const [actors, setActors] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMovieCreditsApi(movieId);
        setActors(data.cast);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [movieId]);
  return (
    <div>
      {actors.length > 0 && (
        <ul className={css.list}>
          {actors.map((actor, index) => (
            <li key={index}>
              <div>
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                      : defaultImg
                  }
                  alt="poster"
                  width={100}
                />
                <p>{actor.original_name}</p>
                <p>Character: {actor.character}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
