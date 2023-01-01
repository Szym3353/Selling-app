import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";

//Pages components
import Cart from "../../pages/Cart";
import HomePage from "../../pages/HomePage";
import Login from "../../pages/Login";
import Offert from "../../pages/Offert";
import Profile from "../../pages/Profile";
import Register from "../../pages/Register";
import SearchResult from "../../pages/SearchResult";
import Settings from "../../pages/Settings";
import OffertForm from "../CreateOffert/OffertForm";
import Buy from "../../pages/Buy";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/search/:page/:category">
          <Route index element={<SearchResult />} />
          <Route path=":query" element={<SearchResult />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile/:id">
          <Route index element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/create" element={<OffertForm />} />
        <Route path="/offert/:id">
          <Route index element={<Offert />} />
          <Route path="edit" element={<OffertForm />} />
        </Route>
        <Route path="/buy">
          <Route path=":id" element={<Buy />} />
          <Route index element={<Buy />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RoutesComponent;
