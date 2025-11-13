"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Saran = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle form submission (call API, show errors, etc.)
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div
        className="relative z-10 w-[80%] h-[80%] md:h-[60%] bg-white rounded-lg shadow-lg md:p-[5vh] p-[5vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-[3vh]">
          <h2 className="text-xl font-bold">Kritik dan Saran</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:bg-amber-200 rounded-full h-[3vh] p"
          >
            ✕ Kembali
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-[3vh]">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kirim Kritik & Saran Anda untuk Admin
            </label>
            <textarea
              name="message"
              rows={4}
              className="w-full rounded-md border p-2 resize-none md:h-[30vh] h-[60vh] focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ketik Saran Anda di sini..."
            />
          </div>

          <div className=" justify-between">
            <button
              type="submit"
              className="w-full h-auto py-[2vh] rounded-md bg-[#608FC2] text-white hover:bg-[#4a7ba7] transition-color"
            >
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Saran;
