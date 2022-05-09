import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// custom components
import Header from "./components/Header/Header";

import Home from "./components/Home/Home";
import Signup from "./components/Auth/Signup";
import Signin from "./components/Auth/Signin";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<Signin />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
