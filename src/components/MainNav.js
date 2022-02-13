import { useEffect, useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const BottomNavStyles = {
  width: "100%",
  position: "fixed",
  bottom: 0,
  backgroundColor: "#2d313a",
  zIndex: 100,
};

export const SimpleBottomNavigation = () => {
  const [value, setValue] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    switch (value) {
      case 1:
        navigate("/movies");
        break;
      case 2:
        navigate("/series");
        break;
      case 3:
        navigate("/search");
        break;
      default:
        navigate("/");
        break;
    }
  }, [value]);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      sx={BottomNavStyles}
    >
      <BottomNavigationAction
        style={{ color: "#fff" }}
        label="Trending"
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction
        style={{ color: "#fff" }}
        label="Movies"
        icon={<MovieIcon />}
      />
      <BottomNavigationAction
        style={{ color: "#fff" }}
        label="Tv Series"
        icon={<TvIcon />}
      />
      <BottomNavigationAction
        style={{ color: "#fff" }}
        label="Search"
        icon={<SearchIcon />}
      />
    </BottomNavigation>
  );
};
