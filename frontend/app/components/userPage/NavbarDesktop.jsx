"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Saran from "@/app/components/userPage/Saran";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isSaranOpen, setIsSaranOpen] = useState(false);

  
  const baseRoute = pathname.startsWith("/parent")
    ? "/parent"
    : pathname.startsWith("/teacher")
    ? "/teacher"
    : pathname.startsWith("/admin")
    ? "/admin"
    : "";

  return (
    <>
    <div className="bg-[#0B3869] lg:flex justify-between items-center pl-[2vw] h-[10vh] w-full fixed top-0 z-50 shadow-md hidden">
      {/* Logo */}
      <Link href={`${baseRoute || "/"}`} className="inline-block relative">
        <Image
          src="/assets/svg/logo.svg"
          width={50}
          height={50}
          alt="Navbar Logo"
        />
      </Link>

      {/* Navbar */}
      <ul className="flex h-full">
        <li className="cursor-pointer font-code bg-[#0B3869] hover:bg-[#24C1DC] hover:text-black text-white flex items-center justify-center h-full w-[10vw]">
          <Link href="/" className="block w-full h-full text-center leading-[5vw]">
            Beranda
          </Link>
        </li>

        <li className="cursor-pointer font-code bg-[#0B3869] hover:bg-[#24C1DC] hover:text-black text-white flex items-center justify-center h-full w-[13vw]">
          <Link href={`${baseRoute}/aktivitas`} className="block w-full h-full text-center leading-[5vw]">
            Aktivitas
          </Link>
        </li>

        <li className="cursor-pointer font-code bg-[#0B3869] hover:bg-[#FFED24] hover:text-black text-white flex items-center justify-center h-full w-[13.5vw]">
          <Link href={`${baseRoute}/kehadiran`} className="block w-full h-full text-center leading-[5vw]">
            Kehadiran
          </Link>
        </li>

        <li className="cursor-pointer font-code bg-[#0B3869] hover:bg-[#FFED24] hover:text-black text-white flex items-center justify-center h-full w-[9vw]">
          <Link href={`${baseRoute}/cuaca`} className="block w-full h-full text-center leading-[5vw]">
            Cuaca
          </Link>
        </li>
         <li className="cursor-pointer font-code bg-[#0B3869] hover:bg-[#FF3B8F] hover:text-black text-white flex items-center justify-center h-full w-[9vw]">
          <Link href={`${baseRoute}/notifikasi`} className="block w-full h-full text-center leading-[5vw]">
            Notifikasi
          </Link>
        </li>

        <li
          className="cursor-pointer font-code hover:bg-[#FF3B8F] hover:text-black flex items-center justify-center h-full w-[10vw] bg-[#0B3869] text-white"
           onClick={() => setIsSaranOpen(true)}
        >
          <span className="block w-full h-full text-center leading-[5vw]">
            Kritik & Saran
          </span>
        </li>
      </ul>
    </div>
    <Saran open={isSaranOpen} onClose={() => setIsSaranOpen(false)} />
    </>
  );
};

export default Navbar;
