import React, { useState } from "react";
import "../styles/SignUp.css";
import { useNavigate } from "react-router-dom"; 

const SignUp = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [signupFormData, setSignupFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(signupFormData.password)) {
      alert(
        "Password must include at least one uppercase letter, one lowercase letter, one special character, and be at least six characters long."
      );
      return;
    }

    if (signupFormData.password !== signupFormData.confirmPassword) {
      alert("Password and confirmation do not match.");
      return;
    }

    try {
      
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupFormData),
      });

      if (response.ok) {
        const data = await response.json();
        setSignupFormData({
          name: "",
          username: "",
          password: "",
          confirmPassword: "",
        });

        setIsLoggedIn(true);

        alert(`Hello, ${data.name} Account created successfully`);

        

      } else {
        alert("Signup failed");
      }
    } catch (error) {
      alert("Error during signup: " + error.message);
    }
  };
  const handleLoginLinkClick = () => {
    
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      <div className="signup-form">
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={signupFormData.name}
          onChange={(e) =>
            setSignupFormData({ ...signupFormData, name: e.target.value })
          }
          className="input-field"
        />
        <input
          type="text"
          placeholder="Username"
          value={signupFormData.username}
          onChange={(e) =>
            setSignupFormData({
              ...signupFormData,
              username: e.target.value,
            })
          }
          className="input-field"
        />
        
        <input
            type="tel"
            placeholder="Phone Number"
            value={signupFormData.phone_number}
            onChange={(e) =>
              setSignupFormData({
                ...signupFormData,
                phone_number: e.target.value,
              })
            }
            className="input-field"
          />
          <input
            type="email"
            placeholder="Email"
            value={signupFormData.email}
            onChange={(e) =>
              setSignupFormData({
                ...signupFormData,
                email: e.target.value,
              })
            }
            className="input-field"
          />

        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={signupFormData.password}
            onChange={(e) =>
              setSignupFormData({
                ...signupFormData,
                password: e.target.value,
              })
            }
            className="input-field"
          />
          <div className="confirm-password-input">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={signupFormData.confirmPassword}
            onChange={(e) =>
              setSignupFormData({
                ...signupFormData,
                confirmPassword: e.target.value,
              })
            }
            className="input-field"
          />
          <span onClick={togglePasswordVisibility} className="password-toggle">
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>
          <span onClick={togglePasswordVisibility} className="password-toggle">
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>
        
        <button onClick={handleSignup} className="signup-button">
          Sign Up
        </button>
        <p>
        Already have an account?{" "}
        <span className="login-link" onClick={handleLoginLinkClick}>
          Login
        </span>
      </p>
      </div>
    </div>
  );
};

export default SignUp;
