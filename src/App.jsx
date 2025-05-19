import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { ToastContainer } from "react-toastify";
import NewsFeed from "./components/NewsFeed";
import { auth } from "./components/firebase";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup
  }, []);

  if (loading) return <div>Loading...</div>; // Wait for auth state

  const queryClient = new QueryClient();


  return (
        <QueryClientProvider client={queryClient}>
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route
                path="/"
                element={user ? <Navigate to="/newsfeed" /> : <Login />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/newsfeed" element={user ? <NewsFeed /> : <Navigate to="/login" />} />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
  </QueryClientProvider>

  );
}

export default App;
