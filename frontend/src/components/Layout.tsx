import "./Layout.css";

import Header from "./Header";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import React from "react";
import Sidebar from "./Sidebar";

export const Layout: React.FC = () => {
  return (
    <ProtectedRoute>
      <div className="layout">
        <Header />
        <div className="layout-main">
          <Sidebar />
          <main className="main-content">
            <div className="content-container">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};
