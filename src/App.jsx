import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Register from "./pages/register";
import ProtectedRoute from "./components/protectedroute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}


export default App
