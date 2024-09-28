import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../services/movies-api";
import s from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchReviews(movieId);
      setReviews(data);
    };
    getData();
  }, [movieId]);

  if (!reviews.length)
    return <p className={s.empty}>Noone left a review yet...</p>;

  return (
    <ul className={s.list}>
      {reviews.map((review) => (
        <li key={review.id} className={s.card}>
          <p className={s.title}>{review.author}</p>
          <p className={s.text}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}
