import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormComponent from "../components/Forms/FormComponent";
import LoadingComponent from "../components/LoadingComponent";
import SingleOffert from "../components/OffertsDisplay/SingleOffert";
import { useAuth } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import { formValue } from "../types/form";
import { offert } from "../types/offert";

const Buy = () => {
  let { id } = useParams();
  let { fetchData, loading } = useFetch();
  let { cart, getCart } = useAuth();
  let navigate = useNavigate();
  let [offerts, setOfferts] = React.useState<offert[]>([]);
  let [formData, setFormData] = React.useState({});

  function getTotalPrice() {
    let value = 0;
    offerts.forEach(
      (offert) =>
        (value +=
          Math.trunc(
            (offert.price -
              offert.price * ((offert?.discount?.value || 0) / 100)) *
              100
          ) / 100)
    );
    return value;
  }

  let values: formValue[] = [
    { label: "First name", value: "firstName" },
    { label: "Last name", value: "lastName" },
    { label: "Mobile number", value: "mobileNumber" },
    { label: "Contry", value: "country" },
    { label: "Street and house number", value: "adress" },
    { label: "Postal code", value: "postalCode" },
    { label: "City / Town", value: "city" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(
      "POST",
      "/offert/buy",
      (data) => {
        getCart();
        navigate("/");
      },
      {
        ...formData,
        offerts: offerts.map((el) => {
          return el._id;
        }),
      }
    );
  };

  React.useEffect(() => {
    if (id) {
      fetchData("GET", `/offert/${id}`, (data) => {
        setOfferts(() => [{ ...data }]);
      });
    } else {
      setOfferts([...cart]);
    }
  }, [cart]);

  return (
    <Box>
      {!loading ? (
        <>
          <Card sx={{ mb: 2 }}>
            <CardHeader
              title="Buy product"
              action={
                <Button onClick={() => navigate("..")} variant="outlined">
                  Back
                </Button>
              }
            />
            <CardContent>
              {!id && cart.length < 1 ? (
                <Typography>Your cart is empty, add something.</Typography>
              ) : (
                <List>
                  {offerts.map((offert) => (
                    <ListItem key={offert._id}>
                      <SingleOffert offert={offert} menu={id ? false : true} />
                    </ListItem>
                  ))}
                </List>
              )}
              <Divider />
              <Typography variant="h5">Total: {getTotalPrice()} $</Typography>
            </CardContent>
          </Card>
          {offerts.length > 0 && (
            <Card>
              <CardHeader title="Recipient's and delivery details" />
              <CardContent component="form" onSubmit={(e) => handleSubmit(e)}>
                <FormComponent
                  values={values}
                  buttonValue="Finalize"
                  setFormData={setFormData}
                />
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <LoadingComponent />
      )}
    </Box>
  );
};

export default Buy;
