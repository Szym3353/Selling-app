import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import { offert } from "../types/offert";

//Components
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import LoadingComponent from "../components/LoadingComponent";
import PhotoDisplay from "../components/OffertsDisplay/PhotoDisplay";
import EditDiscount from "../components/OffertsDisplay/EditDiscount";
import { Stack } from "@mui/system";

const Offert = () => {
  let { id } = useParams();
  let { cart, toggleCart, currentUser } = useAuth();
  let { fetchData, loading } = useFetch();
  let [offertData, setOffertData] = React.useState<offert>();
  let navigate = useNavigate();

  useEffect(() => {
    fetchData("GET", `/offert/${id}`, (data) => {
      if (data) {
        setOffertData(data);
      }
    });
  }, []);

  return !loading && offertData ? (
    <Box>
      <Card sx={{ p: 2 }}>
        <CardHeader
          title={offertData.title}
          action={
            <Stack direction={"row"} spacing={2}>
              <Button variant="contained" onClick={() => navigate(`./edit`)}>
                Edit
              </Button>
              <Button variant="outlined" onClick={() => navigate(-1)}>
                Back
              </Button>
            </Stack>
          }
        />
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} sx={{ position: "relative" }}>
              <PhotoDisplay photos={offertData.photos} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ mb: 1 }}>
                Informations
              </Typography>

              <Typography>
                Author:{" "}
                <Link to={`/profile/${offertData.author.id}`}>
                  {offertData.author.username}
                </Link>
              </Typography>
              {offertData.discount && (
                <Box
                  sx={{
                    mt: 2,
                    display: `${
                      offertData.discount.value > 0 ? "block" : "none"
                    }`,
                  }}
                >
                  <Stack direction="row" spacing={2}>
                    <Typography
                      style={{
                        color: "white",
                        padding: 1,
                        backgroundColor: "green",
                      }}
                    >
                      -{offertData.discount.value}%
                    </Typography>
                    <Typography sx={{ textDecoration: "line-through" }}>
                      {offertData.price}$
                    </Typography>
                  </Stack>
                </Box>
              )}
              <Typography sx={{ fontWeight: "700", mb: 3 }} variant="h6">
                Price:{" "}
                {Math.trunc(
                  (offertData.price -
                    offertData.price *
                      ((offertData?.discount?.value || 0) / 100)) *
                    100
                ) / 100}
                $
              </Typography>
              <EditDiscount
                price={offertData.price}
                showButton={currentUser?.id === id}
                callback={(discount) =>
                  setOffertData((prev) => ({ ...prev!, discount }))
                }
              />
              <Typography sx={{ fontWeight: "700" }}>
                Description: <br />
              </Typography>

              <Typography>{offertData.description}</Typography>
              <Typography sx={{ fontWeight: "700", mt: 3 }}>
                Bought: {offertData.bought} from{" "}
                {offertData.inStock - offertData.bought} left
              </Typography>
              <Button sx={{ mt: 4, mb: 1 }} fullWidth variant="contained">
                Buy now
              </Button>
              <Button
                onClick={() => toggleCart(id || "")}
                variant="contained"
                fullWidth
                color="secondary"
              >
                {cart.some((el) => el._id === id)
                  ? "Remove from cart"
                  : "Add to cart"}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  ) : (
    <LoadingComponent />
  );
};

export default Offert;
