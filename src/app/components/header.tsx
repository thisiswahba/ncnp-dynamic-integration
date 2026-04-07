import svgPaths from "@/imports/svg-idbkmjhdzm";
import imgAvatar from "figma:asset/ce11d6f1d697df202f437b9d02490f72fd15d5c5.png";
import { Bell, ChevronDown } from 'lucide-react';

interface HeaderProps {
  isSideNavOpen?: boolean;
}

export function Header({ isSideNavOpen = false }: HeaderProps) {
  return (
    <header className="bg-white border-b border-border shadow-sm">
    </header>
  );
}