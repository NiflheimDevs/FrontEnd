import { gregorianToPersian } from "../../pages/Profile";

export interface Skill {
  id?: number;
  name: string;
  level: number;
}

export interface WorkExperience {
  id?: number;
  companyName: string;
  jobTitle: string;
  startDate?: string;
  website?: string;
  endDate?: string;
  isOngoing?: boolean;
  skills: Skill[];
}

export interface Projects {
  id?: number;
  title: string;
  description: string;
  skills: Skill[];
}

export interface Profile {
  firstName: string;
  lastName: string;
  bio: string;
  skills?: Skill[];
  workExperience?: WorkExperience[];
  freelancerprojects?: Projects[];
  employerprojects?: Projects[];
  rate: number;
  comments: number;
  resume: File | null;
  high_profile?: string;
  join_Date: string;
}

export interface Color {
  color: string;
  hover: string;
}

export const initialColor: Color = {
  color: "blue-500",
  hover: "blue-600",
};

export const initialProfile: Profile = {
  firstName: "امیرمحمد",
  lastName: "محمدی",
  bio: "توسعه‌دهنده با تجربه وب و موبایل با بیش از ۵ سال سابقه در طراحی و پیاده‌سازی وب‌سایت‌ها و اپلیکیشن‌های موبایل. تخصص اصلی من در فریم‌ورک‌های React و Next.js است و همچنین تجربه کار با Node.js و TypeScript را دارم. همواره به دنبال یادگیری تکنولوژی‌های جدید و بهبود مهارت‌های خود هستم.",
  skills: [
    { id: 1, name: "React", level: 1 },
    { id: 2, name: "Next.js", level: 2 },
    { id: 3, name: "TypeScript", level: 3 },
    { id: 4, name: "Node.js", level: 4 },
    { id: 5, name: "C", level: 4 },
    { id: 6, name: "C#", level: 4 },
  ],
  workExperience: [
    {
      id: 1,
      companyName: "دیجی‌کالا",
      jobTitle: "توسعه‌دهنده فرانت‌اند",
      startDate: gregorianToPersian("2019/06/01"),
      website: "https://www.digikala.com",
      skills: [
        { id: 1, name: "React", level: 1 },
        { id: 2, name: "Next.js", level: 2 },
        { id: 3, name: "TypeScript", level: 3 },
      ],
    },
    {
      id: 2,
      companyName: "اسنپ",
      jobTitle: "مهندس نرم‌افزار بک‌اند",
      startDate: gregorianToPersian("2021/10/01"),
      isOngoing: true,
      website: "https://snapp.ir",
      skills: [
        { id: 4, name: "Node.js", level: 4 },
        { id: 3, name: "TypeScript", level: 3 },
      ],
    },
    {
      id: 3,
      companyName: "کافه‌بازار",
      jobTitle: "توسعه‌دهنده فول‌استک",
      startDate: gregorianToPersian("2018/04/01"),
      endDate: gregorianToPersian("2019/05/01"),
      isOngoing: false,
      website: "https://cafebazaar.ir",
      skills: [
        { id: 1, name: "React", level: 1 },
        { id: 4, name: "Node.js", level: 4 },
      ],
    },
    {
      id: 4,
      companyName: "زرین‌پال",
      jobTitle: "توسعه‌دهنده وب",
      startDate: gregorianToPersian("2017/07/01"),
      endDate: gregorianToPersian("2018/03/01"),
      isOngoing: false,
      website: "https://www.zarinpal.com",
      skills: [
        { id: 2, name: "Next.js", level: 2 },
        { id: 3, name: "TypeScript", level: 3 },
      ],
    },
    {
      id: 5,
      companyName: "آپارات",
      jobTitle: "برنامه‌نویس C#",
      startDate: gregorianToPersian("2016/11/01"),
      endDate: gregorianToPersian("2017/06/01"),
      isOngoing: false,
      website: "https://www.aparat.com",
      skills: [
        { id: 6, name: "C#", level: 4 },
        { id: 5, name: "C", level: 4 },
      ],
    },
  ],
  freelancerprojects: [
    {
      id: 3,
      title: "API تجارت الکترونیک",
      description:
        "یک API مقیاس‌پذیر برای پلتفرم تجارت الکترونیک با قابلیت‌های مدیریت محصولات، سبد خرید و پرداخت آنلاین. این پروژه با معماری میکروسرویس پیاده‌سازی شده است.",
      skills: [
        { id: 5, name: "Node.js", level: 1 },
        { id: 3, name: "TypeScript", level: 2 },
        { id: 6, name: "GraphQL", level: 3 },
        { id: 7, name: "MongoDB", level: 4 },
      ],
    },
    {
      id: 4,
      title: "داشبورد تحلیلی",
      description:
        "یک داشبورد وب برای تحلیل داده‌های کسب‌وکار با نمودارهای تعاملی و گزارش‌های سفارشی. این پروژه با تمرکز بر عملکرد و تجسم داده‌ها طراحی شده است.",
      skills: [
        { id: 1, name: "React", level: 1 },
        { id: 2, name: "Next.js", level: 2 },
        { id: 8, name: "D3.js", level: 3 },
      ],
    },
    {
      id: 1,
      title: "پلتفرم مدیریت وظایف",
      description:
        "یک وب اپلیکیشن پیشرفته برای مدیریت وظایف تیمی با قابلیت‌های همکاری بلادرنگ و داشبورد تحلیلی. این پروژه با استفاده از معماری SSR و APIهای RESTful پیاده‌سازی شده است.",
      skills: [
        { id: 1, name: "React", level: 1 },
        { id: 2, name: "Next.js", level: 2 },
        { id: 3, name: "TypeScript", level: 3 },
        { id: 6, name: "GraphQL", level: 4 },
      ],
    },
    {
      id: 2,
      title: "اپلیکیشن رزرو آنلاین",
      description:
        "اپلیکیشن موبایل برای رزرو خدمات با رابط کاربری جذاب و سیستم اعلانات push. این پروژه با تمرکز بر عملکرد بالا و تجربه کاربری بهینه توسعه یافته است.",
      skills: [
        { id: 4, name: "React Native", level: 1 },
        { id: 3, name: "TypeScript", level: 2 },
        { id: 7, name: "MongoDB", level: 3 },
      ],
    },
    {
      id: 3,
      title: "API تجارت الکترونیک",
      description:
        "یک API مقیاس‌پذیر برای پلتفرم تجارت الکترونیک با قابلیت‌های مدیریت محصولات، سبد خرید و پرداخت آنلاین. این پروژه با معماری میکروسرویس پیاده‌سازی شده است.",
      skills: [
        { id: 5, name: "Node.js", level: 1 },
        { id: 3, name: "TypeScript", level: 2 },
        { id: 6, name: "GraphQL", level: 3 },
        { id: 7, name: "MongoDB", level: 4 },
      ],
    },
  ],
  employerprojects: [
    {
      id: 1,
      title: "پلتفرم مدیریت وظایف",
      description:
        "یک وب اپلیکیشن پیشرفته برای مدیریت وظایف تیمی با قابلیت‌های همکاری بلادرنگ و داشبورد تحلیلی. این پروژه با استفاده از معماری SSR و APIهای RESTful پیاده‌سازی شده است.",
      skills: [
        { id: 1, name: "React", level: 1 },
        { id: 2, name: "Next.js", level: 2 },
        { id: 3, name: "TypeScript", level: 3 },
        { id: 6, name: "GraphQL", level: 4 },
      ],
    },
    {
      id: 2,
      title: "اپلیکیشن رزرو آنلاین",
      description:
        "اپلیکیشن موبایل برای رزرو خدمات با رابط کاربری جذاب و سیستم اعلانات push. این پروژه با تمرکز بر عملکرد بالا و تجربه کاربری بهینه توسعه یافته است.",
      skills: [
        { id: 4, name: "React Native", level: 1 },
        { id: 3, name: "TypeScript", level: 2 },
        { id: 7, name: "MongoDB", level: 3 },
      ],
    },
    {
      id: 3,
      title: "API تجارت الکترونیک",
      description:
        "یک API مقیاس‌پذیر برای پلتفرم تجارت الکترونیک با قابلیت‌های مدیریت محصولات، سبد خرید و پرداخت آنلاین. این پروژه با معماری میکروسرویس پیاده‌سازی شده است.",
      skills: [
        { id: 5, name: "Node.js", level: 1 },
        { id: 3, name: "TypeScript", level: 2 },
        { id: 6, name: "GraphQL", level: 3 },
        { id: 7, name: "MongoDB", level: 4 },
      ],
    },
    {
      id: 4,
      title: "داشبورد تحلیلی",
      description:
        "یک داشبورد وب برای تحلیل داده‌های کسب‌وکار با نمودارهای تعاملی و گزارش‌های سفارشی. این پروژه با تمرکز بر عملکرد و تجسم داده‌ها طراحی شده است.",
      skills: [
        { id: 1, name: "React", level: 1 },
        { id: 2, name: "Next.js", level: 2 },
        { id: 8, name: "D3.js", level: 3 },
      ],
    },
    {
      id: 1,
      title: "پلتفرم مدیریت وظایف",
      description:
        "یک وب اپلیکیشن پیشرفته برای مدیریت وظایف تیمی با قابلیت‌های همکاری بلادرنگ و داشبورد تحلیلی. این پروژه با استفاده از معماری SSR و APIهای RESTful پیاده‌سازی شده است.",
      skills: [
        { id: 1, name: "React", level: 1 },
        { id: 2, name: "Next.js", level: 2 },
        { id: 3, name: "TypeScript", level: 3 },
        { id: 6, name: "GraphQL", level: 4 },
      ],
    },
  ],
  resume: null,
  rate: 4,
  comments: 3,
  high_profile:
    "https://tr.rbxcdn.com/180DAY-a8273bb70d4ded6359cd241f40ef543d/420/420/Hat/Webp/noFilter",
  join_Date: gregorianToPersian("2025/04/24"),
};
