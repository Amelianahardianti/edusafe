"use client";
import React, { useEffect, useState } from "react";
import weatherData from "@/app/components/mockData/data_center";
import ActivityBeranda from '@/app/components/userPage/ActivityBeranda';


const activityList = [
    {
      style: "w-full h-full",
      type: "Kelas",
      name: "MULAT ADI",
      text: "melakukan Kelas Matematika untuk hari ini!",
      date: "Rabu, 26 Oktober 2025",
      time_from: "07.00",
      time_to: "08.30",
      sender: "Ir. Lorem Ipsum S.Pd.Fil",
    },
    {
      style: "w-full h-full",
      type: "Aktivitas",
      name: "[Nama Murid 1]",
      text: "akan melakukan Jalan Pagi mengelilingi kota untuk hari ini!",
      date: "Rabu, 26 Oktober 2025",
      time_from: "07.00",
      time_to: "08.30",
      sender: "Wali Kelas",
    },
    {
      style: "w-full h-full",
      type: "Pemberitahuan",
      name: "[Nama Murid 1]",
      text: "sudah menyelesaikan sekolah untuk hari ini!",
      date: "Rabu, 26 Oktober 2025",
      time_from: "12.30",
      time_to: "lmao",
      sender: "Admin Sekolah",
    },
  ];
  

export default function ActivityAnakPage() {

    const [currentTime, setCurrentTime] = useState(new Date());
    const [weatherForecast, setWeatherForecast] = useState([]);
    useEffect(() => {
        // Update current time
        setCurrentTime(new Date());
        
        // Get weather forecast for next 6 hours
        const forecast = getNext6HoursWeather();
        setWeatherForecast(forecast);
    }, []);
      const getNext6HoursWeather = () => {
        const now = new Date();
        const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
        const currentHour = now.getHours();
        
        const forecast = [];
        
        for (let i = 0; i < 6; i++) {
            const targetDate = new Date(now.getTime() + i * 60 * 60 * 1000);
            const targetDay = targetDate.toLocaleDateString('en-US', { weekday: 'long' });
            const targetHour = targetDate.getHours();
            const hourString = `${targetHour.toString().padStart(2, '0')}:00`;
            
            const weatherItem = weatherData.find(
                item => item.day === targetDay && item.hour === hourString
            );
            
            forecast.push({
                hour: hourString,
                weather: weatherItem ? weatherItem.weather : 'sunny',
                day: targetDay
            });
        }
        
        return forecast;
    };
       const formatDate = () => {
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                       'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        
        const dayName = days[currentTime.getDay()];
        const date = currentTime.getDate();
        const month = months[currentTime.getMonth()];
        const year = currentTime.getFullYear();
        
        return `${dayName}, ${date} ${month} ${year}`;
    };
   
  return (
    <div className="min-h-screen w-full bg-[#F5F7FA]">
      {/* Navbar sudah di layout, jadi ini cuma isi halamannya */}
      <main className="max-w-[80vw] mx-auto px-4 md:px-8 py-8">
        {/* Judul & tanggal utama */}
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Aktivitas Anak</h1>
          <p className="text-sm text-slate-600 mt-1">{formatDate()}</p>
        </header>

        {/* Bar filter atas (input tanggal) */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {/* pill aktif Kelas */}
          <button className="flex items-center gap-2 bg-[#24C1DC] text-white text-xs md:text-sm font-semibold px-4 py-1 rounded-full">
            <span>Kelas</span>
            <span className="text-[10px] bg-black/20 rounded-full px-2 py-0.5">X</span>
          </button>

          {/* pill lain (dummy) */}
          <button className="border border-slate-300 text-xs md:text-sm text-slate-700 px-4 py-1 rounded-full">
            Aktivitas
          </button>
          <button className="border border-slate-300 text-xs md:text-sm text-slate-700 px-4 py-1 rounded-full">
            Pemberitahuan
          </button>

          {/* input tanggal di kanan */}
          <div className="ml-auto">
            <input
              type="text"
              placeholder="Tanggal Kegiatan"
              className="border border-slate-300 rounded-md px-3 py-1 text-[11px] md:text-sm"
            />
          </div>
        </div>

        {/* LIST KARTU AKTIVITAS */}
        <div className="flex flex-col gap-5">
            {activityList.map((item, idx) => (
                <ActivityBeranda
                key={idx}
                style={item.style}
                type={item.type}
                name={item.name}
                text={item.text}
                date={item.date}
                time_from={item.time_from}
                time_to={item.time_to}
                sender={item.sender}
                />
            ))}
        </div>
      </main>
    </div>
  );
}
