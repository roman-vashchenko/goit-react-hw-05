import axios from "axios";

const url = "https://api.themoviedb.org/3/trending/all/day?language=en-US";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkN2Q2NGNmZDE1ZTBlZGE3NjdmZjkzNmVlMDc5OTEzNiIsInN1YiI6IjY2NjlmODUyM2YwNjI0NzQ4YTM3ZjYzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yhh8dw1bxx3_sO_wJMo-90Z5X9L25zD2KJ7dJ3PZuGs",
  },
};

export const getMoviesApi = async () => {
  const { data } = await axios.get(url, options);
  return data;
};
