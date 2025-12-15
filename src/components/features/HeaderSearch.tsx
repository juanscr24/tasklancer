import { ButtonMode, LanguageSwitcher, SearchBar } from '@/components';
import { Bell, Menu } from 'lucide-react';
import { MenuOption } from './MenuOption';

interface HeaderSearchProps {
    className?: string
    onMenuClick?: () => void
}

export const HeaderSearch = ({ className, onMenuClick }: HeaderSearchProps) => {
    return (
        <header className={`flex justify-between items-center px-8 max-md:px-4 py-6 border-b border-(--border-1) bg-(--bg-1) ${className}`}>
            {/* Mobile Menu Button & Search Bar */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuClick}
                    className="max-md:block hidden p-2 hover:bg-(--bg-2) rounded-lg transition-colors text-(--text-1)"
                    aria-label="Open menu"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <SearchBar placeholder='Search..' className='w-90! max-md:w-50! bg-(--bg-1)! border! border-(--border-1)! text-sm' />
            </div>

            {/* Notification Bell */}
            <div className='flex items-center gap-10 max-md:gap-3 p-2'>
                <MenuOption />
            </div>
        </header>
    )
}
