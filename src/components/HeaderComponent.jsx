import { Home, Mail, Menu, User } from "lucide-react";
import { useEffect, useState } from "react";

function NavLink({ Icon, title, link = "" }) {
    return (
        <li className="">
            <a
                className="rounded-xl active:bg-gray-800 hover:bg-gray-500/40 p-3 flex items-center gap-1"
                href={link}
            >
                {Icon}
                {title}
            </a>
        </li>
    );
}

function NavItem({ className = "" }) {
    return (
        <nav>
            <ul
                className={
                    "menu-items flex fixed top-[55px] z-10000000 left-0 w-full flex-col px-4 bg-gray-800 md:gap-7 md:flex-row md:w-auto md:bg-inherit md:relative md:top-0 md:left-0" +
                    " " +
                    className
                }
            >
                <NavLink Icon={<Home />} title={"Home"} link=""></NavLink>
                <NavLink Icon={<User />} title={"About"} link=""></NavLink>
                <NavLink Icon={<Mail />} title={"Contact"} link=""></NavLink>
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
        <header className="flex backdrop-blur-2xl glass items-center justify-between pl-7 pr-7 pt-2 pb-2 text-white fixed top-0 left-0 w-full">
            <div className="flex items-center">
                <img src="/favicon.png" height={50} width={50} alt="" />
                <h2>Nasa Space Apps</h2>
            </div>
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
        </header>
    );
}
