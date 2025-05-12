import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import UserProfile from "./Components/UserProfile";
import MyNetwork from "./Components/MyNetwork";
import Event from "./Components/Event";
import UserLogin from "./Components/UserLogin";
import UserRegister from "./Components/UserRegister";
import OtherUserProfile from "./Components/OtherUserProfile";


function App() {



  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/userProfile/:id" element={<UserProfile />} />
          <Route path="/otherUserProfile/:id" element={<OtherUserProfile />} />
          <Route path="/myNetwork" element={<MyNetwork />} />
          <Route path="/events" element={<Event />} />
          <Route path="/register" element={<UserRegister />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
