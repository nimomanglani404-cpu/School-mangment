"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import Modal from "./Modal";

/**
 * A reusable list + add/edit/delete page.
 *  fields:  [{ name, label, type?, options?, required? }]   (type: text | number | tel | month | select)
 *  columns: [{ key, label, render?(row, data) }]
 */
export default function CrudPage({
  title,
  noun,
  collection,
  fields,
  columns,
  searchKeys = ["name"],
  searchText,
  emptyHint,
  rowActions,
  defaults = {},
}) {
  const { data, add, update, remove } = useStore();
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null); // null | "new" | row
  const [form, setForm] = useState({});

  const q = query.toLowerCase();
  const rows = data[collection].filter((r) =>
    searchText
      ? searchText(r, data).toLowerCase().includes(q)
      : searchKeys.some((k) => String(r[k] ?? "").toLowerCase().includes(q))
  );

  function openNew() {
    const blank = {};
    fields.forEach((f) => (blank[f.name] = f.options && f.options.length ? f.options[0].value : ""));
    setForm({ ...blank, ...defaults });
    setEditing("new");
  }

  function openEdit(row) {
    setForm({ ...row });
    setEditing(row);
  }

  function submit(e) {
    e.preventDefault();
    const clean = { ...form };
    fields.forEach((f) => {
      if (f.type === "number") clean[f.name] = Number(clean[f.name] || 0);
    });
    if (editing === "new") add(collection, clean);
    else update(collection, editing.id, clean);
    setEditing(null);
  }

  return (
    <>
      <header className="page-head">
        <div>
          <h1>{title}</h1>
          <p>{rows.length} {rows.length === 1 ? noun : noun + "s"}{query ? " found" : ""}</p>
        </div>
        <div className="head-actions">
          <input
            className="search"
            type="search"
            placeholder={`Search ${noun}s`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={`Search ${noun}s`}
          />
          <button className="btn primary" onClick={openNew}>Add {noun}</button>
        </div>
      </header>

      {rows.length === 0 ? (
        <div className="empty">
          <p>{query ? `No ${noun} matches “${query}”.` : emptyHint || `No ${noun}s yet.`}</p>
          {!query && <button className="btn primary" onClick={openNew}>Add {noun}</button>}
        </div>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                {columns.map((c) => <th key={c.key}>{c.label}</th>)}
                <th className="right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  {columns.map((c) => (
                    <td key={c.key} data-label={c.label}>{c.render ? c.render(row, data) : row[c.key]}</td>
                  ))}
                  <td className="right actions">
                    {rowActions && rowActions(row, { update })}
                    <button className="link" onClick={() => openEdit(row)}>Edit</button>
                    <button
                      className="link danger"
                      onClick={() => confirm(`Delete this ${noun}?`) && remove(collection, row.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <Modal title={editing === "new" ? `Add ${noun}` : `Edit ${noun}`} onClose={() => setEditing(null)}>
          <form className="form" onSubmit={submit}>
            {fields.map((f) => (
              <label key={f.name}>
                <span>{f.label}</span>
                {f.type === "select" ? (
                  <select
                    value={form[f.name] ?? ""}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    required={f.required}
                  >
                    {(f.options || []).map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={f.type || "text"}
                    value={form[f.name] ?? ""}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    required={f.required}
                    min={f.type === "number" ? 0 : undefined}
                  />
                )}
              </label>
            ))}
            <div className="form-actions">
              <button type="button" className="btn" onClick={() => setEditing(null)}>Cancel</button>
              <button type="submit" className="btn primary">Save {noun}</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
