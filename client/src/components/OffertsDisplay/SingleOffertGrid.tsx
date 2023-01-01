import React from "react";
import { useNavigate } from "react-router-dom";
import { offert } from "../../types/offert";

//Components
import { Grid, Card, CardMedia, Box, Typography, Stack } from "@mui/material";

const SingleOffertGrid = ({ offert }: { offert: offert }) => {
  let navigate = useNavigate();

  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card
        sx={{ cursor: "pointer" }}
        onClick={() => navigate(`/offert/${offert._id}`)}
      >
        <CardMedia
          component="img"
          height="194"
          image={offert.photos[0].dataURL}
        />
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1">{offert.title}</Typography>
          <Stack direction="row" spacing={2}>
            <Typography color="primary">
              {Math.trunc(
                (offert.price -
                  offert.price * ((offert?.discount?.value || 0) / 100)) *
                  100
              ) / 100}{" "}
              $
            </Typography>
            {offert.discount && (
              <>
                <Box
                  sx={{
                    mt: 2,
                    display: `${offert.discount.value > 0 ? "block" : "none"}`,
                  }}
                >
                  <Stack direction="row" spacing={2}>
                    <Typography
                      variant={"caption"}
                      style={{
                        color: "white",
                        padding: 1,
                        backgroundColor: "green",
                      }}
                    >
                      -{offert.discount.value}%
                    </Typography>
                    <Typography
                      variant={"caption"}
                      sx={{ textDecoration: "line-through" }}
                    >
                      {offert.price}$
                    </Typography>
                  </Stack>
                </Box>
              </>
            )}
          </Stack>
        </Box>
      </Card>
    </Grid>
  );
};

export default SingleOffertGrid;
