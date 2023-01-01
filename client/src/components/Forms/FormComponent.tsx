import { TextField, InputAdornment, IconButton, Button } from "@mui/material";
import React from "react";
import { formValue } from "../../types/form";
import { error } from "../../types/error";

//Icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import User from "@mui/icons-material/Person";

type props = {
  values: formValue[];
  buttonValue: string;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  errors?: error | null;
};

const FormComponent = ({ values, buttonValue, setFormData, errors }: props) => {
  const [showPasswords, setShowPasswords] = React.useState(false);
  return (
    <>
      {values.map((value, index) => (
        <TextField
          key={index}
          sx={{ mb: 2 }}
          type={
            value.type === "password"
              ? showPasswords
                ? "text"
                : "password"
              : value.type || "text"
          }
          label={value.label}
          fullWidth
          error={errors && errors.inputErrors[value.value] ? true : false}
          helperText={errors && errors.inputErrors[value.value]}
          size={"small"}
          onChange={(e) =>
            setFormData((prev: any) => ({
              ...prev,
              [value.value]: e.target.value,
            }))
          }
          InputProps={{
            endAdornment: (
              <InputAdornment
                sx={{
                  width: "50px",
                  display: "flex",
                  justifyContent: "center",
                }}
                position="end"
              >
                {value.type === "password" ? (
                  <IconButton onClick={() => setShowPasswords((prev) => !prev)}>
                    {showPasswords ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ) : (
                  <User />
                )}
              </InputAdornment>
            ),
          }}
        />
      ))}
      <Button type={"submit"} fullWidth variant={"contained"}>
        {buttonValue}
      </Button>
    </>
  );
};

export default FormComponent;
