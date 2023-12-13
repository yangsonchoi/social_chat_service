import React, { useState } from "react";
import { postSignin } from "./postSignin";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = () => {
    postSignin(credentials)
      .then((res) => {
        const tokenId = res.id;
        Cookies.set("tokenId", tokenId);
        navigate("/main");
      })
      .catch((err) => {
        console.log(err.message);
        if (err.response.data && err.response.data) {
          alert(err.response.data.message);
        }
      });
  };

  const handleSignUp = (e: React.FormEvent) => {
    navigate("/signup");
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={credentials.username}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleInputChange}
        />
      </div>
      <div className="button-container">
        <button type="submit" onClick={handleSubmit}>
          Sign In
        </button>
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
