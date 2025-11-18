"use client";

import Navbar from "@/app/components/userPage/NavbarDesktop";
import Image from "next/image";
import Link from "next/link";
import Forbidden from "@/app/components/userPage/Forbidden";

export default function NotFoundPage(){
    return(
        <>
        <Navbar />

        <div >
          <Forbidden />
      </div>
    </>
  );
}