import { useEffect, useRef, useState } from "react";
import login, { signOut } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import { ChevronLeftIcon } from "lucide-react";

export default function LoginPage() {
    const mailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        signOut();
    }, []);

    const handleLogin = () => {
        setIsLoading(true);
        login({
            mail: mailRef.current.value,
            password: passwordRef.current.value,
            navigate,
            setError,
            setIsLoading,
        });
    };

    return (
        <>
            <div className="min-h-screen flex justify-center items-center p-4">
                <div className="bg-[#282a2c] w-full max-width-card p-12 sm:p-6 rounded shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 text-center animate-fadeInUp">
                    <h1 className="mb-10 sm:mb-8 text-white text-4xl sm:text-3xl font-bold tracking-tight animate-scaleIn">
                        Sign In
                    </h1>

                    <div className="flex flex-col gap-5 mb-8">
                        <input
                            ref={mailRef}
                            type="text"
                            placeholder="Email"
                            className="w-full p-4 sm:p-3.5 text-lg sm:text-base text-white bg-[#3d3f42] border border-white/10 rounded shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] placeholder:text-gray-400 placeholder:font-normal transition-all duration-300 focus:outline-none focus:border-[#4a90e2]"
                        />

                        <input
                            ref={passwordRef}
                            type="password"
                            placeholder="Password"
                            className="w-full p-4 sm:p-3.5 text-lg sm:text-base text-white bg-[#3d3f42] border border-white/10 rounded shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] placeholder:text-gray-400 placeholder:font-normal transition-all duration-300 focus:outline-none focus:border-[#4a90e2]"
                        />

                        {error && (
                            <div className="text-[#ff6b6b] text-base sm:text-sm font-medium min-h-6 animate-shake">
                                {error}
                            </div>
                        )}
                    </div>

                    <div className="my-8 sm:my-6 text-base sm:text-sm text-gray-400 font-medium">
                        Not registered yet?{" "}
                        <Link
                            to="/register"
                            className="signup-link text-[#4a90e2] font-semibold no-underline hover:text-[#7b61ff] transition-colors duration-300"
                        >
                            Create an Account!
                        </Link>
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={handleLogin}
                            className="w-auto sm:w-full px-12 sm:px-8 py-4 sm:py-3.5 bg-red-500/70 hover:bg-red-500/90 text-white text-lg sm:text-xl font-semibold rounded border-0 cursor-pointer transition-all duration-300 hover:cursor-pointer active:scale-95"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
            <button
                onClick={() => {
                    navigate("/");
                }}
                className="flex items-center pr-3 py-1 absolute hover:bg-white/10 rounded hover:cursor-pointer active:bg-white/20 top-6 left-6 text-white"
            >
                <ChevronLeftIcon size={30}></ChevronLeftIcon>
                Home
            </button>

            <Backdrop
                sx={(theme) => ({
                    color: "#fff",
                    zIndex: theme.zIndex.drawer + 1,
                })}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}
