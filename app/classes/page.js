"use client";

import CrudPage from "@/components/CrudPage";
import { useStore } from "@/lib/store";

export default function ClassesPage() {
  const { data } = useStore();
  const teacherOptions = [
    { value: "", label: "Not assigned" },
    ...data.teachers.map((t) => ({ value: t.id, label: `${t.name} (${t.subject})` })),
  ];

  return (
    <CrudPage
      title="Classes"
      noun="class"
      collection="classes"
      searchKeys={["name", "room"]}
      emptyHint="Add a class, then assign students and a class teacher."
      fields={[
        { name: "name", label: "Class name (e.g. Class 5-A)", required: true },
        { name: "teacherId", label: "Class teacher", type: "select", options: teacherOptions },
        { name: "room", label: "Room" },
      ]}
      columns={[
        { key: "name", label: "Class" },
        { key: "teacherId", label: "Class teacher", render: (r, d) => d.teachers.find((t) => t.id === r.teacherId)?.name || "—" },
        { key: "room", label: "Room" },
        { key: "count", label: "Students", render: (r, d) => d.students.filter((s) => s.classId === r.id).length },
      ]}
    />
  );
}
