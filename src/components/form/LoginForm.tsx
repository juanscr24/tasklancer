import { Button, Input } from "@/components/ui"

export const LoginForm = () => {
    return (
        <>
            <Input
                id="email"
                type="email"
                label="Email"
                placeholder="you@example.com"
            />
            <Input
                id="password"
                type="password"
                label="Password"
                placeholder="********"
            />
            <Button type="submit">Sign In</Button>
        </>
    )
}
