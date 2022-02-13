import { Chip } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useEffect } from "react";
import { api_key, axiosInstance } from "../../requests/requests";

const darkTheme = createTheme({
  palette: { mode: "dark" },
});

const Genres = ({
  type,
  genres,
  setGenres,
  selectedGenres,
  setSelectedGenres,
  setPage,
}) => {
  const handleAdd = (genre) => {
    //on click  add genre to selectedGenres and remove the genre from genres
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    // on delete remove the particular genre from selectedGenres and also add to genres
    setSelectedGenres(selectedGenres.filter((g) => g.id !== genre.id));
    setGenres([...genres, genre]);
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/genre/${type}/list?api_key=${api_key}&language=en-US`
        );
        setGenres(data.genres);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGenres();
    return () => {
      // While unmounting remove genres and selectedGenres
      setGenres([]);
      setSelectedGenres([]);
    };
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      <ThemeProvider theme={darkTheme}>
        {selectedGenres &&
          selectedGenres.map((genre) => {
            return (
              <Chip
                key={genre.id}
                label={genre.name}
                size="small"
                clickable
                color="info"
                style={{ margin: 2 }}
                onDelete={() => handleRemove(genre)}
              />
            );
          })}
        {genres &&
          genres.map((genre) => {
            return (
              <Chip
                key={genre.id}
                label={genre.name}
                size="small"
                clickable
                style={{ margin: 2 }}
                onClick={() => handleAdd(genre)}
              />
            );
          })}
      </ThemeProvider>
    </div>
  );
};

export default Genres;
