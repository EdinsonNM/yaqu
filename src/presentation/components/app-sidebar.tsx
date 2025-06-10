import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/presentation/components/nav-main";
import { NavProjects } from "@/presentation/components/nav-projects";
import { NavUser } from "@/presentation/components/nav-user";
import { TeamSwitcher } from "@/presentation/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/presentation/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Todas Comisiones",
      logo: GalleryVerticalEnd,
      plan: "JUMBP",
    },
    {
      name: "Comisión 1",
      logo: GalleryVerticalEnd,
      plan: "JUMBP",
    },
    {
      name: "Comisión 2",
      logo: AudioWaveform,
      plan: "JUMBP",
    },
    {
      name: "Comisión 3",
      logo: Command,
      plan: "JUMBP",
    },
  ],
  navMain: [
    {
      title: "Administración",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Usuarios",
          url: "/dashboard/administration/users",
        },
        {
          title: "Junta de Usuarios",
          url: "/dashboard/administration/junta",
        },
        {
          title: "Sectores y Subsectore",
          url: "#",
        },
        {
          title: "Cultivos",
          url: "#",
        },
        {
          title: "Materiales",
          url: "#",
        },
      ],
    },
    {
      title: "Inventario",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Canales",
          url: "#",
        },
        {
          title: "Drenes",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Padrón de Usuarios",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Usuarios",
          url: "/dashboard/padron/usuarios",
        },
        {
          title: "Predios",
          url: "/dashboard/padron/predios",
        },
        {
          title: "Padrón electoral",
          url: "#",
        },
        {
          title: "Asistencias",
          url: "#",
        },
      ],
    },
    {
      title: "Plan de Cultivo",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <img src="/logo.png" alt="" />
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
