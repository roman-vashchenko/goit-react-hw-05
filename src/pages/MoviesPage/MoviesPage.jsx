import { useEffect, useState } from "react";
import { searchMoviesApi } from "../../api/searchMovies-api";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [params, setParams] = useSearchParams();
  console.log(params.get("query"));

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
  }, [params.get("query")]);

  const hendleSubmit = (value) => {
    params.set("query", value);
    setParams(params);
  };
  return (
    <div>
      <SearchBar onSubmit={hendleSubmit} />
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
