import style from "./login.module.css";
import React, { useState, useEffect } from "react";
import { ColorButton } from "../ProdCard/popperprodcard";
import { useDispatch, useSelector } from "react-redux";
import { authFunction } from "../../Redux/login/action";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import GoogleIcon from "@mui/icons-material/Google";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [userdata, setUser] = useState({ email: "", password: "" });
  const { user, loading, error } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...userdata, [name]: value });
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const { email, sub } = decoded;

      const googleUserData = {
        email,
        googleId: sub,
      };

      const URL = "http://localhost:8080/join/login-popup";
      dispatch(authFunction(googleUserData, URL));
    } catch (error) {
      console.error("Error decoding Google token:", error);
    }
  };

  useEffect(() => {
    if (user && user.token) {
      if (user.user.name === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  return (
    <div className={style.container}>
      <div className={style.card}>
        <h4>Log In to Your Account!</h4>
        <hr className={style.hr_line_login} />

        <div className={style.login_inputDiv}>
          {error && (
            <Alert className={style.alert} severity="error">
              <p>There was a problem logging in.</p>
              <p>Check your email and password or create an account.</p>
            </Alert>
          )}
          <input
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Email"
            className={style.login_pw}
          />
          <input
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Password"
            className={style.login_pw}
          />

          <ColorButton
            onClick={() => {
              const URL = "http://localhost:8080/join/login-popup";
              dispatch(authFunction(userdata, URL));
            }}
            id="login_input"
            className={style.login_input}
          >
            {loading ? <CircularProgress style={{ color: "white" }} /> : "Log in"}
          </ColorButton>
        </div>

        <div className={style.login_org}>
          <p>
            Don't have an account?{" "}
            <span>
              <a href="/join/signup-popup">Sign up</a>
            </span>
          </p>
        </div>

        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={() => {
            console.log('Login Failed');
          }}
          style={{ marginTop: "10px", width: "100%" }}
        />
      </div>
    </div>
  );
};

export default Login;
