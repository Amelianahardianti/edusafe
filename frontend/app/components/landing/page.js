"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="relative  min-h-screen overflow-hidden">

    {/* Background Image */}
    <div className="absolute inset-0 -z-10">
      <Image
        src="/assets/images/kindergarten.png"
        alt="Children in a classroom setting"
        height={1080}
        width={1920}
        priority
        className="object-cover object-[center top]"
      />
      <div className="absolute inset-0 bg-black/25"></div>
    </div>



      {/* = NAVBAR = */}
      <nav className="absolute top-0 left-0 w-full h-[139px] flex items-center justify-between px-[41px] z-20">
        
        {/* LOGO */}
        <Image
          src="/assets/svg/logo.svg"
          alt="EduSafe Logo"
          width={77}
          height={87}
          className="w-[77px] h-[87px]"
        />

        {/* NAV LINKS */}
        <div className="flex items-center gap-[40px] font-nunito text-white font-bold text-[21px]">
          <Link href="#about" className="hover:text-[#50B0E5] transition">About Us</Link>
          <Link href="#articles" className="hover:text-[#50B0E5] transition">Articles</Link>
        </div>
      </nav>

      {/* = HERO CONTENT = */}
      <section className="relative z-10 flex items-center justify-center min-h-screen">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl w-full px-[41px]">

          {/* LEFT — HERO TITLE */}
          <div>
            <h1
              className="text-white font-lato font-black text-[88px] leading-[90px] tracking-tight"
              style={{
                textShadow: "0px 4px 4px rgba(0,0,0,0.25)",
                WebkitTextStroke: "1px #50B0E5",
              }}
            >
              Welcome to<br />EduSafe.
            </h1>

            <motion.button
              className="mt-8 w-[260px] h-[66px] rounded-[60px] border border-white/25 
                         bg-[#333] text-white font-lato text-[24px] font-semibold tracking-tight
                         hover:-translate-y-1 hover:bg-[#3b3b3b] 
                         hover:shadow-[0_20px_45px_rgba(80,176,229,0.25)]
                         transition-all"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              Get started
            </motion.button>
          </div>

          {/* RIGHT — HERO TEXT */}
          <div className="text-white font-nunito font-bold text-[25px] leading-[37.5px] text-justify max-w-[699px]">
            <p>
              Edusafe hadir untuk mendekatkan guru dan orang tua dalam mendampingi tumbuh kembang anak di sekolah.
              Melalui pencatatan aktivitas harian, kehadiran, dan komunikasi yang terpusat, setiap momen kecil anak
              menjadi lebih terlihat dan bermakna.
            </p>

            <p className="mt-6">
              Dengan informasi yang cepat, jelas, dan aman, Edusafe membantu orang tua merasa tenang,
              dan guru merasa lebih didukung dalam perannya.
            </p>
          </div>
        </div>
      </section>

      {/*  = WHY US =  */}
      <section id="whyus" className="bg-white py-24 sm:py-32 font-jakartasans">
        <div className="max-w-7xl mx-auto px-[41px]">

          <h2 className="text-center font-semibold text-6xl lg:text-7xl text-brand-blue-dark tracking-tight">
            Why Us?
          </h2>

          <div className="mt-20 grid md:grid-cols-3 gap-12">
            {[
              {
                img: "/assets/images/safetrusted.png",
                title: "Safe & Trusted",
                desc: "Platform kami menjamin keamanan data dan kenyamanan bagi orang tua dan guru."
              },
              {
                img: "/assets/images/realtimemonitoring.png",
                title: "Real-time Monitoring",
                desc: "Pantau aktivitas anak secara langsung kapan saja dan dari mana saja."
              },
              {
                img: "/assets/images/easytouse.png",
                title: "Easy to Use",
                desc: "Aplikasi didesain agar mudah digunakan oleh siapa pun tanpa pelatihan."
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="w-full h-[320px] object-cover rounded-xl shadow-lg"
                />

                <h3 className="mt-8 font-bold text-4xl text-brand-blue-dark">
                  {item.title}
                </h3>
                <p className="mt-4 text-2xl text-brand-blue-dark max-w-sm mx-auto">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* = CTA SECTION = */}
      <section className="bg-white py-28 font-jakartasans">
        <div className="max-w-7xl mx-auto px-[41px] grid lg:grid-cols-2 gap-16 items-center">

          <Image
            src="/assets/images/selamatdatang.png"
            width={1920}
            height={1080}
            alt="Teacher reading to children"
            className="object-contain"
          />

          <div className="space-y-6">
            <h2 className="font-bold text-5xl text-brand-blue-dark">Selamat Datang di Sekolah Kami</h2>

            <p className="text-2xl text-brand-blue-dark leading-relaxed">
              Kami menyediakan lingkungan belajar yang aman dan menyenangkan untuk anak-anak.
              Guru berpengalaman kami selalu siap mendampingi siswa dalam proses pembelajaran
              dan pengembangan diri.
            </p>

            <button className="px-12 py-3 border-2 border-brand-blue-dark rounded-full text-brand-blue-dark 
                               hover:bg-brand-blue-dark hover:text-white transition-colors text-xl">
              Login
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
