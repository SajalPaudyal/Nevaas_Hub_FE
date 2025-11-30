import { Home, Info, Key, Users } from "lucide-react";
import type { NavItem } from "../types/NavItems";

export const NavItems:NavItem[] = [
    {name:"Rentals", href:"#rental", icon: Home},
    {name:"Roommates", href:"#roommates", icon:Users},
    {name:"List Property", href:"#list", icon:Key},
    {name:"About Us", href:"#about", icon:Info}
]