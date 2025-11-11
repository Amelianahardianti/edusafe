import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full relative bg-[#0B3869] text-white font-jakarta" style={{ minHeight: '594.8px' }}>
      <div className="relative w-full h-full px-6 md:px-12 lg:px-0 py-12 lg:py-0">
        {/* Logo - Top Left */}
        <div className="absolute top-[25px] left-6 lg:left-[41px] w-[77.3px] h-[87.3px]">
          <Image
            src="/assets/svg/logo.svg"
            alt="EduSafe Logo"
            width={77.3}
            height={87.3}
            className="w-full h-full"
          />
        </div>

        {/* About Us Section - Left Side */}
        <div className="lg:absolute lg:top-[155px] lg:left-[118px] mt-32 lg:mt-0 max-w-full lg:max-w-[680px]">
          <h3 className="font-bold text-[32px] lg:text-[45.21px] mb-6 lg:mb-[85px]">
            About us
          </h3>
          <p className="text-[20px] lg:text-[27.12px] leading-relaxed lg:leading-normal">
            Sekolah kami merupakan lembaga pendidikan yang berkomitmen untuk membentuk generasi muda yang cerdas, berkarakter, dan berdaya saing tinggi. Berdiri sejak tahun [tahun berdiri], kami terus berkembang menjadi sekolah yang unggul dalam bidang akademik maupun non-akademik.
          </p>
        </div>

        {/* Contact Section - Right Side */}
        <div className="lg:absolute lg:top-[163px] lg:right-[100px] xl:right-[200px] 2xl:right-[300px] mt-12 lg:mt-0 max-w-full lg:max-w-[540px]">
          <h3 className="font-bold text-[32px] lg:text-[45.21px] text-left mb-8 lg:mb-[106px]">
            Contact
          </h3>
          
          {/* Contact Items */}
          <div className="space-y-12 lg:space-y-[90px]">
            {/* Phone */}
            <div className="flex items-center gap-8 lg:gap-[60px]">
              <div className="flex-shrink-0">
                <svg
                  width="40.7"
                  height="40.7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <span className="text-[20px] lg:text-[27.12px]">
                (021) 1234-5678
              </span>
            </div>

            {/* Address */}
            <div className="flex items-start gap-8 lg:gap-[60px]">
              <div className="flex-shrink-0">
                <svg
                  width="40.7"
                  height="40.7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span className="text-[20px] lg:text-[27.12px] leading-relaxed lg:leading-normal">
                Jl. Pendidikan No. 123, Kota Edukasi, Indonesia
              </span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-8 lg:gap-[60px]">
              <div className="flex-shrink-0">
                <svg
                  width="40.7"
                  height="40.7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <a
                href="mailto:info@namasekolah.sch.id"
                className="text-[20px] lg:text-[27.12px] hover:underline transition-all"
              >
                info@[namasekolah].sch.id
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
