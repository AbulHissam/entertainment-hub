import React, { useEffect, useState } from "react";
import "./Search.css";
import { Button, Tab, Tabs, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { axiosInstance, api_key } from "../../requests/requests";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";

const darkTheme = createTheme({
  palette: { mode: "dark" },
});

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [searched, setSearched] = useState(false);

  const searchContent = async () => {
    try {
      if (searchText) {
        const { data } = await axiosInstance.get(
          `search/${
            tabValue ? "tv" : "movie"
          }?api_key=${api_key}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
        );
        setContent(data.results);
        setNumOfPages(data.total_pages);
        setSearched(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    searchContent();
  }, [tabValue, page]);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="search">
        <TextField
          variant="filled"
          onChange={(e) => setSearchText(e.target.value)}
          style={{ flex: 1 }}
          className="searchBox"
        />
        <Button
          variant="contained"
          onClick={searchContent}
          style={{ marginLeft: "10px" }}
        >
          <SearchIcon />
        </Button>
      </div>

      <Tabs
        value={tabValue}
        indicatorColor="primary"
        textColor="primary"
        onChange={(event, newValue) => {
          setTabValue(newValue);
          setPage(1);
        }}
      >
        <Tab label="Search Movies" style={{ width: "50%" }} />
        <Tab label="Search Tv Series" style={{ width: "50%" }} />
      </Tabs>

      <div className="movies">
        {content &&
          content.map((m) => (
            <SingleContent
              key={m.id}
              id={m.id}
              poster={m.poster_path}
              title={m.title || m.name}
              date={m.release_date || m.first_air_date}
              media_type={tabValue ? "tv" : "movie"}
              vote_average={m.vote_average}
            />
          ))}
        {searched &&
          content.length === 0 &&
          (tabValue ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </ThemeProvider>
  );
};

export default Search;
