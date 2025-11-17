"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const dummyFeedbacks = [
  {
    id: 1,
    name: "Ibu Siti Nurhaliza",
    role: "Parent",
    message: "Aplikasi EduSafe sangat membantu saya untuk memantau kegiatan anak di sekolah. Tapi tolong ditambahkan fitur notifikasi real-time ketika anak sudah sampai sekolah atau pulang. Terima kasih!",
    date: "2025-11-15",
    time: "14:30",
    status: "unread"
  },
  {
    id: 2,
    name: "Bapak Ahmad Dahlan",
    role: "Parent",
    message: "Saya sangat terbantu dengan fitur absensi online. Namun, saya rasa perlu ada fitur chat dengan guru kelas agar komunikasi lebih lancar. Overall aplikasinya bagus!",
    date: "2025-11-14",
    time: "09:15",
    status: "read"
  },
  {
    id: 3,
    name: "Ibu Rina Wijaya",
    role: "Teacher",
    message: "Sebagai guru, saya merasa aplikasi ini sangat memudahkan dalam pencatatan kehadiran siswa. Tapi untuk fitur input aktivitas anak, bisa tidak dibuat lebih simple? Kadang loading-nya agak lama. Terima kasih atas perhatiannya.",
    date: "2025-11-13",
    time: "16:45",
    status: "read"
  },
  {
    id: 4,
    name: "Bapak Joko Susanto",
    role: "Parent",
    message: "Aplikasi bagus, tapi tolong perbaiki masalah login yang sering keluar sendiri. Saya harus login ulang berkali-kali dalam sehari. Mohon segera diperbaiki ya admin. Terima kasih!",
    date: "2025-11-12",
    time: "11:20",
    status: "read"
  },
  {
    id: 5,
    name: "Ibu Dewi Lestari",
    role: "Parent",
    message: "Alhamdulillah sangat terbantu dengan adanya EduSafe. Saran saya, tambahkan fitur riwayat kesehatan anak dan jadwal imunisasi. Juga mungkin bisa ditambahkan menu konsultasi dengan psikolog sekolah. Sukses terus untuk tim EduSafe! 💙",
    date: "2025-11-11",
    time: "08:00",
    status: "unread"
  },
];

export default function AdminKritikDanSaran() {
  const [feedbacks, setFeedbacks] = useState(dummyFeedbacks);
  const [filter, setFilter] = useState("all"); // all, read, unread

  const filteredFeedbacks = feedbacks.filter(fb => {
    if (filter === "all") return true;
    return fb.status === filter;
  });

  const unreadCount = feedbacks.filter(fb => fb.status === "unread").length;

  const markAsRead = (id) => {
    setFeedbacks(feedbacks.map(fb => 
      fb.id === id ? { ...fb, status: "read" } : fb
    ));
  };

  const deleteFeedback = (id) => {
    setFeedbacks(feedbacks.filter(fb => fb.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-[#0B3869] mb-2">
                Kritik & Saran
              </h1>
              <p className="text-gray-600">
                Dashboard Admin - Kelola masukan dari orang tua & guru
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-md">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-gray-700">
                {unreadCount} Belum dibaca
              </span>
            </div>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-3 mb-6"
        >
          {[
            { key: "all", label: "Semua", count: feedbacks.length },
            { key: "unread", label: "Belum Dibaca", count: unreadCount },
            { key: "read", label: "Sudah Dibaca", count: feedbacks.length - unreadCount }
          ].map((tab) => (
            <motion.button
              key={tab.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(tab.key)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                filter === tab.key
                  ? "bg-gradient-to-r from-[#0D58AB] to-[#1B77D2] text-white shadow-lg shadow-blue-500/30"
                  : "bg-white text-gray-600 hover:bg-gray-50 shadow-md"
              }`}
            >
              {tab.label} ({tab.count})
            </motion.button>
          ))}
        </motion.div>

        {/* Feedback List */}
        <div className="space-y-4">
          {filteredFeedbacks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-8 text-center shadow-md"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">Tidak ada kritik & saran</p>
            </motion.div>
          ) : (
            filteredFeedbacks.map((feedback, index) => (
              <motion.div
                key={feedback.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  if (feedback.status === "unread") {
                    markAsRead(feedback.id);
                  }
                }}
                className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-2 ${
                  feedback.status === "unread"
                    ? "border-red-200"
                    : "border-transparent"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0D58AB] to-[#1B77D2] rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {feedback.name.split(" ")[0].charAt(0)}{feedback.name.split(" ")[1]?.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{feedback.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        feedback.role === "Parent" 
                          ? "bg-purple-100 text-purple-700" 
                          : "bg-green-100 text-green-700"
                      }`}>
                        {feedback.role === "Parent" ? "Orang Tua" : "Guru"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {feedback.status === "unread" && (
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                    )}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Yakin ingin menghapus kritik & saran dari ${feedback.name}?`)) {
                          deleteFeedback(feedback.id);
                        }
                      }}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                    >
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </motion.button>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                  {feedback.message}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{feedback.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{feedback.time}</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-indigo-200/30 rounded-full blur-3xl -z-10" />
      </motion.div>
    </div>
  );
}
