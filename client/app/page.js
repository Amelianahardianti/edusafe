'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Loading from '@/components/Loading';

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      // Redirect berdasarkan role
      if (user?.role === 'admin') {
        router.push('/dashboard/admin');
      } else if (user?.role === 'teacher') {
        router.push('/dashboard/teacher');
      } else if (user?.role === 'parent') {
        router.push('/dashboard/parent');
      }
    } else if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="text-center">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Selamat Datang di EduSafe
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Platform komunikasi antara Admin, Guru, dan Orang Tua
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => router.push('/login')} variant="primary">
                Masuk
              </Button>
            </div>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
