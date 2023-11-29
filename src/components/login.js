import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@chakra-ui/react";
import { useSnackbar } from "notistack";
import './login.css'
function Login({ isLoggedIn, setIsLoggedIn }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    _password_hash: "",
  });
  const { enqueueSnackbar } = useSnackbar();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    
      fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginFormData),
        
      }).then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
      
    
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {!isLoggedIn ? (
        <div className="form">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="email"
            value={loginFormData.email}
            onChange={(e) =>
              setLoginFormData({
                ...loginFormData,
                email: e.target.value,
              })
            }
          />
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={loginFormData._password_hash}
              onChange={(e) =>
                setLoginFormData({
                  ...loginFormData,
                  _password_hash: e.target.value,
                })
              }
            />
            <span onClick={togglePasswordVisibility}>
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                style={{ fontSize: "16px" }}
              />
            </span>
          </div>
          <Button
            _hover={{ bg: "black" }}
            colorScheme="blue"
            onClick={handleLogin}
          >
            Login
          </Button>
          <p>
            Do not have an account?{" "}
            <Button
              colorScheme="blue"
              variant={"ghost"}
              onClick={() => {}}
            >
              Sign Up
            </Button>
          </p>
        </div>
      ) : (
        <p>Display Logout Form or Other Content</p>
      )}
    </div>
  );
}

export default Login;
