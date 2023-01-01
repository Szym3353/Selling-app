import React from "react";

//Components
import { CardContent } from "@mui/material";
import FormComponent from "../components/Forms/FormComponent";
import CardHeader from "@mui/material/CardHeader";
import { Box } from "@mui/system";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack/Stack";

//Hooks
import useSettings from "../hooks/useSettings";
import { useNavigate, useParams } from "react-router-dom";

const Settings = () => {
  let navigate = useNavigate();
  let { id } = useParams();

  let { handleForm, values, setters, data, errors } = useSettings(id || "");

  return (
    <Box>
      <Stack sx={{ mb: 2 }} alignItems={"flex-end"}>
        <Button
          sx={{ ml: "auto" }}
          variant="outlined"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Stack>
      <Card sx={{ mb: 2 }}>
        <CardHeader title="Edit account" />
        <CardContent
          component="form"
          onSubmit={(e) => handleForm(e, "/profile/account", data.accountData)}
        >
          <FormComponent
            setFormData={setters.setAccountData}
            buttonValue="Update details"
            values={values.accountValues}
            errors={errors}
          />
        </CardContent>
      </Card>
      <Card sx={{ mb: 2 }}>
        <CardHeader title="Change password" />
        <CardContent
          component="form"
          onSubmit={(e) =>
            handleForm(e, "/profile/password", data.passwordData)
          }
        >
          <FormComponent
            setFormData={setters.setPasswordData}
            buttonValue="Change password"
            values={values.passwordValues}
            errors={errors}
          />
        </CardContent>
      </Card>
      <Card sx={{ mb: 2 }}>
        <CardHeader title="Change adress e-mail" />
        <CardContent
          component="form"
          onSubmit={(e) => handleForm(e, "/profile/email", data.emailData)}
        >
          <FormComponent
            buttonValue="Change e-mail"
            values={values.emailValues}
            setFormData={setters.setEmailData}
            errors={errors}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Settings;
