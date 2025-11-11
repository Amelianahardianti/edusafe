
import React from "react";
// import { FiPhone, FiHome, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="w-full  bg-[#0B3869] text-white h-[40vh]  xl:mx-[10vw] p-8 md:p-12 space-x-[10vw]">
      <div className=" md:px-10 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* LEFT: About us */}
        <div className="">
          <h3 className="text-3xl md:text-4xl font-extrabold mb-6 ">About us</h3>

          
            Sekolah kami merupakan lembaga pendidikan yang berkomitmen untuk
            membentuk generasi muda yang cerdas, berkarakter, dan berdaya saing
            tinggi. Berdiri sejak tahun [tahun berdiri], kami terus berkembang
            menjadi sekolah yang unggul dalam bidang akademik maupun
            non-akademik.
    
        </div>

        {/* RIGHT: Contact */}
        <div>
          <h3 className="text-3xl md:text-4xl font-extrabold mb-6">Contact</h3>

          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <span className="mt-1">
                {/* <FiPhone className="w-6 h-6" /> */}
              </span>
              <div className="text-[1.02rem]">
                <div className="opacity-95">(021) 1234–5678</div>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <span className="mt-1">
                {/* <FiHome className="w-6 h-6" /> */}
              </span>
              <div className="text-[1.02rem] max-w-md">
                <div className="opacity-95">
                  Jl. Pendidikan No. 123, Kota Edukasi, Indonesia
                </div>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <span className="mt-1">
                {/* <FiMail className="w-6 h-6" /> */}
              </span>
              <div className="text-[1.02rem]">
                <a
                  href="mailto:info@namasekolah.sch.id"
                  className="opacity-95 hover:underline"
                >
                  info@namasekolah.sch.id
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
