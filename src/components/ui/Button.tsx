import { ButtonProps } from "@/types"

export const Button = ({
    title,
    type,
    children,
    className,
    onClick,
    primary,
    secondary,
    disabled
}: ButtonProps) => {
    return (
        <button
            title={title}
            disabled={disabled}
            onClick={onClick}
            className={`w-full hover:scale-101 transition-all duration-200 cursor-pointer p-4 rounded-lg font-bold
                ${primary && 'bg-(--btn-1) text-(--text-1) hover:bg-(--btn-1)/80'} 
                ${secondary && 'bg-(--btn-2) text-(--text-1) hover:bg-(--btn-2)/80'}
                ${className}`}
            type={type}
        >
            {children}
        </button>
    )
}
