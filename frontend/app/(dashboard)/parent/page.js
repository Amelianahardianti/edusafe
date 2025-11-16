'use client';

import ActivityBeranda from '@/app/components/userPage/ActivityBeranda';
import NotifBeranda from '@/app/components/userPage/NotifBeranda';
import { motion } from 'framer-motion';
import TabelBeranda from '@/app/components/userPage/TabelBeranda';
import CuacaBeranda from '@/app/components/userPage/CuacaBeranda';

export default function ParentDashboard() {
  return (
    <div className="pt-[4vh] min-h-screen bg-gray-50">


      <main className="max-w-10xl mx-[7vh] px-4 sm:px-6 lg:px-8 py-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-800 mb-6"
        >
          Dashboard Orang Tua
        </motion.h2>

        <div className="grid grid-flow-row xl:grid-cols-3 gap-6">
          <div>
            <NotifBeranda></NotifBeranda>
          </div>
          <div>
            <ActivityBeranda 
            name="MULAT ADI"
            type="Kelas"
            text="Melakukan Kelas Matematika"
            date="Rabu, 26 Oktober 2025"
            time_from="07.00"
            time_to="08.30"
            sender="Ir. Lorem Ipsum S.Pd.Fil"
            style="xl:w-[27vw] xl:h-[10vw] w-[80vw] h-[20vw]"></ActivityBeranda>
          </div>

          <div className='flex flex-col gap-[5vh]'>
            <CuacaBeranda></CuacaBeranda>
            <TabelBeranda></TabelBeranda>
          </div>
        </div>
      </main>
    </div>
  );
}

