import { InputProps } from "@/types"

export const Input = ({ type, placeholder, label, icon, id }: InputProps) => {
    return (
        <div className="w-full">
            <label className="font-semibold text-(--text-1)" htmlFor="">{label}</label>
            <div className="flex items-center mt-2 relative">
                {icon && <div className="ml-4 absolute">{icon}</div>}
                <input id={id} className={`bg-(--bg-2) placeholder:text-(--text-2) w-full outline-none px-4 py-4 rounded-md  ${icon ? 'pl-12' : ''}`} type={type} placeholder={placeholder} />
            </div>
        </div>
    )
}
