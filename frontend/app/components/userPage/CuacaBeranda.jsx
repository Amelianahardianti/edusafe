"use client";
import React, { useEffect, useState } from "react";
import { motion }  from 'framer-motion';
import weatherData from "../mockData/data_center";

const CuacaBeranda = ( {weather} ) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [weatherForecast, setWeatherForecast] = useState([]);
    useEffect(() => {
        // Update current time
        setCurrentTime(new Date());
        
        // Get weather forecast for next 6 hours
        const forecast = getNext6HoursWeather();
        setWeatherForecast(forecast);
    }, []);
      const getNext6HoursWeather = () => {
        const now = new Date();
        const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
        const currentHour = now.getHours();
        
        const forecast = [];
        
        for (let i = 0; i < 6; i++) {
            const targetDate = new Date(now.getTime() + i * 60 * 60 * 1000);
            const targetDay = targetDate.toLocaleDateString('en-US', { weekday: 'long' });
            const targetHour = targetDate.getHours();
            const hourString = `${targetHour.toString().padStart(2, '0')}:00`;
            
            const weatherItem = weatherData.find(
                item => item.day === targetDay && item.hour === hourString
            );
            
            forecast.push({
                hour: hourString,
                weather: weatherItem ? weatherItem.weather : 'sunny',
                day: targetDay
            });
        }
        
        return forecast;
    };
       const formatDate = () => {
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                       'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        
        const dayName = days[currentTime.getDay()];
        const date = currentTime.getDate();
        const month = months[currentTime.getMonth()];
        const year = currentTime.getFullYear();
        
        return `${dayName}, ${date} ${month} ${year}`;
    };
   
    return(
        <div className="rounded-lg bg-[#FFED24] flex flex-col h-auto ">
            <div className="lg:flex justify-between px-[2vh] items-center">
                <div>
                    <div className="font-bold text-2xl"> Cuaca Hari Ini</div>
                    <div> {formatDate()}</div>

                </div>
                <div className=""> 
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className=" bg-[#0B3869] rounded-lg p-[1vh] text-white"
                        
                    >
                        Lebih Lanjut 
                    </motion.button>

                </div>
            </div>
            <div className="grid lg:grid-flow-row lg:grid-cols-6 h-auto font-bold text-center ">
                  {weatherForecast.map((item, index) => (
                    <div key={index} className={`flex flex-col items-center ${index % 2 === 0 ? 'bg-yellow-200' : 'bg-white'}`}>
                        <div className="">{item.hour}</div>
                       icon
                        <div className="capitalize">{item.weather}</div>
                    </div>
                ))}
            </div>

        </div>
    )
}
export default CuacaBeranda;
    