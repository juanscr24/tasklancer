import { ReactNode } from "react"

export interface InputProps {
    type: "text" | "email" | "password" | "number";
    placeholder: string;
    label?: string;
    icon?: ReactNode;
    id: string;
}