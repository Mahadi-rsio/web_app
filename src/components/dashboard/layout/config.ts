import type { NavItemConfig } from "@/types/nav";
import { paths } from "@/paths";

export const navItems = [
  { key: "overview", title: "Overview", href: paths.dashboard.overview, icon: "chart-pie" },
  { key: "settings", title: "Settings", href: paths.dashboard.settings, icon: "gear-six" },
  { key: "account", title: "Account", href: paths.dashboard.account, icon: "user" },
  { key: "database", title: "Database", href: paths.dashboard.database.index, icon: "database" },
] satisfies NavItemConfig[];
