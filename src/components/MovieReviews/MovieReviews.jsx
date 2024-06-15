import { useEffect, useState } from "react";
import { getMovieReviewsApi } from "../../api/movieReviews-api";
import { useParams } from "react-router-dom";
import css from "../MovieReviews/MovieReviews.module.css";

const MovieReviews = () => {
  const [reviews, setReviews] = useState(null);
  const { movieId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMovieReviewsApi(movieId);
        setReviews(data.results[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [movieId]);
  return (
    <div className={css.reviewsInformation}>
      {reviews && (
        <div>
          <p className={css.author}>{reviews.author}</p>
          <p>{reviews.content}</p>
        </div>
      )}
    </div>
  );
};

export default MovieReviews;
