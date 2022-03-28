import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//COUNTDOWN WHILE REDIRECTING
const RedirectLoading = () => {
  const [count, setCount] = useState(5);
  let navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && navigate("/");
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div className="container p-5 mt-5 text-center">
      <p>Redirecting to homepage in {count}</p>
    </div>
  );
};

export default RedirectLoading;
