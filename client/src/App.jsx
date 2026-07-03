import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Chat from "./pages/Chat";

const App = () => {
  const { token } = useAuth();

  return (
    <div>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes — redirect to login if not logged in */}
        <Route
          path="/feed"
          element={token ? <Feed /> : <Navigate to="/login" />}
        />
        <Route
          path="/chat"
          element={token ? <Chat /> : <Navigate to="/login" />}
        />

        {/* Default route */}
        <Route path="/" element={<Navigate to="/feed" />} />
      </Routes>
    </div>
  );
};

export default App;