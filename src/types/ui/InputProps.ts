import { ReactNode } from "react"
import { UseFormRegisterReturn } from "react-hook-form"

export interface InputProps {
    type: "text" | "email" | "password" | "number";
    placeholder: string;
    label?: string;
    icon?: ReactNode;
    id: string;
    error?: string;
    register?: UseFormRegisterReturn;
    errorMessage?: string;
}