import { Metadata } from "next";
import { AuthView } from '@/views/AuthView'

export const metadata: Metadata = {
    title: 'Inicio de seción',
};

import { Suspense } from "react";

const Auth = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthView />
        </Suspense>
    )
}

export default Auth
