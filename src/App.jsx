import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import MainComponent from "./components/MainComponent";
import LoginPage from "./components/auth/LoginComponent";
import SignUpPage from "./components/auth/RegisterComponent";
import ProfilePage from "./pages/ProfilePage";
import Particles from "./bits_components/Particles";

const WeatherForecastApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <HeaderComponent />
                            <MainComponent />
                        </>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <>
                            <HeaderComponent />
                            <ProfilePage></ProfilePage>
                        </>
                    }
                />
                <Route path="/login" element={<LoginPage></LoginPage>} />
                <Route path="/register" element={<SignUpPage></SignUpPage>} />
                <Route
                    path="*"
                    element={
                        <h1 className="text-center text-white text-5xl mt-3">
                            404 Not Found
                        </h1>
                    }
                ></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default WeatherForecastApp;
