import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Courses from "@/pages/Courses";
import Learn from "@/pages/Learn";
import Progress from "@/pages/Progress";
import Community from "@/pages/Community";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </div>
    </Router>
  );
}
