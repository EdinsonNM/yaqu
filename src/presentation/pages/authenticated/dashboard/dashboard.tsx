import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
//import SidebarMenu from "./components/sidebar";

import { SiteHeader } from "./components/site-header";
import { AppSidebar } from "./components/app-sidebar";
import DashboardRoutes from "./dashboard.routes";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset className="bg-gray-50">
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <DashboardRoutes />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
