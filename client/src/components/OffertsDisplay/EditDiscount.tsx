import { Clear } from "@mui/icons-material";
import {
  Button,
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { discount } from "../../types/offert";

const EditDiscount = ({
  showButton,
  price,
  callback,
}: {
  showButton: boolean;
  price: number;
  callback: (arg: discount) => void;
}) => {
  let { fetchData } = useFetch();
  let { id } = useParams();
  let [percentageValue, setPercentageValue] = React.useState<number>(0);
  let [showAddDiscount, setShowAddDiscount] = React.useState<boolean>(false);
  let [discountExpireDate, setDiscountExpireDate] = React.useState<string>("");

  function setDiscount(value: number) {
    fetchData(
      "POST",
      "/offert/discount",
      (data) => {
        setShowAddDiscount(false);
        callback(data);
      },
      {
        id,
        value,
        expire: discountExpireDate,
      }
    );
  }

  return (
    <>
      <Button
        onClick={() => setShowAddDiscount((prev) => !prev)}
        size="small"
        sx={{
          mb: 2,
          display: `${showButton} ? 'block' : 'none'`,
        }}
        variant="contained"
      >
        Edit discount
      </Button>
      <Card
        sx={{
          zIndex: "100",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: `${showAddDiscount ? "block" : "none"}`,
          boxShadow: "1px 1px 6px rgba(0,0,0,0.4)",
        }}
      >
        <CardHeader
          title="Edit discount"
          action={
            <IconButton onClick={() => setShowAddDiscount(false)}>
              <Clear />
            </IconButton>
          }
        />
        <CardContent component="form">
          <Stack direction="row" alignItems={"center"} spacing={1}>
            <TextField
              size="small"
              label="Percentage value"
              type="number"
              fullWidth
              value={percentageValue}
              InputProps={{ inputProps: { min: 0, max: 100 } }}
              onChange={(e) => setPercentageValue(parseInt(e.target.value))}
            />{" "}
            <span>%</span>
          </Stack>
          <Typography sx={{ mt: 1 }}>
            Price with discount:{" "}
            <b>
              {Math.trunc((price - price * (percentageValue / 100)) * 100) /
                100}{" "}
              $
            </b>
          </Typography>
          <TextField
            type="datetime-local"
            value={discountExpireDate}
            onChange={(e) => setDiscountExpireDate(e.target.value)}
            label="Expire date"
            sx={{ my: 2 }}
            fullWidth
          />
          <Button
            onClick={() => setDiscount(percentageValue)}
            sx={{ mb: 1 }}
            variant="contained"
            size="small"
            fullWidth
          >
            Set discount
          </Button>
          <Button
            onClick={() => setDiscount(0)}
            variant="contained"
            color="secondary"
            size="small"
            fullWidth
          >
            Clear discount
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default EditDiscount;
