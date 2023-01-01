import React from "react";
import { useAuth } from "../context/AuthContext";

//Components
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import SingleOffert from "../components/OffertsDisplay/SingleOffert";

const Cart = () => {
  let { cart } = useAuth();
  let subtotal = 0;
  cart.forEach((el) => (subtotal += el.price));

  return (
    <Box>
      {cart.length > 0 ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            <Card>
              <List>
                {cart.map((offert) => (
                  <ListItem key={offert._id}>
                    <SingleOffert menu={true} offert={offert} />
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  Subtotal ({cart.length}): <b>{subtotal}$</b>
                </Typography>
                <Button sx={{ mt: 2 }} fullWidth variant={"contained"}>
                  Finalize
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Card sx={{ textAlign: "center", p: 2 }}>
          <Typography variant="h5">Your cart is empty.</Typography>
        </Card>
      )}
    </Box>
  );
};

export default Cart;
