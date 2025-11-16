"use client";
import { motion } from "framer-motion";
import NotificationSaranPage from "@/app/components/userPage/NotificationSaranPage";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { useAuthGuard } from "@/hooks/useAuthGuard";


// const DummyNotifications = [
// ];

export default function Notifikasi() {
  const {user, loading: authLoading} = useAuthGuard();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleDelete = async (id) => {
    const sure = window.confirm("Yakin ingin menghapus notifikasi ini?");
    if (!sure) return;
    try {
      await apiFetch(`/api/broadcasts/${id}`, {
        method: "DELETE",
      });
      setNotifications((prev) => prev.filter((n) => n._id !== id && n.id !== id));
    } catch (err) {
      alert("Gagal menghapus notifikasi: " + (err.message || ""));
    }
  };
  useEffect(() => {
    if (authLoading) return;
    let cancelled = false;

    async function load(){
      try {
        const data = await apiFetch("/api/broadcasts/all");
        console.log("Fetched notifications:", data);
        if (!cancelled) {
          const arr = Array.isArray(data) ? data : 
          data.broadcasts || data.items || data.data ||[];
          setNotifications(arr);
        }
    } catch (err) {
        if (!cancelled) {
          setError(err.message || "Gagal memuat notifikasi.");
        }
    } finally {
        if (!cancelled) {
          setLoading(false);
        }
    }
  }
    load();

    return () => {
      cancelled = true;
    };
  }, [authLoading]);

  if (authLoading || loading) {
    return (
       <div className="flex justify-center items-center h-[60vh]">
        Memuat notifikasi...</div>
    );
  }

  const list = notifications;
  return (
    <div className="flex flex-col items-center gap-y-[2vh] py-[5vh]">
      <div className="flex justify-between w-[90vw]"> <h1 className="font-bold text-3xl">Notifikasi</h1> <motion.button 
                      initial = {{ backgroundColor: "#0D58AB"}}
                      whileHover={{ scale: 1.1 , backgroundColor: "#0B3869"}}
                      whileTap={{ scale: 0.9, backgroundColor: "#608FC2" }}
                      className=" rounded-lg py-[1vh] px-[3vh] w-fit hover:underline text-white"
                    >
                      Buat Notifikasi
                    </motion.button></div>
      
      {notifications.map((notification) => (
        <NotificationSaranPage
          key={notification._id}
          headline={notification.title}
          text={notification.content}
          onDelete={() => handleDelete(notification._id)}
          button="Hapus"
        />
      ))}
    </div>
  );
}
