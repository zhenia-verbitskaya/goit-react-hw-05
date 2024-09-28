import { Link, useLocation } from "react-router-dom";
import { baseImgUrl } from "../../App";
import s from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={s.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={s.card}>
          <Link to={`/movies/${movie.id}`} state={location}>
            <div>
              <img
                src={
                  movie.poster_path
                    ? `${baseImgUrl}${movie.poster_path}`
                    : "https://placehold.co/300x450/0A2351/6699CC.jpg?text=Image+Not+Found"
                }
                alt={movie.title}
              />
              <div className={s.cardDescr}>
                <h2 className={s.cardTitle}>{movie.title}</h2>
                <p className={s.cardRate}>Rating: {movie.vote_average}</p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
