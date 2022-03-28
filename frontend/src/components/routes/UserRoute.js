import React from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router";
import { useSelector } from "react-redux";
import RedirectLoading from "./RedirectLoading";
import Dashboard from "../../screens/user/Dashboard";
import Password from "../../screens/user/Password";
import Favourites from "../../screens/user/Favourites";

const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  //CURRENT USER ROUTES
  return user && user.token ? (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="password" element={<Password />} />
      <Route path="favourites" element={<Favourites />} />
    </Routes>
  ) : (
    <RedirectLoading />
  );
};

export default UserRoute;
