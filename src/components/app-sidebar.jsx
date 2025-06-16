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
import {
  allowedRoles,
  isAssistantSecretaryandSecetary,
  isPresidentAndVicePresident,
  isTreasurerAndAssistantTreasurer,
} from "@/authorization";

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
        {
          title: "Audit Logs",
          url: "/dashboard/auditLogs",
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
          title: "Add Member",
          url: "/dashboard/members/register",
        },
        {
          title: "Add User",
          url: "/dashboard/members/registeruser",
        },
        {
          title: "Update user passwords",
          url: "/dashboard/members/updateuser",
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
    // {
    //   title: "Benefits",
    //   url: "#",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Death Funds",
    //       url: "/dashboard/benefits/deathfunds",
    //     },
    //     {
    //       title: "Retirement Gifts",
    //       url: "/dashboard/benefits/retirements",
    //     },
    //     {
    //       title: "Grade 5 Scholarship",
    //       url: "/dashboard/benefits/scholarships",
    //     },
    //     {
    //       title: "Refund Member Fees",
    //       url: "/dashboard/benefits/refunds",
    //     },
    //     {
    //       title: "Medical",
    //       url: "/dashboard/benefits/medicals",
    //     },
    //   ],
    // },
  ],
};

export function AppSidebar({ ...props }) {
  const { user } = useAuth();
  const userRole1 = isAssistantSecretaryandSecetary(user);
  const userRole2 = isPresidentAndVicePresident(user);
  const userRole3 = isTreasurerAndAssistantTreasurer(user);
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
        {allowedRoles.includes(user?.role) && (
          // <NavAdmin items={data.navAdmin} />
          <NavAdmin
            items={data.navAdmin}
            role={[userRole1, userRole2, userRole3]}
          />
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
