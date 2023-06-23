"use client";

import { ROUTE_PATH } from "@/configs/route-path";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Item {
  key: string;
  to: string;
  label: string;
}

interface Props {
  item: Item;
}

export default function MenuItem({ item }: Props) {
  const pathname = usePathname();
  let isActive = pathname === item.to;
  if (
    pathname.includes(ROUTE_PATH.STUDENT) &&
    item.to.includes(ROUTE_PATH.STUDENT)
  ) {
    isActive = true;
  }
  return (
    <li>
      <Link href={item.to}>
        <div
          className={`flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-300
          ${isActive ? "bg-gray-300" : "bg-transparent"}`}
        >
          <span className={`ml-3 ${isActive ? "font-bold" : ""}`}>
            {item.label}
          </span>
        </div>
      </Link>
    </li>
  );
}
