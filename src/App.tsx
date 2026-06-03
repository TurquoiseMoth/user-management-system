import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import AddUserPage from "./pages/AddUserPage";
import EditUserPage from "./pages/EditUserPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <header className="header">
          <h1>User Management System</h1>
        </header>

        <main className="main">
          <Routes>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:id" element={<UserDetailsPage />} />
            <Route path="/add-user" element={<AddUserPage />} />
            <Route path="/edit-user/:id" element={<EditUserPage />} />
            <Route
              path="*"
              element={<div className="not-found">Page not found</div>}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
