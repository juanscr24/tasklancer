import { AuthFormProps } from "@/types"
import { LoginForm, RegisterForm } from "@components"

export const AuthForm = ({ isLogin }: AuthFormProps) => {
    return (
        <form
            className="flex flex-col items-center gap-8 w-1/2"
            id="form"
        >
            {isLogin ? (
                <LoginForm />
            ) : (
                <RegisterForm />
            )}
        </form>
    )
}
