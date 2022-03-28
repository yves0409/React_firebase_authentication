import React, { useState, useEffect } from "react";
import { MDBInput } from "mdbreact";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import {
  MailOutlined,
  GoogleOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { createUser } from "../../functionHelpers/auth";

const Login = () => {
  const [email, setEmail] = useState("yves.loeys@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();
  const navigate = useNavigate();

  //REDIRECT CURRENT USER BASED ON ROLE(admin/subscriber)
  const redirectByRole = (res) => {
    if (res.data.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/dashboard");
    }
  };

  //ACCESSING THE STATE
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) navigate("/");
  }, [user, navigate]);

  //LOGIN WITH EMAIL AND PASSWORD
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await auth.signInWithEmailAndPassword(email, password);
      console.log(res);
      const { user } = res;
      const idTokenResult = await user.getIdTokenResult();
      //Execute the request
      createUser(idTokenResult.token)
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
          redirectByRole(res);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  //LOGIN WITH GOOGLE/FIREBASE
  const googleLogin = () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (res) => {
        const { user } = res;
        const idTokenResult = await user.getIdTokenResult();

        createUser(idTokenResult.token)
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
            redirectByRole(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        toast.err(err.message);
      });
  };

  //LOGIN WITH FACEBOOK/FIREBASE
  const facebookLogin = () => {
    //   auth
    //     .signInWithPopup(facebookAuthProvider)
    //     .then(async (res) => {
    //       const { user } = res;
    //       const idTokenResult = await user.getIdTokenResult();
    //       // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    //       // const credential = facebookAuthProvider.credentialFromResult(res);
    //       // const accessToken = credential.accessToken;
    //       // console.log("FB USER=>", accessToken);
    //       createUser(idTokenResult.token)
    //         .then((res) => {
    //           dispatch({
    //             type: "LOGGED_IN_USER",
    //             payload: {
    //               name: res.data.name,
    //               email: res.data.email,
    //               token: idTokenResult.token,
    //               role: res.data.role,
    //               _id: res.data._id,
    //             },
    //           });
    //           redirectByRole(res);
    //         })
    //         .catch((err) => console.log(err));
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       // toast.err(err.message);
    //     });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <MDBInput
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          autoFocus
        />
      </div>

      <div className="form-group">
        <MDBInput
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter email"
        />
      </div>

      <br />

      <Button
        onClick={handleSubmit}
        type="success"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="Large"
        disabled={!email || password.length < 8}
      >
        Login with email and password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Login</h4>
          )}

          {loginForm()}

          <Button
            onClick={googleLogin}
            type="danger"
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="Large"
          >
            Login with Google
          </Button>

          <Button
            onClick={facebookLogin}
            type="primary"
            className="mb-3"
            block
            shape="round"
            icon={<FacebookOutlined />}
            size="Large"
          >
            Login with Facebook
          </Button>
          <Link to="/forgotpassword" className="float-right text-danger">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
