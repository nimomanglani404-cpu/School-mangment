"use client";

import CrudPage from "@/components/CrudPage";
import { useStore } from "@/lib/store";
import { CURRENCY } from "@/lib/config";

const monthLabel = (m) => {
  if (!m) return "—";
  const [y, mo] = m.split("-");
  return new Date(Number(y), Number(mo) - 1, 1).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
};

export default function FeesPage() {
  const { data } = useStore();
  const studentOptions = data.students.map((s) => ({ value: s.id, label: `${s.name} (Roll ${s.rollNo})` }));
  const nameOf = (id) => data.students.find((s) => s.id === id)?.name || "Removed student";

  return (
    <CrudPage
      title="Fees"
      noun="fee record"
      collection="fees"
      searchText={(r) => `${nameOf(r.studentId)} ${r.month} ${r.status}`}
      emptyHint="Add a fee record for a student."
      defaults={{ status: "unpaid", month: new Date().toISOString().slice(0, 7) }}
      fields={[
        { name: "studentId", label: "Student", type: "select", options: studentOptions, required: true },
        { name: "month", label: "Month", type: "month", required: true },
        { name: "amount", label: `Amount (${CURRENCY})`, type: "number", required: true },
        {
          name: "status",
          label: "Status",
          type: "select",
          options: [
            { value: "unpaid", label: "Unpaid" },
            { value: "paid", label: "Paid" },
          ],
        },
      ]}
      columns={[
        { key: "studentId", label: "Student", render: (r) => nameOf(r.studentId) },
        { key: "month", label: "Month", render: (r) => monthLabel(r.month) },
        { key: "amount", label: "Amount", render: (r) => `${CURRENCY} ${Number(r.amount).toLocaleString("en-PK")}` },
        {
          key: "status",
          label: "Status",
          render: (r) => (
            <span className={`badge ${r.status === "paid" ? "ok" : "due"}`}>{r.status === "paid" ? "Paid" : "Unpaid"}</span>
          ),
        },
      ]}
      rowActions={(row, { update }) =>
        row.status !== "paid" ? (
          <button className="link" onClick={() => update("fees", row.id, { status: "paid" })}>Mark paid</button>
        ) : null
      }
    />
  );
}
