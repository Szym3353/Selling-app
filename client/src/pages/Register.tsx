import React, { useState } from "react";
import AuthForm from "../components/Forms/AuthForm";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  let [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(formData);
  };

  let navLink = { value: "Already have an account? Log in", to: "/login" };

  let values = [
    { label: "Username", value: "username", type: "text" },
    { label: "Adress E-mail", value: "email", type: "email" },
    { label: "Password", value: "password", type: "password" },
    { label: "Confirm Password", value: "confirmPassword", type: "password" },
  ];

  return (
    <AuthForm
      title="Register"
      values={values}
      setFormData={setFormData}
      action={handleSubmit}
      navLink={navLink}
    />
  );
};

export default Register;
