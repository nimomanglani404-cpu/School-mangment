"use client";

import CrudPage from "@/components/CrudPage";
import { CURRENCY } from "@/lib/config";

export default function TeachersPage() {
  return (
    <CrudPage
      title="Teachers"
      noun="teacher"
      collection="teachers"
      searchKeys={["name", "subject"]}
      emptyHint="Add your first teacher to get started."
      fields={[
        { name: "name", label: "Teacher name", required: true },
        { name: "subject", label: "Subject", required: true },
        { name: "phone", label: "Phone", type: "tel" },
        { name: "salary", label: `Monthly salary (${CURRENCY})`, type: "number" },
      ]}
      columns={[
        { key: "name", label: "Name" },
        { key: "subject", label: "Subject" },
        { key: "phone", label: "Phone" },
        { key: "salary", label: "Salary", render: (r) => `${CURRENCY} ${Number(r.salary).toLocaleString("en-PK")}` },
      ]}
    />
  );
}
