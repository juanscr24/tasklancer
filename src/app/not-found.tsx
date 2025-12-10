"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
// Ajusta esta ruta si es necesario según tu estructura
import { not_found } from "@main/public/images/img"

const NotFound = () => {
    const router = useRouter()

    return (
        // Contenedor principal: ocupa toda la pantalla y es relativo para contener la imagen absoluta
        <div className="relative h-screen w-screen overflow-hidden">

            {/* Imagen de fondo */}
            <Image
                src={not_found}
                alt="Página no encontrada"
                fill
                priority
                // object-cover: cubre todo sin deformarse
                // -z-10: se coloca detrás del contenido
                className="object-cover -z-10"
            />

            {/* Contenedor del contenido: capa superior (z-10) */}
            {/* flex + items-center: centra verticalmente */}
            {/* justify-start + pl-10: alinea a la izquierda con un poco de "aire" */}
            <div className="relative z-10 flex h-full items-center justify-start pl-10">
                <button onClick={() => router.push("/")}>
                    Volver al inicio
                </button>
            </div>
        </div>
    )
}

export default NotFound