import React, { useState } from "react";
import Dashboardnav from "../../components/navigation/Dashboardnav";
import { MDBInput } from "mdbreact";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("Password has been reset");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const resetPassword = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <MDBInput
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Enter new password"
          disabled={loading}
          value={password}
        />
        <button
          className="btn btn-primary"
          disabled={!password || password.length < 8 || loading}
        >
          Submit
        </button>
      </div>
    </form>
  );
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <Dashboardnav />
        </div>
        <div className="col">
          {loading ? (
            <h5 className="test-danger">loading...</h5>
          ) : (
            <h5>Reset Password</h5>
          )}
          {resetPassword()}
        </div>
      </div>
    </div>
  );
};

export default Password;
