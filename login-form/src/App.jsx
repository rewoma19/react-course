import { useState } from "react";
import UserInputs from "./components/UserInputs";
import AuthBtn from "./components/AuthBtn";
import "./App.css";

function App() {
  const [showPassword, setShowPassword] = useState(false);

  function togglePassword() {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  const passwordBtnText = showPassword ? "Hide" : "Show";

  return (
    <div className="app-container">
      <h1>Hello, welcome to my website</h1>
      <UserInputs
        togglePassword={togglePassword}
        showPassword={showPassword}
        passwordBtnText={passwordBtnText}
      />
      <div className="auth-btns-container">
        <AuthBtn btnText="Login" />
        <AuthBtn btnText="Sign up" />
      </div>
    </div>
  );
}

export default App;
