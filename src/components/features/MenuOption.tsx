import { Settings } from "lucide-react";
import { useState } from "react";
import { ButtonMode } from "../ui/ButtonMode";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";

export const MenuOption = ({ className }: { className?: string }) => {
    const [open, setOpen] = useState<boolean>(false)
    const handleClick = () => {
        setOpen(!open)
    }
    return (
        <div>
            <Settings className={`${className} text-(--text-2)`} onClick={handleClick} />
            <div>
                {open &&
                    <div className="absolute bg-(--bg-1) border border-(--text-2)/10 rounded-lg p-4 shadow-lg flex flex-col justify-center items-center gap-4">
                        <ButtonMode />
                        <LanguageSwitcher />
                    </div>}
            </div>
        </div>
    )
}
