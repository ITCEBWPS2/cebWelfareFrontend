import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger className="fixed bg-white ml-2 mt-2 shadow-md" />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
