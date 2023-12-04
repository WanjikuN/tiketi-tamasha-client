import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css";

const Authentication = ({ setIsLoggedIn , isLoggedIn , updateUserData}) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [roleOptions, setRoleOptions] = useState([]);
  const [type, setType] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    _password_hash: "",
    confirmPassword: "",
    phone_number: "",
    email: "",
    role_id: "",
  });
  const { enqueueSnackbar } = useSnackbar();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(formData._password_hash)) {
      alert(
        "Password must include at least one uppercase letter, one lowercase letter, one special character, and be at least six characters long."
      );
      return;
    }

    if (formData._password_hash !== formData.confirmPassword) {
      alert("Password and confirmation do not match.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
    
        const data = await response.json();
        
        setType(true)
        enqueueSnackbar(`Hello, ${data.username}! Account created successfully`, {
          variant: "success",
        });
      } else {
       
        enqueueSnackbar("Signup failed", { variant: "error" });
      }
    } catch (error) {
      console.error("Error during signup:", error);
      enqueueSnackbar("Error during signup", { variant: "error" });
    }
  };
  const saveUserToStorage = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogin = async () => {
    

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            email: formData.email,
            _password_hash: formData._password_hash,
          }),
      });
      console.log(response);
      const responseData = await response.json();
      console.log(responseData.id);
      if (response.ok) {
        updateUserData(responseData)
        const userData = responseData;
        setType(false)
        setIsLoggedIn(true);
        saveUserToStorage(userData);
        navigate("/");
        enqueueSnackbar(`Hello, ${userData.username}! Logged in successfully`, {
          variant: "success",
        });
      } else {
       
        enqueueSnackbar("Login failed", { variant: "error" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      enqueueSnackbar("Error during login", { variant: "error" });
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("http://localhost:5000/roles");
        const data = await response.json();
        if (response.ok) {
          setRoleOptions(data);
        } else {
          console.error("Failed to fetch roles:", data.error);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  return (
    <div className="authentication-container">
   
      <div className="authentication-form">
        <h2>{type ? "Login" : "Sign Up"}</h2>
        {!type && (
          <>
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="input-field"
            />
            <select
              value={formData.role_id}
              onChange={(e) => setFormData({ ...formData, role_id: e.target.value })}
              className="input-field"
            >
              <option value="" disabled>Select a role</option>
                    {roleOptions.map((role) => (
                        
                        <option key={role.id} value={role.id}>
                        {role.name}
            </option>))}
            </select>
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              className="input-field"
            />
            
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="input-field"
        />
        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData._password_hash}
            onChange={(e) => setFormData({ ...formData, _password_hash: e.target.value })}
            className="input-field"
          />
          {!type && (
          <div className="confirm-password-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="input-field"
              />
            </div>)}
         
          <span onClick={togglePasswordVisibility} className="password-toggle">
            <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                style={{ fontSize: "16px" }}
              />
          </span>
        </div>
        <button onClick={type ? handleLogin : handleSignup} className="authentication-button">
          {type ? "Login" : "Sign Up"}
        </button>
        <p>
          {type? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="toggle-link"
            onClick={() => setType(!type)}
          >
            {type ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};


export default Authentication;
