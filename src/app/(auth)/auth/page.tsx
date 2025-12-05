import { Metadata } from "next";
import { AuthView } from '@/views/AuthView'

export const metadata: Metadata = {
    title: 'Inicio de seción',
};

const Auth = () => {
    return (
        <AuthView />
    )
}

export default Auth
