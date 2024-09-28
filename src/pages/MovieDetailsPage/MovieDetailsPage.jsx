import {
  NavLink,
  Link,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";
import { useState, useEffect, useRef, Suspense } from "react";
import { fetchMovie } from "../../services/movies-api";
import { baseImgUrl } from "../../App";
import s from "./MovieDetailsPage.module.css";
import clsx from "clsx";
import Loader from "../../components/Loader/Loader";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const goBackRef = useRef(location.state ?? "/movies");

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchMovie(movieId);
      setMovie(data);
    };
    getData();
  }, [movieId]);

  if (!movie) return <Loader />;

  return (
    <>
      <div className={s.btnBlock}>
        <Link to={goBackRef.current} className={s.backBtn}>
          Go back
        </Link>
      </div>
      <div className={s.card}>
        <img
          src={`${baseImgUrl}${movie.poster_path}`}
          alt={movie.title}
          className={s.cardImg}
        />
        <div>
          <h2 className={s.title}>{movie.title}</h2>
          <p className={s.tag}>{movie.tagline}</p>
          <p className={s.overview}>{movie.overview}</p>
          <div className={s.list}>
            <p className={s.listTitle}>Genres:</p>
            <ul>
              {movie.genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
          <p>
            <span className={s.release}>Release date:</span>
            <span>{movie.release_date}</span>
          </p>
        </div>
      </div>
      <div className={s.links}>
        <NavLink to="cast" className={buildLinkClass}>
          Cast
        </NavLink>
        <NavLink to="reviews" className={buildLinkClass}>
          Reviews
        </NavLink>
      </div>
      <div>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}
