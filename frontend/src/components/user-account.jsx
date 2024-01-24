import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { UserCircle } from "lucide-react"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"
  

export default function UserAccount() {
  return (
    <div>
        <DropdownMenu>
        <DropdownMenuTrigger>
            <Button variant="ghost" className=" rounded-full"><UserCircle className="h-8 w-8 hover:text-red-800"/></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to="/signin">
            <DropdownMenuItem>Sign in</DropdownMenuItem>
            </Link>
            <Link to="/signup">
            <DropdownMenuItem>Sign up</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>Log out</DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
        
    </div>
  )
}
