import React, { useState, useEffect } from "react";
import { MDBInput } from "mdbreact";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  let navigate = useNavigate();

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) navigate("/");
  }, [user]);

  //FIREBASE CONFIGURATION WHERE WI WILL SEND THE EMAIL CONFIRMATION LINK
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIR_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration.`
    );
    //SAVE USER IN LOCAL STORAGE
    window.localStorage.setItem("emailForRegistration", email);
    setEmail("");
  };

  //FORM
  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <MDBInput
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
        autoFocus
      />
      <br />

      <button type="submit" className="btn btn-raised">
        Register / {email}
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>

          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
