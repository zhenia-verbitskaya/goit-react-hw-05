import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../../services/movies-api";
import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css";

export default function HomePage() {
  const [trendMovies, setTrendMovies] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchTrendingMovies();
      setTrendMovies(data);
    };
    getData();
  }, []);

  return (
    <main className={s.main}>
      <h1 className={s.title}>Today In-Trend Movies</h1>
      <MovieList movies={trendMovies} />
    </main>
  );
}
