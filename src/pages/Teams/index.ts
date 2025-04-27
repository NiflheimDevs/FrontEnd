// Update index.ts with project interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  members: User[];
  projects?: Project[]; // Add projects to teams
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: "در انتظار" | "در حال انجام" | "تکمیل شده" | "لغو شده";
  deadline: string;
  progress: number;
  teamId: string;
  assignedUsers: User[];
}

// Sample project data for staticData.ts
export const projects: Project[] = [
  {
    id: "1",
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
    id: "2",
    title: "اپلیکیشن موبایل",
    description: "توسعه اپلیکیشن موبایل برای پلتفرم‌های iOS و Android",
    status: "در انتظار",
    deadline: "2025-06-15",
    progress: 10,
    teamId: "1",
    assignedUsers: [],
  },
  {
    id: "3",
    title: "بهینه‌سازی SEO سایت",
    description: "بهبود رتبه سایت در موتورهای جستجو و افزایش ترافیک ارگانیک",
    status: "تکمیل شده",
    deadline: "2025-04-01",
    progress: 100,
    teamId: "2",
    assignedUsers: [],
  },
];
