import { Grid, Pagination } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { offert } from "../../types/offert";
import LoadingComponent from "../LoadingComponent";
import SingleOffertGrid from "./SingleOffertGrid";

type props = {
  loading: boolean;
  offerts: offert[];
  page: number;
  max: number;
  callback: (arg: number) => void;
};

const OffertsGrid = ({ loading, offerts, page, max, callback }: props) => {
  return (
    <Grid
      sx={{ mt: 4, position: "relative", minHeight: "300px" }}
      container
      spacing={2}
    >
      {!loading ? (
        offerts.length > 0 ? (
          <>
            {offerts.map((offert) => (
              <SingleOffertGrid key={offert._id} offert={offert} />
            ))}
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center", mt: 3 }}
            ></Grid>
          </>
        ) : (
          <Typography
            sx={{ textAlign: "center", width: "100%", mb: 5 }}
            variant="h5"
          >
            Nothing found
          </Typography>
        )
      ) : (
        <LoadingComponent />
      )}
      <Pagination
        color={"primary"}
        page={page}
        count={max}
        onChange={(e, value: number) => callback(value)}
        sx={{
          mt: 4,
          mb: 1,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      />
    </Grid>
  );
};

export default OffertsGrid;
