import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ChevronsUpDown,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { NavAdmin } from "./nav-admin";
import { useSelector } from "react-redux";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatar.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
        },
      ],
    },
    {
      title: "Loans",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "My Loans",
          url: "#",
        },
        {
          title: "Apply Loan",
          url: "#",
        },
        {
          title: "Loan History",
          url: "#",
        },
      ],
    },
    {
      title: "Benefits",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Information",
          url: "#",
        },
        {
          title: "My Benefits",
          url: "#",
        },
        {
          title: "Apply Benefits",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
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
  navAdmin: [
    {
      title: "Manage Users",
      url: "/dashboard/members",
      icon: Bot,
      items: [
        {
          title: "All Members",
          url: "/dashboard/members",
        },
        {
          title: "Add a Member",
          url: "/dashboard/members/register",
        },
        {
          title: "Add an Admin",
          url: "#",
        },
      ],
    },
    {
      title: "Manage Loans",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Loan Requests",
          url: "#",
        },
        {
          title: "Pending Requests",
          url: "#",
        },
        {
          title: "Approved Requests",
          url: "#",
        },
      ],
    },
    {
      title: "Manage Benefits",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Benefit Requests",
          url: "#",
        },
        {
          title: "Pending Requests",
          url: "#",
        },
        {
          title: "Approved Requests",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link to="/">
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src="/Picture2.jpg" alt="CEB_Logo" />
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">CEB WELFARE</span>
              <span className="truncate text-xs">WPS II</span>
            </div>
          </SidebarMenuButton>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {userInfo.role === "admin" && <NavAdmin items={data.navAdmin} />}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
