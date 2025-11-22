import { Button, Input } from "@/components/ui"

export const RegisterForm = () => {
    return (
        <>
            <Input
                id="name"
                type="text"
                label="Full Name"
                placeholder="Write your name"
            />
            <Input
                id="email"
                type="email"
                placeholder="Email"
                label="you@example.com"
            />
            <Input
                id="password"
                type="password"
                label="Password"
                placeholder="********"
            />
            <Input
                id="confirm-password"
                type="password"
                label="Confirm Password"
                placeholder="********"
            />
            <Button type="submit">Register</Button>
        </>
    )
}
