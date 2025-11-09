'use client';

import DashboardLayout from '@/components/DashboardLayout';
import Card from '@/components/Card';
import { motion } from 'framer-motion';

export default function TeacherDashboard() {
  return (
    <DashboardLayout title="Dashboard Guru" role="teacher">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-2">Presensi Siswa</h3>
          <p className="text-gray-600 text-sm mb-4">
            Input dan kelola presensi siswa
          </p>
          <a
            href="/teacher/attendance"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Lihat →
          </a>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-2">Catatan Aktivitas</h3>
          <p className="text-gray-600 text-sm mb-4">
            Buat catatan aktivitas harian siswa
          </p>
          <a
            href="/teacher/activities"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Lihat →
          </a>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-2">Broadcast</h3>
          <p className="text-gray-600 text-sm mb-4">
            Buat pengumuman untuk orang tua
          </p>
          <a
            href="/teacher/broadcasts"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Lihat →
          </a>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-2">Feedback</h3>
          <p className="text-gray-600 text-sm mb-4">
            Lihat feedback dari orang tua
          </p>
          <a
            href="/teacher/feedbacks"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Lihat →
          </a>
        </Card>
      </div>
    </DashboardLayout>
  );
}

