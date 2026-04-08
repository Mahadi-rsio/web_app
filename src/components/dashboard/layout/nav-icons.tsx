import type { Icon } from "@phosphor-icons/react/dist/lib/types";
import { ChartPieIcon } from "@phosphor-icons/react/dist/ssr/ChartPie";
import { GearSixIcon } from "@phosphor-icons/react/dist/ssr/GearSix";
import { PlugsConnectedIcon } from "@phosphor-icons/react/dist/ssr/PlugsConnected";
import { UserIcon } from "@phosphor-icons/react/dist/ssr/User";
import { UsersIcon } from "@phosphor-icons/react/dist/ssr/Users";
import { XSquare } from "@phosphor-icons/react/dist/ssr/XSquare";
import { Database } from '@phosphor-icons/react'
import { HardDriveIcon } from "@phosphor-icons/react/dist/ssr/HardDrive";

export const navIcons = {
  "chart-pie": ChartPieIcon,
  "gear-six": GearSixIcon,
  "plugs-connected": PlugsConnectedIcon,
  "x-square": XSquare,
  "database": Database,
  "hard-drive": HardDriveIcon,
  user: UserIcon,
  users: UsersIcon,
} as Record<string, Icon>;
