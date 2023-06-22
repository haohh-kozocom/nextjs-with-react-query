import { ROUTE_PATH } from "../configs/route-path";

export const MENU_LABEL = {
  DASHBOARD: "Dashboard",
  STUDENT: "Student",
  ABOUT: "About",
};

export const MenuSidebar = [
  {
    key: "1",
    to: ROUTE_PATH.DASHBOARD,
    label: MENU_LABEL.DASHBOARD,
  },
  {
    key: "2",
    to: ROUTE_PATH.STUDENT,
    label: MENU_LABEL.STUDENT,
  },
  {
    key: "3",
    to: ROUTE_PATH.ABOUT,
    label: MENU_LABEL.ABOUT,
  },
];
