import { Clear } from "@mui/icons-material";
import {
  Grid,
  Typography,
  Stack,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { offert } from "../../types/offert";

const SingleOffert = ({ offert, menu }: { offert: offert; menu: boolean }) => {
  let { toggleCart } = useAuth();
  let navigate = useNavigate();

  function sliceDescription(string: string): string {
    let characterLimit = 200;
    if (string.length > characterLimit) {
      string = string.substring(0, characterLimit) + "\u2026";
    }
    return string;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <img src={offert.photos[0].dataURL} style={{ width: "100%" }} />
      </Grid>
      <Grid item xs={12} md={7}>
        <Typography variant="h5">{offert.title}</Typography>
        <Typography>
          Author:{" "}
          <Link to={`/profile/${offert.author.id}`}>
            {offert.author.username}
          </Link>
        </Typography>
        <Stack
          direction={"row"}
          sx={{ my: 2 }}
          spacing={2}
          alignItems={"center"}
        >
          <Typography>
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
        <Typography sx={{ mt: 2 }} variant="subtitle1">
          {sliceDescription(offert.description)}
        </Typography>
      </Grid>
      <Grid sx={{ display: `${menu ? "block" : "none"}` }} item xs={12} md={2}>
        <Stack alignItems={"flex-end"}>
          <IconButton onClick={() => toggleCart(offert._id)}>
            <Clear />
          </IconButton>
          <Button
            onClick={() => navigate(`/buy/${offert._id}`)}
            sx={{ mt: 2 }}
            variant={"contained"}
          >
            Buy now
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default SingleOffert;
