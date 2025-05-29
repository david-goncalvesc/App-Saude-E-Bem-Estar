import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import ProfileScreen from './components/ProfileScreen';
import FavoritesScreen from './components/FavoritesScreen';
import EmergencyScreen from './components/EmergencyScreen';
import LocationsScreen from './components/LocationsScreen';
import DockNavigation from './components/DockNavigation';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/\" replace /> : <LoginScreen />
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? <Navigate to="/\" replace /> : <RegisterScreen />
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div className="pb-24">
                  <ProfileScreen />
                  <DockNavigation />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <div className="pb-24">
                  <FavoritesScreen />
                  <DockNavigation />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/emergency"
            element={
              <ProtectedRoute>
                <div className="pb-24">
                  <EmergencyScreen />
                  <DockNavigation />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/locations"
            element={
              <ProtectedRoute>
                <div className="pb-24">
                  <LocationsScreen />
                  <DockNavigation />
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;