import { Card, CircularProgress } from "@mui/material";
import CardContent from "@mui/material/CardContent/CardContent";
import React from "react";

const LoadingComponent = ({ absolute }: { absolute?: boolean }) => {
  return (
    <Card
      sx={{
        p: 4,
        mx: "auto",
        height: "100px",
        width: "100px",
        position: `${absolute ? "absolute" : "static"}`,
        left: "50%",
        top: "50%",
        transform: `${absolute ? "translate(-50%, -50%)" : ""}`,
      }}
    >
      <CardContent
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress size={"70px"} />
      </CardContent>
    </Card>
  );
};

export default LoadingComponent;
