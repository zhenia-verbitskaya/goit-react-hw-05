import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCast } from "../../services/movies-api";
import { baseImgUrl } from "../../App";
import s from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCast(movieId);
      setCasts(data);
    };
    getData();
  }, [movieId]);

  if (!casts.length)
    return <p className={s.empty}>The cast is not mentioned...</p>;

  return (
    <ul className={s.list}>
      {casts.map((cast) => (
        <li key={cast.id} className={s.card}>
          <img
            src={
              cast.profile_path
                ? `${baseImgUrl}${cast.profile_path}`
                : "https://placehold.co/200x300/0A2351/6699CC.jpg?text=Image+Not+Found"
            }
            alt={cast.name}
          />
          <div className={s.description}>
            <h3>{cast.name}</h3>
            <p>Role: {cast.character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
