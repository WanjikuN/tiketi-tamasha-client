import React, { useState } from "react";
import "./SignUp.css";

function Signup({ isLoggedIn, setIsLoggedIn }) {
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
      //  API request for signup
      const response = await fetch("https://tiketi-tamasha-backend.onrender.com/signup", {
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
        alert(`Hello, ${data.name} Account created successfully`);

        // Additional logic after successful signup if needed

      } else {
        alert("Signup failed");
      }
    } catch (error) {
      alert("Error during signup: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Signup</h1>
      <div className="form">
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={signupFormData.name}
          onChange={(e) =>
            setSignupFormData({ ...signupFormData, name: e.target.value })
          }
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
          />
          <span onClick={togglePasswordVisibility}>
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>
        <div className="password-input">
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
          />
          <span onClick={togglePasswordVisibility}>
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>
        <button onClick={handleSignup}>Sign Up</button>
        <p>
          Already have an account? <span>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;

