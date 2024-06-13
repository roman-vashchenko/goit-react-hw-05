import { useEffect, useState } from "react";
import { searchMoviesApi } from "../../api/searchMovies-api";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import css from "../MoviesPage/MoviesPage.module.css";

const MoviesPage = () => {
  const [value, setValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await searchMoviesApi(params.get("query"));
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    params.get("query") && fetchData();
  }, [params]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const hendleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === "") return;
    params.set("query", value);
    setParams(params);
    setValue("");
  };
  return (
    <div>
      <form className={css.form} onSubmit={hendleSubmit}>
        <input type="text" name="query" onChange={handleChange} value={value} />
        <button type="submit">Search</button>
      </form>
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
