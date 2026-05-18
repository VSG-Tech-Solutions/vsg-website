/**
 * Icon registry for pattern components.
 *
 * Patterns accept icon names (strings) instead of LucideIcon function refs
 * because function references can't cross the server→client component
 * boundary. Pages stay as server components (so metadata exports work)
 * while patterns ("use client") look up the icon internally.
 *
 * Add icons here as needed. Names should match the lucide export.
 */

import {
  type LucideIcon,
  // Operations / modules
  ShoppingCart,
  AlertOctagon,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Link2,
  CreditCard,
  Wallet,
  FileSignature,
  ClipboardCheck,
  Megaphone,
  Truck,
  Boxes,
  Layers,
  Cpu,
  Brain,
  Lock,
  // Process
  FileSearch,
  PenTool,
  Hammer,
  CheckSquare,
  Repeat,
  ScrollText,
  Coins,
  ClipboardList,
  Workflow,
  Code2,
  // Trust
  Users,
  Clock,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Headset,
  XCircle,
} from "lucide-react";

export const iconRegistry = {
  ShoppingCart,
  AlertOctagon,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Link2,
  CreditCard,
  Wallet,
  FileSignature,
  ClipboardCheck,
  Megaphone,
  Truck,
  Boxes,
  Layers,
  Cpu,
  Brain,
  Lock,
  FileSearch,
  PenTool,
  Hammer,
  CheckSquare,
  Repeat,
  ScrollText,
  Coins,
  ClipboardList,
  Workflow,
  Code2,
  Users,
  Clock,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Headset,
  XCircle,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconRegistry;
