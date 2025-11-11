import React from "react";
import Navbar from "@/app/components/userPage/NavbarDesktop";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
    
      <div className=" translate-y-[12.5vh]"
        // className={`bg-[url('/background.png')] ${mechsuit.className} ${code.className}`}
      >
        {children}
      {/* <Footer /> */}
      </div>
    </>
  );
}