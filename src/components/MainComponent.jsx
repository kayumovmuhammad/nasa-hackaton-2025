import { MapPin, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import formatDateTime from "../api/formatDateTime";
import { Backdrop } from "@mui/material";
import GoogleMaps from "./MapsComponent";
import { PieChart } from "@mui/x-charts";

function CircularProgress({ percent = 0, size = 200, strokeWidth = 20 }) {
    const getColor = (value) => {
        if (value <= 25) {
            const ratio = value / 25;
            return {
                start: `rgb(${Math.round(34 + ratio * 100)}, ${Math.round(
                    197 - ratio * 50
                )}, ${Math.round(94 - ratio * 50)})`,
                end: `rgb(${Math.round(74 + ratio * 80)}, ${Math.round(
                    222 - ratio * 40
                )}, ${Math.round(128 - ratio * 50)})`,
            };
        } else if (value <= 50) {
            const ratio = (value - 25) / 25;
            return {
                start: `rgb(${Math.round(134 + ratio * 100)}, ${Math.round(
                    147 + ratio * 73
                )}, ${Math.round(44 - ratio * 10)})`,
                end: `rgb(${Math.round(154 + ratio * 90)}, ${Math.round(
                    182 + ratio * 48
                )}, ${Math.round(78 - ratio * 30)})`,
            };
        } else if (value <= 75) {
            const ratio = (value - 50) / 25;
            return {
                start: `rgb(${Math.round(234 + ratio * 17)}, ${Math.round(
                    220 - ratio * 60
                )}, ${Math.round(34 - ratio * 20)})`,
                end: `rgb(${Math.round(244 + ratio * 7)}, ${Math.round(
                    230 - ratio * 80
                )}, ${Math.round(48 - ratio * 30)})`,
            };
        } else {
            const ratio = (value - 75) / 25;
            return {
                start: `rgb(${Math.round(251 - ratio * 20)}, ${Math.round(
                    160 - ratio * 60
                )}, ${Math.round(14 - ratio * 10)})`,
                end: `rgb(${Math.round(251 - ratio * 30)}, ${Math.round(
                    150 - ratio * 80
                )}, ${Math.round(18 - ratio * 10)})`,
            };
        }
    };

    const colors = getColor(percent);
    const radius = (size - strokeWidth) / 2;
    const center = size / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - percent / 100);

    const getStatus = (value) => {
        if (value <= 25) return { text: "Unlikely", color: "text-green-400" };
        if (value <= 50) return { text: "Possibly", color: "text-yellow-400" };
        if (value <= 75) return { text: "Attention", color: "text-orange-400" };
        return { text: "Critically", color: "text-red-400" };
    };

    const status = getStatus(percent);

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90" width={size} height={size}>
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke={`url(#gradient-${percent})`}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-in-out"
                />
                <defs>
                    <linearGradient
                        id={`gradient-${percent}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                    >
                        <stop offset="0%" stopColor={colors.start} />
                        <stop offset="100%" stopColor={colors.end} />
                    </linearGradient>
                </defs>
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-white">
                    {percent}%
                </span>
                <span className={`text-lg font-semibold ${status.color} mt-1`}>
                    {status.text}
                </span>
            </div>
        </div>
    );
}

export default function MainComponent() {
    const [datetime, setDatetime] = useState(formatDateTime(new Date()));
    const [selectedLocation, setLocation] = useState();
    const [locationTitle, setLocationTitle] = useState("Pick Your Location");
    const [selectOpen, setSelectOpen] = useState(false);

    /* Mock data */
    const possibilities = [
        {
            title: "Snowfall",
            percentage: 92,
        },
        {
            title: "Snow",
            percentage: 61,
        },
        {
            title: "Extra Rain",
            percentage: 43,
        },
        {
            title: "Extra Sun",
            percentage: 23,
        },
    ];

    const handleDatetimeChange = (event) => {
        setDatetime(event.target.value.split("T").join(" "));
    };

    return (
        <>
            <main className="p-3 min-h-screen pt-24 flex flex-col items-center">
                <h1 className="text-white text-3xl font-bold md:text-5xl">
                    Weather Forecast
                </h1>
                <p className="mt-5 mb-3 text-indigo-200">
                    Enter location and time
                </p>
                <form className="glass w-full md:w-[70%] flex flex-col items-center gap-3 rounded-2xl p-8 border border-white/20">
                    <div
                        onClick={() => {
                            setSelectOpen(true);
                        }}
                        className="w-full bg-white/20 hover:bg-white/40 border border-white/30 rounded-xl px-4 py-4 text-white placeholder-blue-200 text-sm md:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:cursor-pointer"
                    >
                        <div className="flex">
                            <MapPin size={20} className="mr-2 pinIcon" />
                            <span>{locationTitle}</span>
                        </div>
                    </div>
                    <div className="w-full overflow-hidden bg-white/20 hover:bg-white/40 border border-white/30 rounded-xl">
                        <input
                            value={datetime}
                            onChange={handleDatetimeChange}
                            type="datetime-local"
                            className="w-full   px-4 py-4 text-white placeholder-blue-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:cursor-pointer md:text-lg"
                        />
                    </div>
                    <button className="flex items-center justify-center gap-1 text-white text-2xl border border-white/30 rounded-xl bg-red-500/70 hover:bg-red-500/90 p-3 w-full hover:cursor-pointer">
                        <Search></Search>
                        <span>Search</span>
                    </button>
                </form>
                <div className="w-full md:w-[70%] grid [grid-template-columns:repeat(auto-fill,minmax(350px,1fr))] gap-5 mt-7 ">
                    {possibilities.map((item, index) => (
                        <div
                            key={index}
                            className="hover:cursor-pointer flex flex-col items-center gap-3 glass rounded-2xl p-8 border border-white/20"
                        >
                            <h3 className="text-white text-2xl text-center">
                                {item.title}
                            </h3>
                            <CircularProgress
                                percent={item.percentage}
                            ></CircularProgress>
                        </div>
                    ))}
                </div>
            </main>
            <Backdrop
                sx={(theme) => ({
                    color: "#fff",
                    zIndex: theme.zIndex.drawer + 1,
                })}
                onClick={() => {
                    console.log("hello");
                }}
                open={selectOpen}
            >
                <div className="h-full w-full items-center border rounded p-3 bg-gray-900 md:h-[80%] md:w-[80%]">
                    <GoogleMaps
                        setSelectOpen={setSelectOpen}
                        setLocation={setLocation}
                        setLocationTitle={setLocationTitle}
                    ></GoogleMaps>
                </div>
            </Backdrop>
        </>
    );
}
