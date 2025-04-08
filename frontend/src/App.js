import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Components/Home";
import UserProfile from "./Components/UserProfile";
import MyNetwork from "./Components/MyNetwork";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userProfile" element={<UserProfile/>}/>
          <Route path="/myNetwork" element={<MyNetwork/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
