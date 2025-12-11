import { HiHome } from "react-icons/hi2";
import { TrendingUp } from 'lucide-react';
import { MdFolderCopy } from "react-icons/md";
import { MdOutlineWork } from "react-icons/md";

export const navItems = [
    { icon: HiHome, href: '/dashboard', labelKey: 'home' },
    { icon: MdFolderCopy, href: '/projects', labelKey: 'projects' },
    { icon: TrendingUp, href: '/clients', labelKey: 'clients' },
    { icon: MdOutlineWork, href: '/services', labelKey: 'services' },
];
