import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { formValue } from "../../types/form";

import FormComponent from "./FormComponent";

type props = {
  title: string;
  action: (e: React.FormEvent) => void;
  values: formValue[];
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  navLink: { value: string; to: string };
};

const AuthForm = ({ title, values, setFormData, action, navLink }: props) => {
  return (
    <Container>
      <Card
        sx={{
          maxWidth: "450px",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CardHeader title={title} />
        <CardContent component="form" autoComplete="off" onSubmit={action}>
          <FormComponent
            values={values}
            buttonValue={title}
            setFormData={setFormData}
          />
          <Typography sx={{ mt: 1, textAlign: "center" }}>
            <Link to={navLink.to}>{navLink.value}</Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AuthForm;
