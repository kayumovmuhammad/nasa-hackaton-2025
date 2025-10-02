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
import Particles from "./bits_components/Particles";

const WeatherForecastApp = () => {
    return (
        <>
            <HeaderComponent />
            <MainComponent />
            <Particles
                className={"background"}
                particleColors={["#ffffff", "#ffffff"]}
                particleCount={200}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={100}
                alphaParticles={false}
                disableRotation={true}
            />
        </>
    );
};

export default WeatherForecastApp;
