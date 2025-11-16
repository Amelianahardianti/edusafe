"use client";
import { motion } from "framer-motion";

const presensiData = [
  {
    id: 1,
    name: 'Mulat Adi',
    status: 'Hihihi',
  },
  {
    id: 2,
    name: 'Mulat Adi',
    status: 'Hihihi',
  },
  {
    id: 3,
    name: 'Mulat Adi',
    status: 'Hihihi',
  },
  {
    id: 4,
    name: 'Mulat Adi',
    status: 'Hihihi',
  },
  {
    id: 5,
    name: 'Mulat Adi',
    status: 'Hihihi',
  },
];

const TabelBeranda = () => {
    return (
         <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-2">Presensi Hari Ini</h3>
            
          <table className="">
            <thead>
              <tr className="bg-[#0B3869] text-white">
                <th className="px-4 py-3 text-left font-semibold">Name</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {presensiData.map((presensi, index) => (
                <tr
                  key={presensi.id}
                  className={index % 2 === 0 ? 'bg-[#DFE8F2]' : 'bg-white'}
                >
                  <td className="px-4 py-3 text-gray-700">{presensi.name}</td>
                  <td className="px-4 py-3 text-gray-700">{presensi.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       
    
    );
}
export default TabelBeranda;