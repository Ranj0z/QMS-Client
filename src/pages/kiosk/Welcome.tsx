// src/pages/Welcome.tsx
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/services"); // goes to Service Selection screen
  };

  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={handleStart}>Get your ticket</button>
    </div>
  );
};

export default Welcome;
