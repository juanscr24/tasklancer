import { ReactNode } from "react";

export interface ButtonProps {
    type?: 'submit' | 'button';
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    primary?: boolean;
    secondary?: boolean;
    title?: string;
    disabled?: boolean;
}