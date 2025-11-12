"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";



const InputForm = () => {
    return (
        <div className="max-h-[60vh] min-h-[40vh] max-w-[90vw] min-w-[30vw] bg-zinc-600 p-[10vh] ">
            <div className="p-[10vh] m-[10vh]">
                <div className="bg-amber-300 rounded-lg p-[10vh] m-[10vh]">
            <h1 className="font-bold p-[10vh] m-[10vh]">
                Input Form Component
                
            </h1>
            <form>
                <label htmlFor="inputField" className="block text-sm font-medium text-gray-700">
                    Input Field
                </label>
                <input
                    type="text"
                    id="inputField"
                    className="block w-full rounded-md border px-3 py-2"
                    placeholder="Type something..."
                />
            </form>
            </div>
            </div>
        </div>
    );
};

export default InputForm;