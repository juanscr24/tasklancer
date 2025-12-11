import { AuthFormProps } from "@/types"
import { LoginForm, RegisterForm } from "@components"

export const AuthForm = ({ isLogin, isTransitioning }: AuthFormProps) => {
    return (
        <div
            className="w-full flex justify-center items-center"
            id="form"
        >
            <div className={`w-full flex justify-center transition-all duration-500 ease-in-out ${
                isTransitioning 
                    ? 'opacity-0 translate-y-4' 
                    : 'opacity-100 translate-y-0'
            }`}>
                {isLogin ? (
                    <LoginForm />
                ) : (
                    <RegisterForm />
                )}
            </div>
        </div>
    )
}
