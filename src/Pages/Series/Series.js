import React, { useEffect, useState } from "react";
import Genres from "../../components/Genres/Genres";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import { useGenre } from "../../hooks/useGenre";
import { api_key, axiosInstance } from "../../requests/requests";

const Series = () => {
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genresForURL = useGenre(selectedGenres);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/discover/tv?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genresForURL}`
        );
        setSeries(data.results);
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
      <span className="pageTitle">TV Series</span>
      <Genres
        type="tv"
        genres={genres}
        setGenres={setGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPage}
      />
      <div className="movies">
        {series &&
          series.map((s) => (
            <SingleContent
              key={s.id}
              id={s.id}
              poster={s.poster_path}
              title={s.title || s.name}
              date={s.release_date || s.first_air_date}
              media_type="tv"
              vote_average={s.vote_average}
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

export default Series;
