export type Permission =
  | "ADD_MEMBER"
  | "REMOVE_MEMEBER"
  | "BIDDER"
  | "EDIT_INFO"
  | "EDIT_NICKNAME"
  | "EDIT_ROLE"
  | "DELETE_TEAM";

// Update index.ts with project interfaces
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  position?: string;
  username?: string;
}
export interface TeamData {
  id: number;

  name: string;
  description: string;
  members: User[];
  memberCount?: number;
  createdAt?: string;
  profileImage?: string;
  permissions?: Permission[];
  picture?: string;
}
export interface Team {
  id: number;
  name: string;
  description: string;
  profile?: string;
  members: User[];
  projects?: Project[];
  position?: string;
}
export interface Project {
  id: number;
  title: string;
  description: string;
  status: "در انتظار" | "در حال انجام" | "تکمیل شده" | "لغو شده";
  deadline: string;
  progress: number;
  teamId: string;
  assignedUsers: User[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "طراحی وب‌سایت فروشگاهی",
    description:
      "طراحی و توسعه یک فروشگاه آنلاین با قابلیت پرداخت آنلاین و مدیریت موجودی",
    status: "در حال انجام",
    deadline: "2025-05-30",
    progress: 45,
    teamId: "1",
    assignedUsers: [],
  },
  {
    id: 9,

    title: "اپلیکیشن موبایل",
    description: "توسعه اپلیکیشن موبایل برای پلتفرم‌های iOS و Android",
    status: "در انتظار",
    deadline: "2025-06-15",
    progress: 10,
    teamId: "1",
    assignedUsers: [],
  },
  {
    id: 3,
    title: "بهینه‌سازی SEO سایت",
    description: "بهبود رتبه سایت در موتورهای جستجو و افزایش ترافیک ارگانیک",
    status: "تکمیل شده",
    deadline: "2025-04-01",
    progress: 100,
    teamId: "2",
    assignedUsers: [],
  },
];
