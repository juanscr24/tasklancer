import { LoginForm, RegisterForm } from "../form"

export const AuthForm = ({ isLogin }: { isLogin: boolean }) => {
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
