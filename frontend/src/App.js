import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import BMI from "./components/BMI";
import Curl from "./components/Curl";
import Row from "./components/Row";
import Lift from "./components/Lift";
import Jack from "./components/Jack";
import Raise from "./components/Raise";
import Lunge from "./components/Lunge";
import Pushup from "./components/Pushup";
import Squat from "./components/Squat";
import BarbellRow from "./components/BarbellRow";
import OverheadPress from "./components/OverheadPress";
import Underweight from "./components/Underweight";
import Healthy from "./components/Healthy";
import Overweight from "./components/Overweight";
import Obese from "./components/Obese";
import Profile from "./pages/Profile";
import Records from "./pages/Records";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/homepage" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/records" element={<Records />} />{" "}
          <Route path="/bmi" element={<BMI />} />
          <Route path="/curl" element={<Curl />} />
          <Route path="/row" element={<Row />} />
          <Route path="/lift" element={<Lift />} />
          <Route path="/jack" element={<Jack />} />
          <Route path="/raise" element={<Raise />} />
          <Route path="/lunge" element={<Lunge />} />
          <Route path="/pushup" element={<Pushup />} />
          <Route path="/squat" element={<Squat />} />
          <Route path="/barbellrow" element={<BarbellRow />} />
          <Route path="/overheadpress" element={<OverheadPress />} />
          <Route path="/underweight" element={<Underweight />} />
          <Route path="/healthy" element={<Healthy />} />
          <Route path="/overweight" element={<Overweight />} />
          <Route path="/obese" element={<Obese />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
