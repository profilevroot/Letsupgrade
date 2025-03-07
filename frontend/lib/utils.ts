import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRoutes = (data: any[]) => {
  return {
    routes: data?.map((value) => value.route_name),
    routesActions: getRoutesActions(data),
  };
};

export const getRoutesActions = (data: any[]) =>
  data?.reduce((prev: any, acc: { route_name: any; action_name: any }) => {
    return { ...prev, [acc?.route_name]: acc?.action_name };
  }, {});

export function checkActionPermission(actions: string[], action: string) {
  return actions.includes(action);
}
