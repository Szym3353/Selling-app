import React from "react";
import { categories } from "../categories";
import { offert } from "../types/offert";

//Hooks
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

//Components
import Search from "../components/HomePage/Search";
import OffertsGrid from "../components/OffertsDisplay/OffertsGrid";
import { Box, MenuItem, TextField } from "@mui/material";

const SearchResult = () => {
  let { page, category, query } = useParams();
  let { fetchData, loading } = useFetch();
  let navigate = useNavigate();

  let [maxNumberOfPages, setMaxNumberOfPages] = React.useState(0);
  let [offerts, setOfferts] = React.useState<offert[]>([]);

  React.useEffect(() => {
    fetchData(
      "GET",
      `/offert/list/${page}/${category}/${query ? query : ""}`,
      (data) => {
        setOfferts(data.offerts);
        setMaxNumberOfPages(data.maxNumberOfPages);
      }
    );
  }, [page, category, query]);

  return (
    <Box>
      <Search callback={(data) => navigate(`/search/1/${category}/${data}`)} />
      <TextField
        select
        sx={{ width: "300px" }}
        label="Category"
        value={category}
        onChange={(e) =>
          navigate(`/search/1/${e.target.value}${query ? `/${query}` : ""}`)
        }
      >
        <MenuItem value="All">All</MenuItem>
        {categories.map((category, index) => (
          <MenuItem key={index} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>
      <OffertsGrid
        loading={loading}
        offerts={offerts}
        max={maxNumberOfPages}
        page={parseInt(page || "1")}
        callback={(data) =>
          navigate(`/search/${data}/${category}${query ? `/${query}` : ""}`)
        }
      />
    </Box>
  );
};

export default SearchResult;
