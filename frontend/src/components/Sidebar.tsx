import './Sidebar.css';

import { FaHome, FaInfoCircle, FaList, FaTags, FaUser } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar-links">
        <SidebarLink to="/" icon={<FaHome />} text="Dashboard" />
        <SidebarLink to="/site-info" icon={<FaInfoCircle />} text="Site Info" />
        <SidebarLink to="/author" icon={<FaUser />} text="Author" />
        <SidebarLink to="/categories" icon={<FaList />} text="Categories" />
        <SidebarLink to="/tags" icon={<FaTags />} text="Tags" />
        {/* <SidebarLink to="/series" icon={<FaBookOpen />} text="Series" /> */}
      </div>
    </nav>
  );
};

const SidebarLink: React.FC<{ to: string; icon: React.ReactNode; text: string }> = ({ 
  to, 
  icon, 
  text 
}) => (
  <Link to={to} className="sidebar-link">
    <span className="sidebar-icon">{icon}</span>
    <span className="sidebar-text">{text}</span>
  </Link>
);

export default Sidebar;

