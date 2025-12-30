import { Home, Info, Users } from "lucide-react";
import type { NavItem } from "../types/NavItems";

export const NavItems:NavItem[] = [
    {name:"Properties", href:"/properties", icon: Home},
    {name:"Roommates", href:"#roommates", icon:Users},
    {name:"About Us", href:"#about", icon:Info}
]