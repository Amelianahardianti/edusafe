"use client";
import { motion } from "framer-motion";
import NotificationSaranPage from "@/app/components/userPage/NotificationSaranPage";

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

export default function Notifikasi() {
  return (
    <div className="flex flex-col items-center gap-y-[2vh] py-[5vh]">
      <div className="flex justify-between w-[90vw]"> <h1 className="font-bold text-3xl">Notifikasi</h1> <motion.button 
                      initial = {{ backgroundColor: "#0D58AB"}}
                      whileHover={{ scale: 1.1 , backgroundColor: "#0B3869"}}
                      whileTap={{ scale: 0.9, backgroundColor: "#608FC2" }}
                      className=" rounded-lg py-[1vh] px-[3vh] w-fit hover:underline text-white"
                    >
                      Buat Notifikasi
                    </motion.button></div>
      
      {notifications.map((notification) => (
        <NotificationSaranPage
          key={notification.id}
          headline={notification.headline}
          text={notification.body}
          button="Hapus"
        />
      ))}
    </div>
  );
}
