import {
    Search,
    Sun,
    Wind,
    Eye,
    Cloud,
    Home,
    HelpCircle,
    Mail,
    User,
} from "lucide-react";
import HeaderComponent from "./components/HeaderComponent";
import MainComponent from "./components/MainComponent";

const WeatherForecastApp = () => {
    return (
        <>
            <HeaderComponent />
            <MainComponent />
        </>
    );
};

export default WeatherForecastApp;
