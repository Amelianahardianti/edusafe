'use client';

import DashboardLayout from '@/components/DashboardLayout';
import Card from '@/components/Card';
import { motion } from 'framer-motion';

export default function ParentDashboard() {
  return (
    <DashboardLayout title="Dashboard Orang Tua" role="parent">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-2">Data Anak</h3>
          <p className="text-gray-600 text-sm mb-4">
            Lihat data anak Anda
          </p>
          <a
            href="/parent/children"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Lihat →
          </a>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-2">Presensi</h3>
          <p className="text-gray-600 text-sm mb-4">
            Lihat riwayat presensi anak
          </p>
          <a
            href="/parent/attendance"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Lihat →
          </a>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-2">Aktivitas Harian</h3>
          <p className="text-gray-600 text-sm mb-4">
            Lihat catatan aktivitas harian anak
          </p>
          <a
            href="/parent/activities"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Lihat →
          </a>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-2">Broadcast</h3>
          <p className="text-gray-600 text-sm mb-4">
            Lihat pengumuman dari sekolah
          </p>
          <a
            href="/parent/broadcasts"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Lihat →
          </a>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-2">Kirim Feedback</h3>
          <p className="text-gray-600 text-sm mb-4">
            Kirim masukan untuk sekolah
          </p>
          <a
            href="/parent/feedback"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Lihat →
          </a>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-2">Notifikasi</h3>
          <p className="text-gray-600 text-sm mb-4">
            Lihat notifikasi penting
          </p>
          <a
            href="/parent/notifications"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Lihat →
          </a>
        </Card>
      </div>
    </DashboardLayout>
  );
}

