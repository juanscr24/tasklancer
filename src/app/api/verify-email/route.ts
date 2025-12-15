//aca se lee el token con query params
// solo se crea este archivo para validar el email
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get("token");

    //si no existe el token
    if (!token) {
        return new Response("Toekn not found", { status: 400 })
    }

    //verificar si existe el token en la base de datos
    const verifyToken = await db.verificationToken.findFirst({
        where: {
            token,
        },
    });

    // si noo existe ese token
    if (!verifyToken) {
        return new Response("token not found", { status: 400 })
    }

    //verificar si ya expiro el token
    if (verifyToken.expires < new Date()) {
        return new Response("token expired", { status: 400 })
    }

    //verificar si ya esta verificado el email
    const user = await db.user.findUnique({
        where: {
            email: verifyToken.identifier
        }
    })

    if (user?.emailVerified) {
        return new Response("email already verified", { status: 400 })
    }

    //marcar el email como verificado
    await db.user.update({
        where: {
            email: verifyToken.identifier
        },
        data: {
            emailVerified: new Date(),
        }
    });

    //eliminar el token usando la clave compuesta (identifier + token)
    await db.verificationToken.delete({
        where: {
            identifier_token: {
                identifier: verifyToken.identifier,
                token: verifyToken.token,
            }
        }
    })

    //si todo esta bien lo redirecionamos a la página de auth con el parámetro verified
    redirect("/auth?verified=true")
}