import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { UserCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
  

export default function UserAccount() {
  const {currentUser} = useSelector(state => state.user);
  return (
    <div>
      {currentUser ? (
        <DropdownMenu>
        <DropdownMenuTrigger>
            <img src={currentUser.avatar} alt={currentUser.name} className="h-8 w-8 rounded-full" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuLabel>{currentUser.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to="/signin">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <Link to="/signup">
            <DropdownMenuItem>Settings</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <DropdownMenu>
        <DropdownMenuTrigger>
          <UserCircle className="h-8 w-8 hover:text-red-800"/>
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
      )}  
    </div>
  )
}
