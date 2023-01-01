import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { formValue } from "../types/form";
import useFetch from "./useFetch";

export default function useSettings(userId: string) {
  let { currentUser, logout } = useAuth();
  let navigate = useNavigate();

  let { fetchData, errors } = useFetch();

  React.useEffect(() => {
    if (currentUser?.id !== userId) {
      navigate("/");
    }
  }, []);

  let [accountData, setAccountData] = React.useState({ accountName: "" });

  let accountValues: formValue[] = [
    { label: "Change account name", value: "accountName", type: "text" },
  ];

  let [emailData, setEmailData] = React.useState({
    newEmail: "",
    password: "",
  });

  let emailValues: formValue[] = [
    { label: "New adress e-mail", value: "newEmail", type: "email" },
    { label: "Password", value: "password", type: "password" },
  ];

  let [passwordData, setPasswordData] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  let passwordValues: formValue[] = [
    { label: "Current password", value: "oldPassword", type: "password" },
    { label: "New password", value: "newPassword", type: "password" },
    {
      label: "Confirm new password",
      value: "confirmNewPassword",
      type: "password",
    },
  ];

  function handleForm(e: React.FormEvent, url: string, data: any) {
    e.preventDefault();
    fetchData(
      "POST",
      url,
      () => {
        logout();
      },
      data
    );
  }

  return {
    handleForm,
    values: { passwordValues, emailValues, accountValues },
    setters: { setPasswordData, setEmailData, setAccountData },
    data: { passwordData, emailData, accountData },
    errors,
  };
}
