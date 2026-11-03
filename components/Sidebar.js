"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SCHOOL_NAME } from "@/lib/config";
import { useStore } from "@/lib/store";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/students", label: "Students" },
  { href: "/teachers", label: "Teachers" },
  { href: "/classes", label: "Classes" },
  { href: "/attendance", label: "Attendance" },
  { href: "/fees", label: "Fees" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { resetData } = useStore();

  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark" aria-hidden="true">{SCHOOL_NAME.charAt(0)}</span>
        <div>
          <strong>{SCHOOL_NAME}</strong>
          <small>School management</small>
        </div>
      </div>
      <nav className="nav" aria-label="Main">
        {links.map((l) => {
          const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
          return (
            <Link key={l.href} href={l.href} className={active ? "active" : ""} aria-current={active ? "page" : undefined}>
              {l.label}
            </Link>
          );
        })}
      </nav>
      <button
        className="reset"
        onClick={() => confirm("Replace everything with the sample data?") && resetData()}
      >
        Reset sample data
      </button>
    </aside>
  );
}
