import { LucideLogIn, Menu, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuth } from "../api/auth";

function NavLink({ Icon, title, link = "" }) {
    return (
        <li className="">
            <Link
                className="rounded active:bg-neutral-500/40 hover:bg-neutral-600/40 p-3 flex items-center gap-1"
                to={link}
            >
                {Icon}
                <span className="font-medium">{title}</span>
            </Link>
        </li>
    );
}

function NavItem({ className = "" }) {
    const auth = isAuth();

    return (
        <nav>
            <ul
                className={
                    "menu-items flex fixed top-[55px] left-0 w-full flex-col bg-[#2a2a2a] md:gap-7 md:flex-row md:w-auto md:bg-inherit md:relative md:top-0 md:left-0" +
                    " " +
                    className
                }
            >
                {auth && (
                    <NavLink
                        Icon={<User />}
                        title={"Your Profile"}
                        link="/profile"
                    ></NavLink>
                )}
                {!auth && (
                    <NavLink
                        Icon={<LucideLogIn />}
                        title={""}
                        link="/login"
                    ></NavLink>
                )}
            </ul>
        </nav>
    );
}

export default function HeaderComponent() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        console.log(document.documentElement.clientWidth);
    }, [document.documentElement.clientWidth]);

    return (
        <header className="z-[100] bg-[#1b1c1d8e] backdrop-blur-sm fixed top-0 left-0 w-full py-2">
            <div className="flex container items-center justify-between text-white">
                <Link to={"/"} className="flex items-center">
                    <img src="/favicon.png" height={50} width={50} alt="" />
                    <h2 className="pl-3 text-2xl">Nasa Space Apps</h2>
                </Link>
                <div>
                    <div
                        onClick={() => {
                            setMenuOpen((prev) => !prev);
                        }}
                        className="md:hidden p-2 hover:bg-gray-500/40 rounded"
                    >
                        <Menu></Menu>
                    </div>
                    <NavItem className="hidden md:flex"></NavItem>
                    {isMenuOpen && <NavItem className="md:hidden"></NavItem>}
                </div>
            </div>
        </header>
    );
}
