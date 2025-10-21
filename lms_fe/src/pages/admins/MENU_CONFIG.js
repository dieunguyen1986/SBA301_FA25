export const MENU_CONFIG = {
  ADMIN: [
    { label: "Dashboard", link: "/admin", icon: "📊", active: true },
    { label: "Manage Category", link: "/admin/categories", icon: "🗂️" },
    // { label: "Manage Users", link: "users", icon: "👥" },
    // { label: "Manage Courses", link: "courses", icon: "📚" },
    // { label: "Manage Lecturers", link: "lecturers", icon: "👨‍🏫" },
    // { label: "Manage Students", link: "students", icon: "👩‍🎓" },
    // { label: "Reports", link: "reports", icon: "📈" },
    // { label: "Settings", link: "settings", icon: "⚙️" },
  ],
  LECTURER: [
    { label: "My Courses", link: "/lecturer", icon: "🎓" },
    // { label: "Create Course", link: "courses/new", icon: "➕" },
    { label: "Manage Section", link: "/lecturer/sections", icon: "🧩" },
    { label: "Manage Lesson", link: "/lecturer/lessons", icon: "📖" },
    // { label: "Gradebook", link: "gradebook", icon: "🧾" },
    // { label: "Messages", link: "messages", icon: "💬" },
  ],
};
