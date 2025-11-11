import React, { useEffect, useState } from "react";
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

  return (
    <div
  
      className="fixed inset-0 z-50 flex items-center justify-center"
    >

      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

   
      <div
        className="relative z-10 w-[40%] h-[40%] bg-white rounded-lg shadow-lg "
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex justify-between items-start ">
          <h2  className="text-xl font-semibold">
            Kritik dan Saran
          </h2>
          <button

            onClick={onClose}
            className=" text-gray-600 hover:text-gray-900"
          >
            ✕
          </button>
        </div>

    
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: handle login (call API, show errors, etc.)
            // close modal for demo:
            onClose();
          }}
          className="mt-4 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Kirim Kritik & Saran Anda
            </label>
            <textarea
              name="message"
              rows={4}
              className="mt-1 block w-full rounded-md border px-3 py-2"
              placeholder="Ketik Saran Anda di sini..."
              ></textarea>
          </div>


          <div className="flex justify-end gap-2">
            {/* <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border"
            >
              Kembali
            </button> */}
            <button type="submit" className="px-4 py-2 rounded-md bg-[#608FC2] text-white">
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Saran;
