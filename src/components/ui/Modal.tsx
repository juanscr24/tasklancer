'use client'
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    const [mounted, setMounted] = useState(false);

    // Ensure component is mounted (for SSR)
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Close modal on ESC key press
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen && mounted) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose, mounted]);

    if (!isOpen || !mounted) return null;

    const modalContent = (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 max-sm:p-2">
            {/* Backdrop with blur effect */}
            <div
                className="absolute inset-0 bg-(--bg-2)/30 backdrop-blur-xs"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Content */}
            <div className="relative bg-(--bg-1) rounded-2xl max-sm:rounded-xl w-full max-w-3xl max-sm:max-w-full max-h-[90vh] max-sm:max-h-[95vh] flex flex-col animate-in zoom-in-95 duration-200 border border-(--bg-2) shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 max-sm:p-4 border-b border-(--bg-2)">
                    <h2 className="text-2xl max-sm:text-xl font-semibold text-(--text-1)">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-(--text-2) hover:bg-(--bg-2) hover:text-(--text-1) transition-all duration-200"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 max-sm:p-4 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};
