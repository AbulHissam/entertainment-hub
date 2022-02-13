import React, { useEffect, useState } from "react";
import { axiosInstance, api_key } from "../../requests/requests";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";

const Trending = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/trending/all/day?api_key=${api_key}&page=${page}`
        );
        setContent(data.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTrending();
    window.scroll(0, 0);
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.release_date || c.first_air_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Trending;
