'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from '@/components/Loading';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { motion } from 'framer-motion';

export default function DashboardLayout({ children, title, role }) {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    } else if (!loading && user?.role !== role) {
      // Redirect ke dashboard sesuai role
      if (user?.role === 'admin') router.push('/dashboard/admin');
      else if (user?.role === 'teacher') router.push('/dashboard/teacher');
      else if (user?.role === 'parent') router.push('/dashboard/parent');
    }
  }, [loading, isAuthenticated, user, role, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-800">EduSafe</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {user?.name} ({user?.role})
              </span>
              <Button variant="outline" size="sm" onClick={logout}>
                Keluar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-gray-800 mb-6"
          >
            {title}
          </motion.h2>
        )}
        {children}
      </main>
    </div>
  );
}

