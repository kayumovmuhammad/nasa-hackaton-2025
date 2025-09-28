import { MapPin, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import formatDateTime from "../api/formatDateTime";
import { Backdrop } from "@mui/material";
import GoogleMaps from "./MapsComponent";

export default function MainComponent() {
    const [datetime, setDatetime] = useState(formatDateTime(new Date()));
    const [selectedLocation, setLocation] = useState();
    const [locationTitle, setLocationTitle] = useState("Pick Your Location");
    const [selectOpen, setSelectOpen] = useState(false);

    const handleDatetimeChange = (event) => {
        setDatetime(event.target.value.split("T").join(" "));
    };

    return (
        <>
            <main className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 min-h-screen pt-24 flex flex-col items-center">
                <h1 className="text-white text-5xl font-bold">
                    Weather Forecast
                </h1>
                <p className="mt-10 mb-8 text-indigo-200">
                    Enter location and time
                </p>
                <form
                    style={{ width: "60%" }}
                    className="flex flex-col items-center gap-3 w-110 bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20"
                >
                    <div className="w-full bg-white/20 hover:bg-white/40 border border-white/30 rounded-xl px-4 py-4 text-white placeholder-blue-200 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:cursor-pointer">
                        <div
                            onClick={() => {
                                setSelectOpen(true);
                            }}
                            className="flex"
                        >
                            <MapPin className="mr-2" />
                            <span>{locationTitle}</span>
                        </div>
                    </div>
                    <div className="w-full">
                        <input
                            value={datetime}
                            onChange={handleDatetimeChange}
                            type="datetime-local"
                            className="w-full bg-white/20 hover:bg-white/40 border border-white/30 rounded-xl px-4 py-4 text-white placeholder-blue-200 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:cursor-pointer"
                        />
                    </div>
                    <button className="flex items-center justify-center gap-1 text-white text-2xl border border-white/30 rounded-xl bg-red-500/70 hover:bg-red-500/90 p-3 w-full hover:cursor-pointer">
                        <Search></Search>
                        <span>Search</span>
                    </button>
                </form>
            </main>
            <Backdrop
                sx={(theme) => ({
                    color: "#fff",
                    zIndex: theme.zIndex.drawer + 1,
                })}
                open={selectOpen}
            >
                <div className="items-center border rounded p-3 bg-gray-900">
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
