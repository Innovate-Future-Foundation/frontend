import { CalendarCheck2, ContactRound, ListCollapse, LucideIcon, UserPlus } from "lucide-react";

export interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
}
export const navMenu: NavItem[] = [
  {
    icon: ListCollapse,
    label: "Tour details",
    path: "summary"
  },
  {
    icon: ContactRound,
    label: "Contact leader",
    path: "leader"
  },
  {
    icon: CalendarCheck2,
    label: "Schedule",
    path: "schedule"
  },
  {
    icon: UserPlus,
    label: "Students enrollment",
    path: "studentsEnrollment"
  }
];
