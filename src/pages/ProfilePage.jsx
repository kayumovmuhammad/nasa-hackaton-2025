import { useState } from "react";
import { Trash2, MapPin, Calendar, CloudRain, LogOut } from "lucide-react";

export default function ProfilePage() {
    const user = {
        name: "Фарход Раҳимов",
        email: "farkhod.rahimov@example.com"
    };

    const [events, setEvents] = useState([
        {
            id: 1,
            address: "Душанбе, проспект Рудаки",
            date: "2025-10-15",
            time: "14:00",
            weatherType: "Extra Sunny",
            probability: 75
        },
        {
            id: 2,
            address: "Душанбе, площадь Дусти",
            date: "2025-10-18",
            time: "10:30",
            weatherType: "Extra Wet",
            probability: 65
        },
        {
            id: 3,
            address: "Худжанд, улица Ленина",
            date: "2025-10-22",
            time: "16:00",
            weatherType: "Moderate",
            probability: 45
        },
        {
            id: 4,
            address: "Душанбе, Зелёный базар",
            date: "2025-10-25",
            time: "09:00",
            weatherType: "Extra Windy",
            probability: 80
        },
        {
            id: 5,
            address: "Куляб, центральный парк",
            date: "2025-11-01",
            time: "12:00",
            weatherType: "Extra Cloudy",
            probability: 70
        },
        {
            id: 6,
            address: "Душанбе, улица Айни",
            date: "2025-11-05",
            time: "15:30",
            weatherType: "Extra Wet",
            probability: 85
        }
    ]);

    const handleDelete = (id) => {
        setEvents(events.filter(event => event.id !== id));
    };

    const handleSignOut = () => {
        console.log("Signing out...");
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('ru-RU', options);
    };

    const getWeatherColor = (weatherType) => {
        const colors = {
            "Extra Sunny": "text-yellow-400",
            "Extra Wet": "text-blue-400",
            "Extra Windy": "text-cyan-400",
            "Extra Cloudy": "text-gray-400",
            "Moderate": "text-green-400"
        };
        return colors[weatherType] || "text-gray-400";
    };

    const getPercentageColor = (percentage) => {
        if (percentage <= 25) {
            return ['']
        }
    };

    const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div className="min-h-screen p-4 mt-20 sm:p-6">
            <div className="container mx-auto">
                <div className="bg-[#282a2c] rounded shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 p-8 sm:p-6 mb-6 animate-fadeInUp">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                                {user.name}
                            </h1>
                            <p className="text-gray-400 text-lg sm:text-xl">
                                {user.email}
                            </p>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-2 px-6 py-3 bg-red-500/70 hover:bg-red-500/90 text-white font-semibold rounded transition-all duration-300 active:scale-95"
                        >
                            <LogOut size={20} />
                            Sign Out
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        Weather Reminders
                    </h2>
                    <p className="text-gray-400 text-base sm:text-lg">
                        You have {sortedEvents.length} upcoming weather notifications
                    </p>
                </div>

                <div className="space-y-4 grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(500px,1fr))]">
                    {sortedEvents.length === 0 ? (
                        <div className="bg-[#282a2c] rounded p-12 text-center border border-white/10">
                            <p className="text-gray-400 text-lg">No weather reminders yet</p>
                        </div>
                    ) : (
                        sortedEvents.map((event, index) => (
                            <div
                                key={event.id}
                                className="bg-[#282a2c] h-full rounded shadow-[0_4px_16px_rgba(0,0,0,0.3)] border border-white/10 p-6 sm:p-5 hover:border-white/20 transition-all duration-300 animate-fadeInUp"
                            >
                                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                                    <div className="flex-1 space-y-3 w-full lg:w-auto">
                                        <div className="flex items-start gap-3">
                                            <MapPin size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
                                            <span className="text-white text-base sm:text-lg font-medium">
                                                {event.address}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Calendar size={20} className="text-blue-400 flex-shrink-0" />
                                            <span className="text-gray-300 text-sm sm:text-base">
                                                {formatDate(event.date)} at {event.time}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <CloudRain size={20} className={getWeatherColor(event.weatherType) + " flex-shrink-0"} />
                                            <span className={getWeatherColor(event.weatherType) + " text-sm sm:text-base font-semibold"}>
                                                {event.weatherType}
                                            </span>
                                            <span className="text-white bg-white/10 px-3 py-1 rounded-full text-sm font-bold">
                                                {event.probability}%
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(event.id)}
                                        className="w-full lg:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-red-500/20 hover:bg-red-500/40 text-red-400 font-semibold rounded transition-all duration-300 active:scale-95 border border-red-500/30"
                                    >
                                        <Trash2 size={18} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}