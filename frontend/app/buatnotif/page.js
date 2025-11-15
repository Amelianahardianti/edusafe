"use client";

import Navbar from "../components/userPage/NavbarDesktop";
import React from "react";
import Link from "next/link";

export default function CreateNotificationPage() {
  return (
    <div className="flex flex-col items-center mt-[10vh]">
      <Navbar />

      {/* Notification Form Section */}
      <section
        id="notification-form"
        className="bg-gray-50 font-sans p-4 sm:p-8 flex justify-center items-center min-h-screen w-full"
      >
        {/* Form Card */}
        <div className="w-full max-w-5xl bg-white border-[3px] border-black/10 rounded-[32px] py-[37px] px-4 sm:px-[43px]">
          <div className="flex flex-col gap-10">

            {/* Form Title */}
            <h1 className="text-2xl font-bold text-[#2B2F32]">
              Buat Notifikasi
            </h1>

            {/* Form Element */}
            <form className="flex flex-col gap-11">

              {/* Inputs Container */}
              <div className="flex flex-col gap-6">

                {/* Judul Input Field */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="judul"
                    className="text-xs text-[#5E6366] font-normal px-1"
                  >
                    Judul
                  </label>
                  <div className="bg-[#EFF1F9]/60 rounded-lg px-4 py-3">
                    <input
                      type="text"
                      id="judul"
                      placeholder="Select"
                      className="w-full bg-transparent text-base text-gray-800 leading-5 placeholder:text-[#ABAFB1] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Waktu Mulai Select Field */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="waktu-mulai"
                    className="text-xs text-[#5E6366] font-normal px-1"
                  >
                    Waktu Mulai
                  </label>
                  <div className="relative">
                    <select
                      id="waktu-mulai"
                      className="w-full appearance-none bg-[#EFF1F9]/60 rounded-lg px-4 py-3 text-base text-[#ABAFB1] leading-5 focus:outline-none focus:text-gray-800 cursor-pointer"
                    >
                      <option>Select</option>
                      <option value="now">Sekarang</option>
                      <option value="later">Nanti</option>
                    </select>

                    {/* Chevron icon */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                      <img
                        src="/assets/svg/chevron-down.svg"
                        alt="chevron down"
                        className="w-6 h-6"
                      />
                    </div>
                  </div>
                </div>

                {/* Waktu Selesai Select Field */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="waktu-selesai"
                    className="text-xs text-[#5E6366] font-normal px-1"
                  >
                    Waktu Selesai
                  </label>
                  <div className="relative">
                    <select
                      id="waktu-selesai"
                      className="w-full appearance-none bg-[#EFF1F9]/60 rounded-lg px-4 py-3 text-base text-[#ABAFB1] leading-5 focus:outline-none focus:text-gray-800 cursor-pointer"
                    >
                      <option>Select</option>
                      <option value="1h">1 Jam</option>
                      <option value="1d">1 Hari</option>
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                      <img
                        src="/assets/svg/chevron-down.svg"
                        alt="chevron down"
                        className="w-6 h-6"
                      />
                    </div>
                  </div>
                </div>

                {/* Isi Notifikasi Textarea Field */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="isi-notifikasi"
                    className="text-xs text-[#5E6366] font-normal px-1"
                  >
                    Isi Notifikasi
                  </label>
                  <div className="bg-[#EFF1F9]/60 rounded-lg px-4 py-3">
                    <textarea
                      id="isi-notifikasi"
                      placeholder="Maksimal 1000 karakter"
                      className="w-full bg-transparent text-base text-gray-800 leading-5 placeholder:text-[#ABAFB1] focus:outline-none resize-y"
                      rows="2"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full sm:w-[375px] self-start bg-[#608FC2] text-white font-bold text-base leading-6 rounded-xl py-[17px] flex items-center justify-center gap-2.5 hover:bg-opacity-90 transition-colors"
              >
                <span>Konfirmasi</span>
                <img
                  src="/assets/svg/Check.svg"
                  alt="confirm icon"
                  className="w-[17px] h-[17px]"
                />
              </button>

            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
