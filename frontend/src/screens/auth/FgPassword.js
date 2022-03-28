import React, { useState, useEffect } from "react";
import { MDBInput } from "mdbreact";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Divider } from "antd";

const FgPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  //ACCESSING THE STATE
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) navigate("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_FG_PW_REDIR_URL,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("Go to your email");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? (
        <h4 className="text-danger">Loading...</h4>
      ) : (
        <h4>Forgot Password</h4>
      )}
      <form onSubmit={handleSubmit}>
        <MDBInput
          type="email"
          className="from-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="new email"
          autoFocus
        />
        <br />
        <button className="btn btn-raised" disabled={!email}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FgPassword;
