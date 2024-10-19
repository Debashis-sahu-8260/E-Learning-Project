import style from "./signup.module.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authFunction } from "../../Redux/login/action";
import { Navigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { ColorButton } from "../ProdCard/popperprodcard";
import GoogleIcon from "@mui/icons-material/Google";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Signup = () => {
  const [userdata, setUser] = useState({ name: "", email: "", password: "" });
  const { user, loading, error } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [signupError, setSignupError] = useState("");

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log("Google login successful!");
        const { access_token } = tokenResponse;

        // Fetch user info from Google
        const response = await axios.get("https://www.googleapis.com/oauth2/v1/userinfo", {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        const { name, email } = response.data;
        const googleUserData = { name, email, password: access_token }; // Using access token as a placeholder


        // Make the signup request to your backend
        const URL = "http://localhost:8080/join/signup-popup"; // Corrected URL
        const signupResponse = await axios.post(URL, googleUserData, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("Signup response:", signupResponse.data);

        // Dispatch the action with the received data if the signup was successful
        dispatch(authFunction(googleUserData, URL));
      } catch (error) {
        console.error("Google login error or signup error:", error.response?.data || error.message);
        setSignupError(error.response?.data?.message || "Signup failed");
      }
    },
    onError: (error) => {
      console.error("Google login failed:", error);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...userdata, [name]: value });
  };

  // Redirect to login if signup is successful
  if (user.token) {
    return <Navigate to="/join/login-popup" />;
  }

  return (
    <div className={style.container}>
      <div className={style.card}>
        <h4>Sign up to Start Learning!</h4>
        <hr className={style.hr_line_login} />

        <div className={style.signup_inputDiv}>
          {signupError && (
            <Alert className={style.alert} severity="error">
              {signupError}
            </Alert>
          )}
          {error && (
            <Alert className={style.alert} severity="error">
              <p>There was a problem creating your account.</p>
              <p>Check that your email address is spelled correctly.</p>
            </Alert>
          )}
          <input
            onChange={handleChange}
            name="name"
            type="text"
            placeholder="Full Name"
            className={style.signup_pw}
          />
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Email"
            className={style.signup_pw}
          />
          <input
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Password"
            className={style.signup_pw}
          />

          <ColorButton
            onClick={() => {
              const URL = "http://localhost:8080/join/signup-popup"; // Updated URL
              dispatch(authFunction(userdata, URL));
            }}
            id="signup_input"
            className={style.signup_input}
          >
            {loading ? (
              <CircularProgress style={{ color: "white" }} />
            ) : (
              "Sign up"
            )}
          </ColorButton>

          <h6 style={{ marginTop: "10px" }}>
            <a href="#">Terms</a> and <a href="#">privacy policy</a>
          </h6>
          <div className={style.hv_account}>
            Already have an Account? <a href="/join/login-popup">Log in</a>
          </div>

          <button onClick={() => login()} className={style.google_button}>
            <GoogleIcon style={{ marginRight: "8px" }} />
            Sign in with Google 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
