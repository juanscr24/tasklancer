import { ButtonProps } from "@/types"

export const Button = ({ type, children, className, onClick }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`w-full bg-(--btn-1) text-(--text-1) hover:bg-(--btn-1)/80 hover:scale-101 transition-all duration-200 cursor-pointer p-4 rounded-lg font-bold ${className}`}
            type={type}
        >
            {children}
        </button>
    )
}
