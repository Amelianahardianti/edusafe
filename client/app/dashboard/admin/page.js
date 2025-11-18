'use client';

import DashboardLayout from '@/components/DashboardLayout';
import Card from '@/components/Card';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  return (
    <DashboardLayout title="Dashboard Admin" role="admin">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-2">Manajemen User</h3>
          <p className="text-gray-600 text-sm mb-4">
            Kelola data admin, guru, dan orang tua
          </p>
          <a
            href="/admin/users"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Lihat →
          </a>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-2">Manajemen Kelas</h3>
          <p className="text-gray-600 text-sm mb-4">
            Kelola data kelas dan wali kelas
          </p>
          <a
            href="/admin/classes"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Lihat →
          </a>
        </Card>
      </div>
    </DashboardLayout>
  );
}

