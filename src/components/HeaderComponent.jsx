import { Home, Mail, User } from "lucide-react";

function NavLink({ Icon, title, link = "" }) {
    return (
        <li className="">
            <a
                className="rounded-xl hover:bg-gray-500/40 p-3 flex items-center gap-1"
                href={link}
            >
                {Icon}
                {title}
            </a>
        </li>
    );
}

export default function HeaderComponent() {
    return (
        <header className="flex items-center justify-between pl-7 pr-7 pt-2 pb-2 bg-gray-800 text-white fixed top-0 left-0 w-full">
            <div className="flex items-center">
                <img src="/favicon.png" height={50} width={50} alt="" />
                <h2>Nasa Space Apps</h2>
            </div>
            <nav>
                <ul className="flex gap-7">
                    <NavLink Icon={<Home />} title={"Home"} link=""></NavLink>
                    <NavLink Icon={<User />} title={"About"} link=""></NavLink>
                    <NavLink
                        Icon={<Mail />}
                        title={"Contact"}
                        link=""
                    ></NavLink>
                </ul>
            </nav>
        </header>
    );
}
