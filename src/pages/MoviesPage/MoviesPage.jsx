import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMovieByQuery } from "../../services/movies-api";
import s from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    const getData = async () => {
      const data = await fetchMovieByQuery(query);
      setMovies(data);
    };
    getData();
  }, [query]);

  const handleChangeQuery = (newQuery) => {
    if (!newQuery) {
      return setSearchParams({});
    }
    searchParams.set("query", newQuery);
    setSearchParams(searchParams);
  };

  const initialValues = {
    query: "",
  };

  const handleSubmit = (values) => {
    handleChangeQuery(values.query);
    values.query = "";
  };

  const filteredMovies = useMemo(
    () =>
      movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      ),
    [query, movies]
  );

  return (
    <>
      <div className={s.search}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className={s.searchForm}>
            <Field
              name="query"
              placeholder="Search movies..."
              required
              className={s.searchField}
            />
            <button type="submit" className={s.searchBtn}>
              Search
            </button>
          </Form>
        </Formik>
      </div>
      <div className={s.results}>
        <MovieList movies={filteredMovies} />
      </div>
    </>
  );
}
