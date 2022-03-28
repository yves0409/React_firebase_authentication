import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router";
import { useSelector } from "react-redux";
import RedirectLoading from "./RedirectLoading";
import Dashboard from "../../screens/admin/Dashboard";
import { activeAdmin } from "../../functionHelpers/auth";

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      activeAdmin(user.token)
        .then((res) => {
          console.log("Current usser", res);
          setOk(true);
        })
        .catch((err) => {
          console.log("admin error:", err);
          setOk(false);
        });
    }
  });

  //ADMINROUTES
  return ok ? (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  ) : (
    <RedirectLoading />
  );
};

export default AdminRoute;
