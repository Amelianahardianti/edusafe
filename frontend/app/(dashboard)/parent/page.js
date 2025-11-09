'use client';

import { motion } from 'framer-motion';

export default function ParentDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-800">EduSafe - Orang Tua Dashboard</h1>
            <button className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900">
              Keluar
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-800 mb-6"
        >
          Dashboard Orang Tua
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">Data Anak</h3>
            <p className="text-gray-600 text-sm mb-4">Lihat data anak Anda</p>
            <a href="/parent/children" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Lihat →
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">Presensi</h3>
            <p className="text-gray-600 text-sm mb-4">Lihat riwayat presensi anak</p>
            <a href="/parent/attendance" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Lihat →
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

