import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
//SCREEN IMPORTS
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import HomePage from "./screens/HomePage";
import RegistrationCompleted from "./screens/auth/RegistrationCompleted";
import FgPassword from "./screens/auth/FgPassword";
//COMPONENT IMPORTS
import Header from "./components/navigation/Header";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
//HELPER IMPORTS
import { activeUser } from "./functionHelpers/auth";

const App = () => {
  const dispatch = useDispatch();

  //LOGIN FIREBASE REDUX
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);
        //HELPER FUNCTION TO KEEP THE ACTIVE USER LOGGED IN ON REFRESH
        activeUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/forgotpassword" element={<FgPassword />} />
        {/* ACTIVE USER PROTECTED ROUTES */}
        <Route path="/user/*" element={<UserRoute />} />
        {/* ADMIN PROTECTED ROUTES */}
        <Route path="/admin/*" element={<AdminRoute />} />

        <Route
          exact
          path="/register/complete"
          element={<RegistrationCompleted />}
        />
      </Routes>
    </>
  );
};

export default App;
