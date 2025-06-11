import {
  SidebarInset,
  SidebarProvider,
} from "@/presentation/components/ui/sidebar";
//import SidebarMenu from "./components/sidebar";

import { SiteHeader } from "./components/site-header";
import DashboardRoutes from "./dashboard.routes";
import { AppSidebar } from "@presentation/components/app-sidebar";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset className="bg-gray-50 dark:bg-zinc-950 overflow-hidden">
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
