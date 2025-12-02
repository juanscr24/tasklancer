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
                <button className="hover:scale-103 text-(--text-1) transition-all duration-200 cursor-pointer rounded-md">
                    <Bell />
                </button>
            </div>
        </header>
    )
}
