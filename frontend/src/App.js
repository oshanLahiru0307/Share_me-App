import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Components/Home";
import UserProfile from "./Components/UserProfile";
import MyNetwork from "./Components/MyNetwork";
import Event from "./Components/Event";
import UserLogin from "./Components/UserLogin";
import UserRegister from "./Components/UserRegister";
import Lerning from "./Components/lerning";
import AddLearningPlan from "./Components/AddLearningPlan";
import UpdateLearningPlan from "./Components/UpdateLearningPlan";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userProfile/:id" element={<UserProfile />} />
          <Route path="/myNetwork" element={<MyNetwork />} />
          <Route path="/events" element={<Event />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/lerning" element={<Lerning />} />
          <Route path="/addLearningPlan" element={<AddLearningPlan />} />
          <Route path="/updateLearningPlan/:id"element={<UpdateLearningPlan />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
