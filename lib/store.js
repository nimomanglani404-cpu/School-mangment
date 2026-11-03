"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { seed } from "./seed";

const KEY = "school-management-system-v1";
const Ctx = createContext(null);

export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

export function todayISO() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function StoreProvider({ children }) {
  const [data, setData] = useState(seed);
  const [ready, setReady] = useState(false);

  // Load saved data from this browser once on first render.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setData(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  // Save every change back to the browser.
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch {}
  }, [data, ready]);

  const add = (collection, item) =>
    setData((d) => ({ ...d, [collection]: [...d[collection], { ...item, id: uid() }] }));

  const update = (collection, id, patch) =>
    setData((d) => ({
      ...d,
      [collection]: d[collection].map((r) => (r.id === id ? { ...r, ...patch } : r)),
    }));

  const remove = (collection, id) =>
    setData((d) => {
      const next = { ...d, [collection]: d[collection].filter((r) => r.id !== id) };
      // Removing a student also removes their fee records.
      if (collection === "students") next.fees = d.fees.filter((f) => f.studentId !== id);
      return next;
    });

  const saveAttendance = (date, marks) =>
    setData((d) => ({
      ...d,
      attendance: { ...d.attendance, [date]: { ...(d.attendance[date] || {}), ...marks } },
    }));

  const resetData = () => setData(seed);

  return (
    <Ctx.Provider value={{ data, ready, add, update, remove, saveAttendance, resetData }}>
      {children}
    </Ctx.Provider>
  );
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
