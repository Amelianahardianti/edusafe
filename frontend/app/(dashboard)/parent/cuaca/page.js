"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Sun,
  Cloud,
  CloudDrizzle,
  CloudLightning
} from "lucide-react";

export default function CuacaPage() {
  const currentWeather = {
    date: "Sabtu, 8 November 2025",
    time: "07.48",
    temp: "25°",
    feels: "27°",
    condition: "Cerah",
    location: "Di daerah Sekolah"
  };

  const hourlyForecast = [
    {
      time: "07.00",
      condition: "Cerah",
      icon: Sun,
      bg: "bg-[#CFF3FF]",
      textColor: "text-[#0B1F36]",
      subTextColor: "text-[#0B3869]/70",
      iconBg: "bg-white/60"
    },
    {
      time: "08.00",
      condition: "Cerah",
      icon: Sun,
      bg: "bg-[#FFE46D]",
      textColor: "text-[#3E2E00]",
      subTextColor: "text-[#5C4100]/70",
      iconBg: "bg-white/70"
    },
    {
      time: "09.00",
      condition: "Mendung",
      icon: Cloud,
      bg: "bg-[#FFF9D6]",
      textColor: "text-[#363018]",
      subTextColor: "text-[#5A4F2A]/80",
      iconBg: "bg-white/80"
    },
    {
      time: "10.00",
      condition: "Hujan Badai",
      icon: CloudLightning,
      bg: "bg-[#1F1C0F]",
      textColor: "text-white",
      subTextColor: "text-white/80",
      iconBg: "bg-white/20"
    },
    {
      time: "11.00",
      condition: "Hujan Ringan",
      icon: CloudDrizzle,
      bg: "bg-[#3A3415]",
      textColor: "text-white",
      subTextColor: "text-white/75",
      iconBg: "bg-white/20"
    },
    {
      time: "12.00",
      condition: "Mendung",
      icon: Cloud,
      bg: "bg-[#FFF9D6]",
      textColor: "text-[#363018]",
      subTextColor: "text-[#5A4F2A]/80",
      iconBg: "bg-white/80"
    }
  ];

  const weeklyForecast = [
    { day: "Sabtu", date: "8 Nov.", year: "2025", temp: "25°", condition: "Cerah" },
    { day: "Minggu", date: "9 Nov.", year: "2025", temp: "25°", condition: "Cerah" },
    { day: "Senin", date: "10 Nov.", year: "2025", temp: "25°", condition: "Cerah" },
    { day: "Selasa", date: "11 Nov.", year: "2025", temp: "25°", condition: "Cerah" },
    { day: "Rabu", date: "12 Nov.", year: "2025", temp: "25°", condition: "Cerah" },
    { day: "Kamis", date: "13 Nov.", year: "2025", temp: "25°", condition: "Cerah" },
    { day: "Jumat", date: "14 Nov.", year: "2025", temp: "25°", condition: "Cerah" }
  ];


  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#DDEFFD] via-white to-[#FDF0B5] py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -right-16 h-64 w-64 rounded-full bg-[#FFED24]/20 blur-3xl" />
        <div className="absolute top-40 -left-24 h-72 w-72 rounded-full bg-[#24C1DC]/20 blur-3xl" />
        <div className="absolute inset-x-0 bottom-24 mx-auto h-40 w-11/12 rounded-[40px] bg-white/40 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-col gap-10 px-4 sm:px-10 lg:px-14 xl:px-16">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-[#0B1F36] lg:text-5xl"
          >
            Prediksi Cuaca di Area Sekolah
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 rounded-full bg-white/80 px-5 py-2 shadow-lg"
          >
            <div className="rounded-full bg-[#FFED24] p-2 text-[#0B3869]">
              <Sun className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#0B3869]/70">Terakhir diperbarui</p>
              <p className="text-sm font-bold text-[#0B3869]">07.45 WIB</p>
            </div>
          </motion.div>
        </div>

        <div className="relative rounded-[32px] bg-white/55 p-6 shadow-2xl ring-1 ring-white/60 backdrop-blur">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] xl:gap-12">
            {/* Left column */}
            <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="overflow-hidden rounded-[20px] border-[6px] border-[#608FC2] bg-white shadow-xl"
            >
              <div className="border-b border-[#608FC2]/30 bg-[#FFED24] px-6 py-4">
                <p className="text-lg font-bold text-[#0B1F36]">{currentWeather.date}</p>
                <p className="text-sm font-semibold text-[#0B1F36]/70">Jadwal kegiatan sekolah aman</p>
              </div>

              <div className="bg-gradient-to-br from-[#A9E6F1] to-white px-6 py-8">
                <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
                  <div>
                    <p className="text-4xl font-bold text-[#0B1F36]">{currentWeather.time}</p>
                    <p className="mt-2 text-6xl font-black text-[#0B1F36]">{currentWeather.temp}</p>
                    <p className="text-lg font-semibold text-[#0B3869]">Terasa {currentWeather.feels}</p>
                    <p className="mt-4 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-[#0B3869]">
                      {currentWeather.location}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center text-[#0B3869]">
                    <Sun className="h-32 w-32 text-[#FFD84D]" />
                    <p className="mt-2 text-xl font-semibold">{currentWeather.condition}</p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-[#608FC2]/20">
                {hourlyForecast.map((hour, index) => (
                  <motion.div
                    key={hour.time}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.08 }}
                    className={`flex items-center justify-between px-6 py-4 ${hour.bg} ${hour.textColor}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`rounded-full ${hour.iconBg ?? "bg-white/40"} p-2`}>
                        <hour.icon className="h-8 w-8" />
                      </div>
                      <div>
                        <p className="text-base font-semibold">{hour.condition}</p>
                        <p className={`text-xs ${hour.subTextColor}`}>
                          Perubahan aktivitas luar ruang
                        </p>
                      </div>
                    </div>
                    <p className="text-2xl font-bold">{hour.time}</p>
                  </motion.div>
                ))}
              </div>
              </motion.div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="overflow-hidden rounded-[24px] border-[6px] border-[#608FC2] bg-white shadow-xl"
            >
              <div className="border-b border-[#608FC2]/30 bg-[#FFED24] px-6 py-6">
                <p className="text-2xl font-bold text-[#0B1F36]">Cuaca Mingguan</p>
                <p className="text-sm font-semibold text-[#0B3869]/70">8 - 14 November 2025</p>
              </div>
              <div className="grid grid-cols-2 gap-px border-t border-[#608FC2]/20 bg-[#608FC2]/20 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                {weeklyForecast.map((day, index) => (
                  <motion.div
                    key={`${day.day}-${day.date}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="flex flex-col items-center gap-3 bg-white px-4 py-6 text-center"
                  >
                    <Sun className="h-10 w-10 text-[#FFD84D]" />
                    <p className="text-sm font-semibold text-[#0B3869]/80">{day.condition}</p>
                    <p className="text-4xl font-black text-[#0B1F36]">{day.temp}</p>
                    <p className="text-sm font-semibold text-[#0B3869] leading-tight">
                      {day.day}
                      <br />
                      {day.date}
                      <br />
                      {day.year}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
