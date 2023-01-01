import React, { useState } from "react";
import AuthForm from "../components/Forms/AuthForm";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  let values = [
    {
      label: "Email",
      value: "email",
      type: "email",
    },
    {
      label: "Password",
      value: "password",
      type: "password",
    },
  ];

  let navLink = {
    value: "Don't have an account yet? Register.",
    to: "/register",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <AuthForm
      title="Login"
      values={values}
      navLink={navLink}
      action={handleSubmit}
      setFormData={setFormData}
    />
  );
};

export default Login;
