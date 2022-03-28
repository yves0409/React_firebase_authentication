import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MDBInput } from "mdbreact";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { createUser } from "../../functionHelpers/auth";

import { useDispatch, useSelector } from "react-redux";

const RegistrationCompleted = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      navigate("/");
    }
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  //COMPLETING THE REGISTRATION
  const handleSubmit = async (e) => {
    e.preventDefault();
    //BASIC VALIDATION
    if (!email || !password) {
      toast.error("Email and Password is required");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    //GRABBING THE TOKEN FROM THE URL
    const url = window.location.href;
    try {
      const result = await auth.signInWithEmailLink(email, url);

      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForRegistration");
        //TOKEN
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user, "idToken", idTokenResult);
        //POPULATING THE REDUX STORE
        createUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER_REQUEST",
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

        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //FORM
  const registrationCompletedForm = () => (
    <form onSubmit={handleSubmit}>
      <MDBInput type="email" className="form-control" value={email} disabled />
      <MDBInput
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
      />
      <br />

      <button type="submit" className="btn btn-raised">
        Click to Complete
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Complete registration</h4>

          {registrationCompletedForm()}
        </div>
      </div>
    </div>
  );
};

export default RegistrationCompleted;
