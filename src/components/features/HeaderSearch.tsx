import { ButtonMode, LanguageSwitcher, SearchBar } from '@/components';
import { Bell } from 'lucide-react';

export const HeaderSearch = ({ className }: { className?: string }) => {
    return (
        <header className={`flex justify-between items-center px-8 py-6 border-b border-(--border-1) bg-(--bg-1) ${className}`}>
            {/* Search Bar */}
            <SearchBar placeholder='Search..' className='w-90! bg-(--bg-1)! border! border-(--border-1)! text-sm' />

            {/* Notification Bell */}
            <div className='flex items-center gap-10'>
                <LanguageSwitcher />
                <ButtonMode />
                <button className="p-2 rounded-full bg-(--bg-1) text-(--text-2) hover:text-white hover:bg-(--bg-2) focus:outline-none">
                    <Bell className="h-5 w-5" />
                </button>
            </div>
        </header>
    )
}
