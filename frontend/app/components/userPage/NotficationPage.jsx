"use client";
import { motion } from "framer-motion";

const NotificationPage = () => {
    return (
        <div className="w-[80vw] h-auto border p-[2vh] overflow-hidden rounded-lg">
            <h1 className="font-bold text-2xl py-[2vh] ">User/Headline</h1>
            <p className="text-justify whitespace-pre ">

{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. adfilkn.
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}
</p>
<div>

</div>
        <div className="flex justify-end "><motion.button className=" text-white p-[1vh] rounded-lg"
        initial={{ scale: 1, backgroundColor:"#0B3869"}}
        whileHover={{ scale: 1.1, backgroundColor:"#1e40af"}}>Hapus</motion.button></div>

        </div>
    );
}

export default NotificationPage;