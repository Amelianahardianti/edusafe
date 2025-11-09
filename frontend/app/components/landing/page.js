'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/assets/images/kindergarten.png"
          alt="Children learning"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full min-h-screen">
        {/* Navbar */}
        <nav className="absolute top-0 left-0 w-full h-[139px] px-4 sm:px-6 lg:px-[41px]">
          {/* Logo */}
          <div className="absolute left-4 sm:left-6 lg:left-[41px] top-4 sm:top-6 lg:top-[25px]">
            <Image
              src="/assets/svg/logo.svg"
              alt="EduSafe Logo"
              width={77}
              height={87}
              className="w-12 h-14 sm:w-16 sm:h-[72px] lg:w-[77px] lg:h-[87px]"
            />
          </div>

          {/* Nav Links */}
          <div className="absolute right-4 sm:right-8 lg:right-[25px] top-8 sm:top-10 lg:top-[52px] flex items-center gap-4 sm:gap-6 lg:gap-[40px] font-nunito">
            <Link 
              href="#about" 
              className="text-white font-bold text-sm sm:text-base lg:text-[21px] hover:text-[#50B0E5] transition-colors duration-200"
            >
              About Us
            </Link>
            <Link 
              href="#articles" 
              className="text-white font-bold text-sm sm:text-base lg:text-[21px] hover:text-[#50B0E5] transition-colors duration-200"
            >
              Articles
            </Link>
          </div>
        </nav>

        {/* Hero Text - Left Side */}
        <div className="absolute left-4 sm:left-6 lg:left-[41px] top-[200px] sm:top-[300px] lg:top-[412px] flex flex-col gap-4 sm:gap-6 lg:gap-6 max-w-full lg:max-w-[684px] px-4 sm:px-6 lg:px-0">
          <h1 
            className="text-white font-black text-4xl sm:text-5xl md:text-6xl lg:text-[88px] leading-tight lg:leading-normal font-lato"
            style={{
              textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              WebkitTextStroke: '1px #50B0E5'
            }}
          >
            Welcome to
            <br />
            EduSafe.
          </h1>

          {/* CTA Button */}
          <motion.div
            className="relative z-20"
            style={{ marginTop: '24px' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.9, ease: 'easeOut' }}
          >
            <button
              className="w-[210px] h-[58px] sm:w-[230px] sm:h-[62px] lg:w-[260px] lg:h-[66px] rounded-[60px] border border-white/18 bg-[#333333] text-white font-lato font-semibold text-lg sm:text-xl lg:text-[24px] tracking-tight transition-all duration-300 hover:-translate-y-1 hover:bg-[#3b3b3b] hover:shadow-[0_20px_45px_rgba(80,176,229,0.25)] focus:outline-none focus:ring-2 focus:ring-[#50B0E5]/60 focus:ring-offset-2 focus:ring-offset-transparent"
              onClick={(e) => {
                e.preventDefault();
                console.log('Get started clicked');
              }}
              style={{ pointerEvents: 'auto' }}
            >
              Get started
            </button>
          </motion.div>
        </div>

        {/* Description - Right Side */}
        <div className="absolute right-4 sm:right-6 lg:right-[41px] top-[412px] w-[699px] px-4 sm:px-6 lg:px-0">
                      <div className="text-white font-bold text-base sm:text-lg md:text-xl lg:text-[25px] leading-relaxed lg:leading-[37.5px] text-justify font-nunito">
            <p>
              Edusafe hadir untuk mendekatkan guru dan orang tua dalam mendampingi
              tumbuh kembang anak di sekolah. Melalui pencatatan aktivitas harian,
              kehadiran, dan komunikasi yang terpusat, setiap momen kecil anak
              menjadi lebih terlihat dan bermakna.
            </p>
            <br />
            <p>
              Dengan informasi yang cepat, jelas, dan aman, Edusafe membantu orang
              tua merasa tenang, dan guru merasa lebih didukung dalam perannya.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

