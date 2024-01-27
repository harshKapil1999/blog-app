import { Link, useLocation } from "react-router-dom"
import Logo from "./logo"
import { cn } from "@/lib/utils";
import UserAccount from "./user-account";

function Header() {

    const navLinks = [
        {
            name: "Home",
            href: "/"
        },
        {
            name: "Blog",
            href: "/blog"
        },
        {
            name: "About",
            href: "/about"
        },
        {
            name: "Post",
            href: "/post"
        },
    ]

    const location = useLocation();
    const pathname = location.pathname;

  return (
    <>

        <div className=" w-full h-20 p-2 lg:px-5 py-10 sm:py-16 md:py-24 flex items-center justify-between">
            <Link to="/" className="justify-self-start mr-6 md:mr-16 lg:mr-20">
                <Logo/>
            </Link>
            <ul className="w-full flex items-center justify-between flex-1 justify-self-end max-w-2xl">
                {navLinks.map((liItem) => (
                    <li key={liItem.href} className="p-2">
                       <Link className={cn("hover:text-red-800",
                            pathname === liItem.href ? "text-red-800" : "text-black "
                       )} to={liItem.href}>{liItem.name}</Link> 
                    </li>
                ))}
                <li>
                    <UserAccount />
                </li>
            </ul>
        </div>
    </>
  )
}

export default Header