import { Team, User } from "./index";

export const users: User[] = [
  {
    id: "1",
    name: "سبحان رنجبر",
    email: "SOBHAN@GMAIL.COM",
    role: "ادمین",
    avatar: "/avatar1.png",
  },
  {
    id: "2",
    name: "سبحان رنجبر",
    email: "SOBHAN@GMAIL.COM",
    role: "طراح",
    avatar: "/avatar1.png",
  },
  {
    id: "3",
    name: "سبحان رنجبر",
    email: "SOBHAN@GMAIL.COM",
    role: "توسعه دهنده",
    avatar: "/avatar1.png",
  },
  {
    id: "4",
    name: "سبحان رنجبر",
    email: "SOBHAN@GMAIL.COM",
    role: "توسعه دهنده",
    avatar: "/avatar1.png",
  },
];

export const teams: Team[] = [
  {
    id: "1",
    name: "پسر عمه های باحال",
    description: "طراحی UI/UX سایت ها و موبایل اپلیکیشن ها",
    memberCount: 3,
    members: [users[0], users[1], users[2]],
  },
  {
    id: "2",
    name: "پسر عمه های باحال",
    description: "طراحی UI/UX سایت ها و موبایل اپلیکیشن ها",
    memberCount: 3,
    members: [users[0], users[1], users[2]],
  },
  {
    id: "3",
    name: "پسر عمه های باحال",
    description: "طراحی UI/UX سایت ها و موبایل اپلیکیشن ها",
    memberCount: 3,
    members: [users[0], users[1], users[2]],
  },
];
