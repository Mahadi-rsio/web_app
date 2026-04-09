import type { NavItemConfig } from "@/types/nav";
import { paths } from "@/paths";

export const navItems = [
  { key: "overview", title: "Overview", href: paths.dashboard.overview, icon: "chart-pie" },
  { key: "settings", title: "Settings", href: paths.dashboard.settings, icon: "gear-six" },
  { key: "account", title: "Account", href: paths.dashboard.account, icon: "user" },
  { key: "database", title: "Database", href: paths.dashboard.database.index, icon: "database" },
  { key: "storage", title: "Storage", href: paths.dashboard.storage.index, icon: "hard-drive" },
  { key: "pages", title: "Pages", href: paths.dashboard.pages.index, icon: "browsers" },
  { key: "backup", title: "Backup", href: paths.dashboard.backup.index, icon: "cloud-arrow-up" },
  { key: "kv-storage", title: "KV Storage", href: paths.dashboard.kvStorage.index, icon: "stack" },
  { key: "functions", title: "Functions", href: paths.dashboard.functions.index, icon: "function" },
  { key: "cron-job", title: "Cron Jobs", href: paths.dashboard.cronJob.index, icon: "timer" },
] satisfies NavItemConfig[];
