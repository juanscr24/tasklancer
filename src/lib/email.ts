import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmailVerification = async (email: string, token: string) => {
    try {
        // La URL debe apuntar a la API que procesa la verificación
        // Movida fuera de /api/auth para evitar conflictos con NextAuth
        const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/verify-email?token=${token}`;
        
        await resend.emails.send({
            from: "Tasklancer <noreply@devpoint.app>",
            to: email,
            subject: "Verifica tu email - Tasklancer",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">¡Bienvenido a Tasklancer!</h2>
                    <p style="color: #666; font-size: 16px;">
                        Gracias por registrarte. Por favor, verifica tu dirección de correo electrónico 
                        haciendo clic en el botón de abajo:
                    </p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${verificationUrl}" 
                           style="background-color: #4F46E5; color: white; padding: 12px 30px; 
                                  text-decoration: none; border-radius: 5px; display: inline-block;">
                            Verificar Email
                        </a>
                    </div>
                    <p style="color: #999; font-size: 14px;">
                        Si no creaste esta cuenta, puedes ignorar este correo.
                    </p>
                </div>
            `
        });
        
        return {
            success: true
        };

    } catch (error) {
        console.error("Error sending verification email:", error);
        return {
            error: true
        };
    }
};
