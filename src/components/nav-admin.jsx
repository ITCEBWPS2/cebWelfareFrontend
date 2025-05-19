// import { ChevronRight } from "lucide-react";

// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import {
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
// } from "@/components/ui/sidebar";
// import { Link } from "react-router-dom";

// export function NavAdmin({ items }) {
//   return (
//     <SidebarGroup>
//       <SidebarGroupLabel>Admin Options</SidebarGroupLabel>
//       <SidebarMenu>
//         {items.map((item) => (
//           <Collapsible
//             key={item.title}
//             asChild
//             defaultOpen={item.isActive}
//             className="group/collapsible"
//           >
//             <SidebarMenuItem>
//               <CollapsibleTrigger asChild>
//                 <SidebarMenuButton tooltip={item.title}>
//                   {item.icon && <item.icon />}
//                   <span>{item.title}</span>
//                   <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//                 </SidebarMenuButton>
//               </CollapsibleTrigger>
//               <CollapsibleContent>
//                 <SidebarMenuSub>
//                   {item.items?.map((subItem) => (
//                     <SidebarMenuSubItem key={subItem.title}>
//                       <SidebarMenuSubButton asChild>
//                         <Link to={subItem.url}>
//                           <span>{subItem.title}</span>
//                         </Link>
//                       </SidebarMenuSubButton>
//                     </SidebarMenuSubItem>
//                   ))}
//                 </SidebarMenuSub>
//               </CollapsibleContent>
//             </SidebarMenuItem>
//           </Collapsible>
//         ))}
//       </SidebarMenu>
//     </SidebarGroup>
//   );
// }

// ===========================================================================================
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export function NavAdmin({ items, role }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Admin Options</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          // Filter out "All Members" for super_admin role
          const filteredItems = role[1] //isPresidentAndVicePresident
            ? item.items?.filter(
                (subItem) =>
                  subItem.title !== "Add User" &&
                  subItem.title !== "Add Member" &&
                  subItem.title !== "Pending Requests" &&
                  subItem.title !== "Approved Requests" &&
                  subItem.title !== "Rejected Requests" &&
                  subItem.title !== "Update user passwords"
              )
            : role[0] //isAssistantSecretaryandSecetary
            ? item.items?.filter(
                (subItem) =>
                  subItem.title !== "Add User" &&
                  subItem.title !== "Update user passwords"
              )
            : role[2] //isTreasurerAndAssistantTreasurer
            ? item.items?.filter(
                (subItem) =>
                  subItem.title !== "Add User" &&
                  subItem.title !== "Add Member" &&
                  subItem.title !== "Update user passwords"
              )
            : item.items;
          // const filteredItems = role[1]
          //   ? item.items?.filter(
          //       (subItem) =>
          //         subItem.title !== "Add a User" &&
          //         subItem.title !== "Add a Member"
          //     )
          //   : item.items;

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {filteredItems?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link to={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
