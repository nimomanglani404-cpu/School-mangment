"use client";

import CrudPage from "@/components/CrudPage";
import { useStore } from "@/lib/store";

export default function StudentsPage() {
  const { data } = useStore();
  const classOptions = data.classes.map((c) => ({ value: c.id, label: c.name }));

  return (
    <CrudPage
      title="Students"
      noun="student"
      collection="students"
      searchKeys={["name", "fatherName", "rollNo"]}
      emptyHint="Add your first student to get started."
      fields={[
        { name: "name", label: "Student name", required: true },
        { name: "fatherName", label: "Father's name", required: true },
        { name: "rollNo", label: "Roll number", required: true },
        { name: "classId", label: "Class", type: "select", options: classOptions },
        { name: "phone", label: "Phone", type: "tel" },
      ]}
      columns={[
        { key: "rollNo", label: "Roll no." },
        { key: "name", label: "Name" },
        { key: "fatherName", label: "Father" },
        { key: "classId", label: "Class", render: (r, d) => d.classes.find((c) => c.id === r.classId)?.name || "—" },
        { key: "phone", label: "Phone" },
      ]}
    />
  );
}
