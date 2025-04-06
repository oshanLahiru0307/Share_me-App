import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Components/Home";
import UserProfile from "./Components/UserProfile";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/UserProfile" element={<UserProfile/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
