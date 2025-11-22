import { ReactNode } from "react";

export interface ButtonProps {
    type: 'submit' | 'button';
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}