import { Outlet } from "react-router-dom";
import Sidebar from "../features/dashboard/Sidebar";
import Header from "../features/dashboard/Header";

function AdminLayout() {
  return (
    <div className="flex  min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">
        
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 ">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default AdminLayout;
