import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// custom components
import Header from "./components/Header/Header";

import Home from "./components/Home/Home";
import Signup from "./components/Auth/Signup";
import Signin from "./components/Auth/Signin";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
