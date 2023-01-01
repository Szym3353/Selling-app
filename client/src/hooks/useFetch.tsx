import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { error } from "../types/error";

export default function useFetch() {
  let [loading, setLoading] = React.useState(false);
  let [errors, setErrors] = React.useState<error | null>();
  let navigate = useNavigate();

  function fetchData(
    method: "GET" | "POST",
    url: string,
    action: (arg: any) => void,
    body?: any
  ) {
    setErrors(null);
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}${url}`, {
      method,
      body: body ? JSON.stringify(body) : null,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        auth: `Bearer ${Cookies.get("token")}`,
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA", data);
        if (data.error) {
          setErrors(data.error);
          if (data.error.navigate) {
            navigate(data.error.navigate);
          }
        } else {
          action(data);
        }
        setLoading(false);
      })
      .catch((err: error) => {
        setLoading(false);
        setErrors(err);
      });
  }

  return { fetchData, loading, errors };
}
