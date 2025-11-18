'use client';

import { useEffect, useState } from 'react';
import ActivityBeranda from '@/app/components/userPage/ActivityBeranda';
import NotifBeranda from '@/app/components/userPage/NotifBeranda';
import { motion } from 'framer-motion';
import TabelBeranda from '@/app/components/userPage/TabelBeranda';
import CuacaBeranda from '@/app/components/userPage/CuacaBeranda';
import { apiFetch } from '@/lib/api';

export default function ParentDashboard() {
  const [latestActivity, setLatestActivity] = useState(null);
  const [loadingActivity, setLoadingActivity] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await apiFetch('/api/activitychildren');
        const list = data?.data || [];

        if (!list.length) {
          setLatestActivity(null);
          return;
        }

        const a = list[0];

        const formattedDate = a.Date
          ? new Date(a.Date).toLocaleDateString('id-ID', {
              weekday: 'long',
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })
          : '';

        setLatestActivity({
          name: a.ChildID?.name || 'Anak',
          type: 'Aktivitas',
          text: a.Activity || '',
          date: formattedDate,
          time_from: a.TimeStart || '',
          time_to: a.TimeEnd || '',
          sender: a.TeacherID?.name || 'Guru',
        });
      } catch (error) {
        console.error(error);
        setLatestActivity(null);
      } finally {
        setLoadingActivity(false);
      }
    };

    load();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <main className="px-6 sm:px-8 lg:px-12 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B3869]">
            Dashboard Orang Tua
          </h2>
          <p className="text-gray-600 mt-2">
            Selamat datang kembali! Pantau aktivitas dan perkembangan anak Anda.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <NotifBeranda />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-6 flex justify-center"
          >
            <div className="w-full max-w-2xl">
              {loadingActivity ? (
                <div className="bg-white rounded-lg shadow p-6 text-center text-gray-600">
                  Memuat aktivitas anak...
                </div>
              ) : !latestActivity ? (
                <div className="bg-white rounded-lg shadow p-6 text-center text-gray-600">
                  Belum ada catatan aktivitas.
                </div>
              ) : (
                <ActivityBeranda
                  name={latestActivity.name}
                  type={latestActivity.type}
                  text={latestActivity.text}
                  date={latestActivity.date}
                  time_from={latestActivity.time_from}
                  time_to={latestActivity.time_to}
                  sender={latestActivity.sender}
                  style="w-full h-auto"
                />
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="rounded-lg shadow-xl overflow-hidden h-full flex flex-col">
              <CuacaBeranda />
              <TabelBeranda />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
