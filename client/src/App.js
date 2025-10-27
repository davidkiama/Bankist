import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// custom components
import Header from "./components/Header/Header";

import Home from "./components/Home/Home";
import Signup from "./components/Auth/Signup";
import Signin from "./components/Auth/Signin";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const [statusCode, setStatusCode] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  const addStatusCode = (status) => {
    setStatusCode(status);
    setTimeout(() => {
      setStatusMsg("");
    }, 2000);
  };
  const addMessage = (message) => {
    setStatusMsg(message);

    setTimeout(() => {
      setStatusMsg("");
    }, 2000);
  };

  return (
    <BrowserRouter>
      <Header />

      <span
        className={`
          ${statusMsg && statusCode === 200 && "status--ok"}  
          ${statusMsg && statusCode !== 200 && "status--error"} status-msg`}
      >
        {statusMsg || "\u00A0"}
      </span>

      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route
          path="signup"
          element={<Signup onAddStatusCode={addStatusCode} onAddMessage={addMessage} />}
        />
        <Route
          path="signin"
          element={<Signin onAddStatusCode={addStatusCode} onAddMessage={addMessage} />}
        />
        <Route
          path="dashboard"
          element={<Dashboard onAddStatusCode={addStatusCode} onAddMessage={addMessage} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
