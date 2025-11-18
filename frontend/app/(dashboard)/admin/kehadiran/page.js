"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { apiFetch } from "@/lib/api";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function Tabel() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [children, setChildren] = useState([]);
  const [creating, setCreating] = useState(false);
  const initialFormState = { childID: "", status: "hadir", note: "", checkIn: "" };
  const [newAttendance, setNewAttendance] = useState(initialFormState);
  const { user, loading: authLoading } = useAuthGuard();


      useEffect(() => {
        if (!user) return; 
        let ignore = false;
        setLoading(true);

        async function load() {
          try {
            let result;

            if (user.role === "parent") {
              const childId = user.childIDs?.[0];
              if (!childId) {
                return console.error("Parent tidak punya childID");
              }
              result = await apiFetch(`/api/attendance/child/${childId}`);
            } else if (user.role === "teacher") {
              result = await apiFetch("/api/attendance/teacher");
            }  else {
              result = await apiFetch("/api/attendance");
            }

            const finalData = Array.isArray(result)
              ? result
              : result.data || [];

            if (!ignore) {
              setAttendance(finalData);
            }

            if ((user.role === "admin" || user.role === "teacher") && !ignore) {
              try {
                const childRes = await apiFetch("/api/children?limit=200");
                const childList = Array.isArray(childRes?.data)
                  ? childRes.data
                  : Array.isArray(childRes)
                  ? childRes
                  : [];
                setChildren(childList);
              } catch (childErr) {
                console.error("Gagal load daftar anak:", childErr);
              }
            }

          } catch (err) {
            console.error("Gagal load attendance:", err);
          } finally {
            if (!ignore) {
              setLoading(false);
            }
          }
        }

        load();
        return () => {
          ignore = true;
        };
      }, [user]);


  async function handleUpdate() {
  if (!selected) return;
  try {
    await apiFetch(`/api/attendance/${selected._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: selected.status,
        note: selected.note,
      }),
    });

    // update local state tanpa reload
    setAttendance((prev) =>
      prev.map((row) =>
        row._id === selected._id ? { ...row, ...selected } : row
      )
    );

    setIsModalOpen(false);
  } catch (err) {
    console.error("Gagal update:", err);
    alert("Gagal update kehadiran.");
  }
}

  async function handleCreate() {
    if (!newAttendance.childID) {
      return alert("Pilih anak terlebih dahulu.");
    }

    setCreating(true);
    try {
      const payload = {
        childID: newAttendance.childID,
        status: newAttendance.status,
      };

      if (newAttendance.checkIn) {
        payload.checkIn = new Date(newAttendance.checkIn).toISOString();
      }

      const created = await apiFetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (newAttendance.note) {
        try {
          await apiFetch(`/api/attendance/${created._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ note: newAttendance.note }),
          });
          created.note = newAttendance.note;
        } catch (noteErr) {
          console.error("Gagal simpan catatan awal:", noteErr);
        }
      }

      const childInfo = children.find((child) => child._id === payload.childID);
      const hydrated = {
        ...created,
        childID: childInfo ? { _id: childInfo._id, name: childInfo.name } : created.childID,
      };

      setAttendance((prev) => [hydrated, ...prev]);
      setIsCreateModalOpen(false);
      setNewAttendance(initialFormState);
    } catch (err) {
      console.error("Gagal input attendance:", err);
      alert(err.message || "Gagal input absen.");
    } finally {
      setCreating(false);
    }
  }


  if (authLoading) {
    return <p className="text-center mt-10 text-gray-600">Memeriksa sesi...</p>;
  }

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Memuat data...</p>;
  }

  const canManage = user?.role !== "parent";

  return (
    <div className="flex flex-col justify-center p-[5vh] w-[90vw]">
      <h1 className="font-bold text-2xl">Data Kehadiran</h1>

      {canManage && (
        <div className="flex justify-end mt-4">
          <motion.button
            initial={{ backgroundColor: "#0D58AB" }}
            whileHover={{ scale: 1.05, backgroundColor: "#0B3869" }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg px-6 py-2 text-white"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Input Absen
          </motion.button>
        </div>
      )}

      <table className="rounded-lg overflow-hidden mt-4 w-full">
        <thead>
          <tr className="bg-[#0B3869] text-white">
            <th className="px-4 py-3 text-left font-semibold">Name</th>
            <th className="px-4 py-3 text-left font-semibold">Check In</th>
            <th className="px-4 py-3 text-left font-semibold">Check Out</th>
            <th className="px-4 py-3 text-left font-semibold">Status</th>
            <th className="px-4 py-3 text-left font-semibold">Notes</th>
            <th className="px-4 py-3 text-left font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {attendance.map((item, index) => (
            <tr
              key={item._id}
              className={index % 2 === 0 ? "bg-[#DFE8F2]" : "bg-white"}
            >
              {/* Nama Anak */}
              <td className="px-4 py-3 text-gray-700">
                {item.childID?.name || "-"}
              </td>

              {/* Check In */}
              <td className="px-4 py-3 text-gray-700">
                {item.checkIn
                  ? new Date(item.checkIn).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "-"}
              </td>

              {/* Check Out */}
              <td className="px-4 py-3 text-gray-700">
                {item.checkOut
                  ? new Date(item.checkOut).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "-"}
              </td>

              {/* Status */}
              <td className="px-4 py-3">
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                    item.status === "hadir"
                      ? "bg-green-500"
                      : item.status === "sakit"
                      ? "bg-yellow-500"
                      : item.status === "izin"
                      ? "bg-blue-500"
                      : "bg-red-500"
                  }`}
                >
                  {item.status}
                </span>
              </td>

              {/* Note */}
              <td className="px-4 py-3 text-gray-700">{item.note || "-"}</td>

              {/* Action */}
                <td className="px-4 py-3">
                  {user.role !== "parent" && (
                    <motion.button
                      initial={{ backgroundColor: "#0D58AB" }}
                      whileHover={{ scale: 1.1, backgroundColor: "#0B3869" }}
                      whileTap={{ scale: 0.9, backgroundColor: "#608FC2" }}
                      className="rounded-lg p-[1vh] w-[80%] hover:underline text-white"
                      onClick={() => {
                        setSelected(item);
                        setIsModalOpen(true);
                      }}
                    >
                      Edit
                    </motion.button>
)}


              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white p-6 w-[400px] rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Edit Kehadiran</h2>

      {/* STATUS */}
      <label className="block text-sm mb-1">Status</label>
      <select
        value={selected?.status || ""}
        onChange={(e) =>
          setSelected((prev) => ({ ...prev, status: e.target.value }))
        }
        className="w-full p-2 border rounded-lg mb-4"
      >
        <option value="hadir">Hadir</option>
        <option value="sakit">Sakit</option>
        <option value="izin">Izin</option>
        <option value="alfa">Alfa</option>
      </select>

      {/* NOTE */}
      <label className="block text-sm mb-1">Catatan</label>
      <textarea
        value={selected?.note || ""}
        onChange={(e) =>
          setSelected((prev) => ({ ...prev, note: e.target.value }))
        }
        className="w-full p-2 border rounded-lg mb-4"
      />

      {/* BUTTONS */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          className="px-4 py-2 rounded-lg bg-gray-300"
          onClick={() => setIsModalOpen(false)}
        >
          Batal
        </button>

        <button
          className="px-4 py-2 rounded-lg bg-[#0B3869] text-white"
          onClick={() => handleUpdate()}
        >
          Simpan
        </button>
      </div>
    </div>
  </div>
)}

      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-[420px] rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Input Kehadiran</h2>

            <label className="block text-sm mb-1">Nama Anak</label>
            <select
              value={newAttendance.childID}
              onChange={(e) =>
                setNewAttendance((prev) => ({ ...prev, childID: e.target.value }))
              }
              className="w-full p-2 border rounded-lg mb-4"
            >
              <option value="">Pilih Anak</option>
              {children.map((child) => (
                <option key={child._id} value={child._id}>
                  {child.name}
                </option>
              ))}
            </select>

            <label className="block text-sm mb-1">Status</label>
            <select
              value={newAttendance.status}
              onChange={(e) =>
                setNewAttendance((prev) => ({ ...prev, status: e.target.value }))
              }
              className="w-full p-2 border rounded-lg mb-4"
            >
              <option value="hadir">Hadir</option>
              <option value="sakit">Sakit</option>
              <option value="izin">Izin</option>
              <option value="alfa">Alfa</option>
            </select>

            <label className="block text-sm mb-1">Waktu Check In (opsional)</label>
            <input
              type="datetime-local"
              value={newAttendance.checkIn}
              onChange={(e) =>
                setNewAttendance((prev) => ({ ...prev, checkIn: e.target.value }))
              }
              className="w-full p-2 border rounded-lg mb-4"
            />

            <label className="block text-sm mb-1">Catatan (opsional)</label>
            <textarea
              value={newAttendance.note}
              onChange={(e) =>
                setNewAttendance((prev) => ({ ...prev, note: e.target.value }))
              }
              className="w-full p-2 border rounded-lg mb-4"
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 rounded-lg bg-gray-300"
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setNewAttendance(initialFormState);
                }}
              >
                Batal
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-[#0B3869] text-white disabled:opacity-60"
                onClick={handleCreate}
                disabled={creating}
              >
                {creating ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
