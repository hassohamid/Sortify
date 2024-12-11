import { Routes, Route, Navigate } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Planner from "./pages/Planner";
import HabitsPage from "./pages/HabitsPage";
import Onboarding from "./pages/Onboarding";
import { useState, useEffect } from "react";
import "./App.css";
import { useUserContext } from "./context/UserContext";

function App() {
  const { isLoggedIn, setIsLoggedIn } = useUserContext();

  // This effect runs only when `isLoggedIn` changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
  }, [isLoggedIn]);

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : { username: "", password: "" };
  });

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Onboarding
                setFormData={setFormData}
                formData={formData}
                setIsLoggedIn={setIsLoggedIn}
              />
            )
          }
        />
        {/* Private routes for logged users */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <ProfilePage setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/tasks"
          element={isLoggedIn ? <Tasks /> : <Navigate to="/" replace />}
        />
        <Route
          path="/planner"
          element={isLoggedIn ? <Planner /> : <Navigate to="/" replace />}
        />
        <Route
          path="/habits"
          element={isLoggedIn ? <HabitsPage /> : <Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
}

export default App;
