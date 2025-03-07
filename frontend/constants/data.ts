import { NavItem, SidebarNavItem } from "@/types";

export const themes = ["light", "dark", "rose", "green", "blue"];
  
export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: "dashboard",
    label: "Dashboard",
  },

  {
    title: "User",
    href: "/admin/users",
    icon: "users",
    label: "user",
  },
   {
    title: "Groups",
    href: "/admin/groups",
    icon: "employee",
    label: "Group",
  },
/*  {
    title: "Profile",
    href: "/admin/profile",
    icon: "profile",
    label: "profile",
  }, 
  {
    title: "Report",
    href: "/admin/report",
    icon: "clipboard",
    label: "Report",
  },*/
  {
    title: "Roles",
    href: "/admin/roles",
    icon: "personStanding",
    label: "activities",
  },
 /*  {
    title: "Permissions",
    href: "/admin/permissions",
    icon: "personStanding",
    label: "activities",
  }, */
  {
    title: "Actions",
    href: "/admin/actions",
    icon: "waypoints",
    label: "Actions",
  },
 /*  {
    title: "Organization",
    href: "/admin/organizations",
    icon: "waypoints",
    label: "Organization",
  }, */
  {
    title: "Routes",
    href: "/admin/routes",
    icon: "webhook",
    label: "Routes",
  },
  {
    title: "Category",
    href: "/admin/category",
    icon: "webhook",
    label: "Category",
  },
  {
    title: "Tickets",
    href: "/admin/tickets",
    icon: "webhook",
    label: "Tickets",
  },
];

export const admin1: any = [
  {
    year: 2016,
    nlb: -8704.534,
    nldb: 0,
    beb: -3345.534,
    bedb: 0,
    deb: -3345.534,
    dedb: 0,
    sumb: -3345.534,
    sumdb: 0,
    allb: -3345.534,
    alldb: 0,
  },
];
