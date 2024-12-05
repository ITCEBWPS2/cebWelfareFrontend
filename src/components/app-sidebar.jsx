import { BookOpen, Bot, Settings2, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/nav-main";
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
import { useAuth } from "@/api/authContext";

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
      url: "/dashboard/loans",
      icon: Bot,
      items: [
        {
          title: "My Loans",
          url: "/dashboard/my-loans",
        },
        {
          title: "Apply Loan",
          url: "/dashboard/apply-loan",
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
          title: "All Loan Requests",
          url: "/dashboard/loans",
        },
        {
          title: "Pending Requests",
          url: "/dashboard/loans/pending",
        },
        {
          title: "Approved Requests",
          url: "/dashboard/loans/approved",
        },
        {
          title: "Rejected Requests",
          url: "/dashboard/loans/rejected",
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
  const { user } = useAuth();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link to="/">
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src="/icon.jpg" alt="CEB_Logo" />
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
        {user.role === "admin" && <NavAdmin items={data.navAdmin} />}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
