import React from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { offert } from "../types/offert";

type login = {
  email: string;
  password: string;
};

type register = {
  username: string;
  confirmPassword: string;
} & login;

type valuesType = {
  login: (args: login) => void;
  register: (args: register) => void;
  currentUser: { username: string; id: string } | undefined;
  logout: () => void;
  cart: offert[];
  toggleCart: (arg: string) => void;
  getCart: () => void;
};

let AuthContext = React.createContext<valuesType>({} as valuesType);

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let navigate = useNavigate();
  let { fetchData } = useFetch();
  let [currentUser, setCurrentUser] = React.useState(() => {
    if (!Cookies.get("token")) return;
    let decoded: any = jwt_decode(Cookies.get("token")!);
    return { id: decoded.id, username: decoded.username };
  });

  //USER CART
  let [cart, setCart] = React.useState<offert[]>([]);

  React.useEffect(() => {
    if (currentUser) {
      getCart();
    }
  }, [currentUser]);

  function getCart() {
    fetchData("GET", "/profile/cart", (data) => {
      setCart(data);
    });
  }
  function toggleCart(id: string) {
    fetchData("POST", "/profile/cart/update", (data) => setCart(data), { id });
  }

  //Auth
  function setCookie(data: { token: string }) {
    let decoded: any = jwt_decode(data.token);
    document.cookie = `token=${data.token}; expires=${new Date(
      new Date().getTime() + 1000 * 24 * 60 * 60
    ).toUTCString()}`;
    setCurrentUser({ id: decoded.id, username: decoded.username });
    navigate("/");
  }

  function login(formData: login) {
    fetchData(
      "POST",
      "/auth/login",
      (data) => {
        if (data.token) {
          setCookie(data);
          navigate("/");
        }
      },
      formData
    );
  }

  function register(formData: register) {
    fetchData(
      "POST",
      "/auth/register",
      (data) => {
        if (data.token) {
          setCookie(data);
          navigate("/");
        }
      },
      formData
    );
  }

  function logout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    navigate("/login");
    setCurrentUser(undefined);
  }

  let values = {
    login,
    register,
    currentUser,
    logout,
    cart,
    toggleCart,
    getCart,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
