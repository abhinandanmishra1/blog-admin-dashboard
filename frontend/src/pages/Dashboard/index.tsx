import './Dashboard.css';

import React from 'react';
import { useGetMetadataQuery } from '../../hooks/useMetadata';

export const Dashboard: React.FC = () => {
  useGetMetadataQuery();
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3 className="stat-label">Total Posts</h3>
          <p className="stat-value">0</p>
        </div>
        <div className="stat-card">
          <h3 className="stat-label">Categories</h3>
          <p className="stat-value">0</p>
        </div>
        <div className="stat-card">
          <h3 className="stat-label">Tags</h3>
          <p className="stat-value">0</p>
        </div>
        <div className="stat-card">
          <h3 className="stat-label">Series</h3>
          <p className="stat-value">0</p>
        </div>
      </div>
    </div>
  );
};
