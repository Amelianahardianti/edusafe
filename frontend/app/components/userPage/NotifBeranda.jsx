"use client";
import { motion} from 'framer-motion';
import Link from 'next/link';

const notifications = [
  {
    id: 1,
    headline: "🎉 New Feature Alert: Dark Mode Available!",
    body: "You can now switch to the sleek new dark mode theme in your settings. Give your eyes a break!",
  },
  {
    id: 2,
    headline: "💰 Your Monthly Report is Ready",
    body: "Check out your personalized financial summary for October. Great progress on your savings goals!",
  },
  {
    id: 3,
    headline: "📝 Action Required: Update Your Password",
    body: "For security reasons, we recommend updating your password. This ensures the continued protection of your account.",
  },
  {
    id: 4,
    headline: "🛠 System Maintenance Tonight at 2 AM",
    body: "We are performing scheduled maintenance to improve performance. The site may be unavailable for a brief period.",
  },
  {
    id: 5,
    headline: "⭐ You've Earned a New Badge!",
    body: "Congratulations! You've unlocked the 'Early Bird' badge for completing a task before 9 AM.",
  },
];


const NotifBeranda = () => {  
    return (
        <div className="w-[70vw] backdrop-blur-md  drop-shadow-xl h-auto lg:w-[25vw] rounded-lg border ">
            <div className=" filter-none ">
              <h1 className="font-bold text-2xl text-white bg-[#0D58AB] rounded-t-md p-[2vh]">Berita Terbaru</h1>
              <hr className=" bg-yellow-500"></hr>
            </div>
            <div className=" "
            >
              {notifications.map((notification, index) => {
                return (
                  <motion.div 
                  initial={{backgroundColor: "#FFFFFF"}}
            whileHover={{  backgroundColor: "#DFE8F2" }}
                  className=" p-[2vh] " key={index}>
                    <div href={"/berita/" + notification.halaman} className=" font-bold  decoration-kuning decoration-2">
                      {notification.headline}
                    </div>
                    <div className="text-slate-500 text-sm ml-[1vw]">
                      {notification.body}
                    </div>
                  </motion.div>
                );
              })}<Link href="/notifikasi">
              <motion.div className='p-[2vh] border-t text-slate-500 rounded-b-md'
                initial={{ backgroundColor: "#FFFFFF"}}
                whileHover={{ backgroundColor: "#DFE8F2" }}
                >Lihat Semua</motion.div>
                </Link>
            </div>
          </div>
    );
}
export default NotifBeranda;