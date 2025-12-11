import { AuthFormProps } from "@/types"
import { LoginForm, RegisterForm } from "@components"

export const AuthForm = ({ isLogin }: AuthFormProps) => {
    return (
        <div
            className="w-full flex justify-center"
            id="form"
        >
            {isLogin ? (
                <LoginForm />
            ) : (
                <RegisterForm />
            )}
        </div>
    )
}
