'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion }  from 'framer-motion';


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
 return (
<div>
  <Link href="/" className="absolute left-4 sm:left-6 lg:left-[41px] top-4 sm:top-6 lg:top-[25px] items-center flex gap-4">
            <Image
              src="/assets/svg/logo.svg"
              alt="EduSafe Logo"
              width={38.66}
              height={43.67}
              className="w-12 h-14 sm:w-16 sm:h-[72px] lg:w-[50px] lg:h-[55px]"
            /> <div className='text-3xl text-[#14263E] font-bold'>
              EduSafe
            </div>
          </Link>
  <div className="h-screen w-screen justify-center items-center flex flex-col">
    
     <div className="border grid p-[3vh] rounded-lg gap-1 border-gray-300">
     <div className='bg-white font-bold text-3xl text-[#313131]'>Login</div>
     <div className='bg-white text-[#313131]'>Cari tahu kegiatan anak anda!</div>
           <div className=" bg-white pt-5 justify-center">
             
         </div>
         {/* untuk form text */}
         <div className="bg-white grid grid-flow-row justify-center">
         <form className="w-[40vw]">
             <label htmlFor="inputField" className="block text-sm font-medium text-gray-700">
                 Email
             </label>
             <input
                 type="text"
                 id="inputField"
                 className="block w-full rounded-md border border-gray-300 px-3 py-2"
                 placeholder="Type something..."
             />
         </form>
         
         </div>
         {/* untuk form from-to atau start-end */}
       
         {/* untuk password */}
         <div className="bg-white grid grid-flow-row justify-center" >
             <form className="w-[40vw]">
             <label
                 htmlFor="inputField"
                 className="block text-sm font-medium text-gray-700 mb-1"
             >
                 Password
             </label>

                     <div className="relative">
                         <input
                         type={showPassword ? "text" : "password"}
                         id="inputField"
                         className="block w-full rounded-md border border-gray-300 px-3 py-2 pr-16 focus:border-blue-500 focus:ring-blue-500"
                         placeholder="Enter your password"
                         />

                         <button
                         type="button"
                         onClick={() => setShowPassword((prev) => !prev)}
                         className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-blue-600 hover:underline"
                         >
                         {showPassword ? <Image
              src="/assets/svg/eye-off.svg"
              alt="Eye_off_icon"
              width={77}
              height={87}
              className="w-12 h-14 sm:w-16 sm:h-[72px] lg:w-[24px] lg:h-[24px] cursor-pointer"/> : <Image
              src="/assets/svg/mdi_eye.svg"
              alt="Eye_icon"
              width={77}
              height={87}
              className="w-12 h-14 sm:w-16 sm:h-[72px] lg:w-[24px] lg:h-[24px] cursor-pointer"
            />}
                         </button>
                     </div>
             </form>
         </div>
                 <div className="flex justify-center">
                 <motion.button
                 className="p-4 h-[6vh] w-[40vw] rounded-lg mt-[2vh] text-white font-bold text-2xl"
                 initial={{ opacity: 1, scale: 0.95, backgroundColor: "#608FC2"}}
                 whileHover={{ opacity: 0.9, scale: 1,  backgroundColor: "#608FC2" }}
                 transition={{ duration: 0.2,  ease: 'easeOut' }}
                 >
                         Login
                 </motion.button>
                 </div>
         
        
     </div>
     </div>
     </div>
 );
};