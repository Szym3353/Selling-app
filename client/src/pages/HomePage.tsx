import React from "react";
import { categories } from "../categories";
import { offert } from "../types/offert";

//Hooks
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

//Components
import OffertsGrid from "../components/OffertsDisplay/OffertsGrid";
import Search from "../components/HomePage/Search";
import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import { Box } from "@mui/system";

const HomePage = () => {
  let navigate = useNavigate();
  let { fetchData, loading } = useFetch();

  let [newestOfferts, setNewestOfferts] = React.useState<offert[]>([]);
  let [page, setPage] = React.useState(1);
  let [maxPages, setMaxPages] = React.useState(0);

  let searchOfferts = (searchValue: string) => {
    navigate(`/search/1/All/${encodeURIComponent(searchValue)}`);
  };

  React.useEffect(() => {
    fetchData("GET", `/offert/list/${page}/All`, (data) => {
      setNewestOfferts(data.offerts);
      setMaxPages(data.maxNumberOfPages);
    });
  }, [page]);

  return (
    <Box>
      <Card>
        <CardHeader title={"Main categories"} />
        <CardContent>
          <Grid container spacing={2}>
            {categories.map((category) => (
              <Grid item xs={4} sm={3} md={2} key={category}>
                <Button
                  onClick={() => navigate(`/search/1/${category}`)}
                  variant="outlined"
                  fullWidth
                  sx={{ height: "100px" }}
                  color={"secondary"}
                >
                  {category}
                </Button>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      <Search
        callback={(data) => {
          searchOfferts(data);
        }}
      />
      <Card>
        <CardHeader title="Newest offerts" />
        <CardContent>
          <OffertsGrid
            loading={loading}
            offerts={newestOfferts}
            page={page}
            callback={(data) => setPage(data)}
            max={maxPages}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default HomePage;
