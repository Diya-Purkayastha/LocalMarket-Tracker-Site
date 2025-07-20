// dashboard/DashboardLayout.jsx
import { Outlet } from 'react-router';
import Sidebar from '../dashboard/Sidebar';


const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
    </div>
  );
};

export default DashboardLayout;
