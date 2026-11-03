"use client";

import { useEffect, useMemo, useState } from "react";
import { useStore, todayISO } from "@/lib/store";

const STATES = [
  { value: "present", label: "Present" },
  { value: "absent", label: "Absent" },
  { value: "leave", label: "Leave" },
];

export default function AttendancePage() {
  const { data, saveAttendance } = useStore();
  const [classId, setClassId] = useState("");
  const [date, setDate] = useState(todayISO());
  const [marks, setMarks] = useState({});
  const [saved, setSaved] = useState(false);

  // Pick the first class once classes are available.
  useEffect(() => {
    if (!classId && data.classes.length) setClassId(data.classes[0].id);
  }, [data.classes, classId]);

  const students = useMemo(
    () => data.students.filter((s) => s.classId === classId),
    [data.students, classId]
  );

  // Load what was saved earlier for this class and date.
  useEffect(() => {
    const existing = data.attendance[date] || {};
    const next = {};
    students.forEach((s) => (next[s.id] = existing[s.id] || ""));
    setMarks(next);
    setSaved(false);
  }, [date, classId, students, data.attendance]);

  const counts = STATES.map((s) => ({
    ...s,
    n: Object.values(marks).filter((v) => v === s.value).length,
  }));

  function markAll(value) {
    const next = {};
    students.forEach((s) => (next[s.id] = value));
    setMarks(next);
    setSaved(false);
  }

  function save() {
    const filled = {};
    Object.entries(marks).forEach(([id, v]) => v && (filled[id] = v));
    saveAttendance(date, filled);
    setSaved(true);
  }

  return (
    <>
      <header className="page-head">
        <div>
          <h1>Attendance</h1>
          <p>Choose a class and date, then mark each student.</p>
        </div>
      </header>

      <div className="toolbar">
        <label className="inline">
          <span>Class</span>
          <select value={classId} onChange={(e) => setClassId(e.target.value)}>
            {data.classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </label>
        <label className="inline">
          <span>Date</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <button className="btn" onClick={() => markAll("present")} disabled={!students.length}>Mark all present</button>
      </div>

      {data.classes.length === 0 ? (
        <div className="empty"><p>Add a class and some students first.</p></div>
      ) : students.length === 0 ? (
        <div className="empty"><p>This class has no students yet.</p></div>
      ) : (
        <>
          <ul className="register">
            {students.map((s) => (
              <li key={s.id}>
                <div>
                  <strong>{s.name}</strong>
                  <small>Roll {s.rollNo}</small>
                </div>
                <div className="seg" role="radiogroup" aria-label={`Attendance for ${s.name}`}>
                  {STATES.map((st) => (
                    <button
                      key={st.value}
                      type="button"
                      role="radio"
                      aria-checked={marks[s.id] === st.value}
                      className={`${st.value} ${marks[s.id] === st.value ? "on" : ""}`}
                      onClick={() => { setMarks({ ...marks, [s.id]: st.value }); setSaved(false); }}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ul>

          <div className="save-row">
            <span className="muted">
              {counts.map((c) => `${c.n} ${c.label.toLowerCase()}`).join(" · ")}
            </span>
            <button className="btn primary" onClick={save}>Save attendance</button>
            {saved && <span className="ok-text" role="status">Attendance saved</span>}
          </div>
        </>
      )}
    </>
  );
}
