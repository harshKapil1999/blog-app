import { Link, useLocation } from "react-router-dom"
import Logo from "./logo"
import { cn } from "@/lib/utils";

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
            name: "SignUp",
            href: "/signup"
        },
        {
            name: "SignIn",
            href: "/signin"
        },
    ]

    const location = useLocation();
    const pathname = location.pathname;

  return (
    <>

        <div className=" w-full h-20 p-2 lg:px-5 py-10 sm:py-16 md:py-24 flex items-center justify-between md:gap-10">
            <Link to="/" className="justify-self-start">
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
            </ul>
        </div>
    </>
  )
}

export default Header