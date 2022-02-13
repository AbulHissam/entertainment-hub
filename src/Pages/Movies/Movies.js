import React, { useEffect, useState } from "react";
import Genres from "../../components/Genres/Genres";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import { useGenre } from "../../hooks/useGenre";
import { axiosInstance, api_key } from "../../requests/requests";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genresForURL = useGenre(selectedGenres);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genresForURL}`
        );
        setMovies(data.results);
        setNumOfPages(data.total_pages);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMovies();
    window.scroll(0, 0);
  }, [page, genresForURL]);

  return (
    <div>
      <span className="pageTitle">Discover Movies</span>
      <Genres
        type="movie"
        genres={genres}
        setGenres={setGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPage}
      />
      <div className="movies">
        {movies &&
          movies.map((m) => (
            <SingleContent
              key={m.id}
              id={m.id}
              poster={m.poster_path}
              title={m.title || m.name}
              date={m.release_date || m.first_air_date}
              media_type="movie"
              vote_average={m.vote_average}
            />
          ))}
      </div>
      <CustomPagination
        setPage={setPage}
        numOfPages={numOfPages > 500 ? 500 : numOfPages}
      />
    </div>
  );
};

export default Movies;
