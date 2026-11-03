"use client";

import Link from "next/link";
import { useStore, todayISO } from "@/lib/store";
import { CURRENCY } from "@/lib/config";

const money = (n) => `${CURRENCY} ${Number(n).toLocaleString("en-PK")}`;

export default function Dashboard() {
  const { data } = useStore();
  const today = todayISO();
  const marks = data.attendance[today] || {};
  const present = Object.values(marks).filter((v) => v === "present").length;
  const absent = Object.values(marks).filter((v) => v === "absent").length;
  const leave = Object.values(marks).filter((v) => v === "leave").length;
  const marked = present + absent + leave;

  const paid = data.fees.filter((f) => f.status === "paid").reduce((s, f) => s + f.amount, 0);
  const unpaid = data.fees.filter((f) => f.status !== "paid").reduce((s, f) => s + f.amount, 0);
  const feeTotal = paid + unpaid;

  const recent = [...data.students].slice(-5).reverse();
  const className = (id) => data.classes.find((c) => c.id === id)?.name || "No class";

  return (
    <>
      <header className="page-head">
        <div>
          <h1>Dashboard</h1>
          <p>{new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
      </header>

      <section className="strip" aria-label="Totals">
        <div><b>{data.students.length}</b><span>Students</span></div>
        <div><b>{data.teachers.length}</b><span>Teachers</span></div>
        <div><b>{data.classes.length}</b><span>Classes</span></div>
        <div><b>{marked ? Math.round((present / marked) * 100) + "%" : "–"}</b><span>Present today</span></div>
      </section>

      <div className="two-col">
        <section className="panel">
          <h2>Today&apos;s register</h2>
          {marked === 0 ? (
            <p className="muted">Attendance has not been taken today.</p>
          ) : (
            <>
              <div className="bar" role="img" aria-label={`${present} present, ${absent} absent, ${leave} on leave`}>
                <i className="seg-present" style={{ flex: present }} />
                <i className="seg-absent" style={{ flex: absent }} />
                <i className="seg-leave" style={{ flex: leave }} />
              </div>
              <ul className="legend">
                <li><i className="dot seg-present" /> {present} present</li>
                <li><i className="dot seg-absent" /> {absent} absent</li>
                <li><i className="dot seg-leave" /> {leave} on leave</li>
              </ul>
            </>
          )}
          <Link className="btn" href="/attendance">Take attendance</Link>
        </section>

        <section className="panel">
          <h2>Fees</h2>
          {feeTotal === 0 ? (
            <p className="muted">No fee records yet.</p>
          ) : (
            <>
              <div className="bar" role="img" aria-label={`${money(paid)} collected, ${money(unpaid)} pending`}>
                <i className="seg-present" style={{ flex: paid }} />
                <i className="seg-absent" style={{ flex: unpaid }} />
              </div>
              <ul className="legend">
                <li><i className="dot seg-present" /> {money(paid)} collected</li>
                <li><i className="dot seg-absent" /> {money(unpaid)} pending</li>
              </ul>
            </>
          )}
          <Link className="btn" href="/fees">Manage fees</Link>
        </section>
      </div>

      <section className="panel wide">
        <h2>Recently added students</h2>
        {recent.length === 0 ? (
          <p className="muted">No students yet.</p>
        ) : (
          <ul className="plain-list">
            {recent.map((s) => (
              <li key={s.id}>
                <span>{s.name}</span>
                <span className="muted">{className(s.classId)} · Roll {s.rollNo}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
