import { Settings } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ButtonMode } from "../ui/ButtonMode";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";

export const MenuOption = () => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setOpen(prev => !prev);
    };

    // 🔹 Cerrar al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            {/* ICONO */}
            <Settings
                className="
          text-(--text-1)
          cursor-pointer
          transition-transform
          duration-700
          hover:rotate-180
        "
                onClick={handleClick}
            />

            {/* MENU */}
            <div
                className={`
          absolute -left-8 mt-2
          bg-(--bg-1)
          border border-(--text-2)/10
          p-4
          shadow-lg
          flex flex-col
          justify-center items-center
          gap-4
          transition-all duration-300 ease-out
          ${open
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-4 pointer-events-none"}
        `}
            >
                <ButtonMode />
                <LanguageSwitcher />
            </div>
        </div>
    );
};
