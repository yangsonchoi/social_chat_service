import React, { useState } from "react";
import { postSignup } from "./postSignup";
import { useNavigate } from "react-router-dom";

const Signup = () => {
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
    postSignup(credentials)
      .then(() => {
        console.log("signup success")
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
        if (err.response) {
          console.log(err.response.data.message);
          alert(err.response.data.message);
        }
      });
  };

  return (
    <div>
      <h1>Signup</h1>
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
      <div>
        <button type="button" onClick={handleSubmit}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
