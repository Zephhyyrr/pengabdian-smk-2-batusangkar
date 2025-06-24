"use client";

import ToggleDark from "@/components/common/ToggleDark";

type DashboardHeaderProps = {
  title: string;
  role: string;
};

export default function DashboardHeader({ title, role }: DashboardHeaderProps) {
  return (
    <header className="flex justify-between h-15 mb-4 items-center dark:border-gray-700">
      <h1 className="text-2xl font-bold">{title} {role}</h1>
      <div className="flex gap-2 items-center">
        <ToggleDark />
        <button className="bg-red-600 text-white px-3 py-1 rounded">Logout</button>
      </div>
    </header>
  );
}
