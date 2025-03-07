import { Icons } from "@/components/icons";

export type SearchParams = Record<string, string>;
 
declare module "next-auth" {
  interface User {
    username: string;
  }
  interface Session {
    user: User & {
      username: string;
      role: string;
      routes: string[];
      routesActions: string[];
    };
    token: {
      username: string;
    };
  }
}

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;
