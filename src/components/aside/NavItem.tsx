import { Book, FileSearch, LayoutDashboard, Table } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export interface NavItemProps {
  icon: string | ReactNode;
  label: string;
  href: string;
  isActive: boolean;
}

const iconComponents = {
  Table,
  Query: FileSearch,
  Dashboard: LayoutDashboard,
  Catalog: Book,
};

export function NavItem({ icon, label, href, isActive }: NavItemProps) {
  const IconComponent =
    typeof icon === "string"
      ? iconComponents[icon as keyof typeof iconComponents]
      : null;

  return (
    <Link href={href} className="relative group">
      <div
        className={`flex w-10 h-10 cursor-pointer items-center justify-center rounded-xl transition-all duration-200 ease-in-out
          ${
            isActive
              ? "bg-neutral-800 text-white"
              : "text-neutral-400 hover:text-white hover:bg-neutral-800"
          }`}
      >
        {IconComponent ? <IconComponent className="w-6 h-6" /> : icon}
      </div>
      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1.5 bg-neutral-800 text-neutral-200 text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
        {label}
      </div>
    </Link>
  );
}
